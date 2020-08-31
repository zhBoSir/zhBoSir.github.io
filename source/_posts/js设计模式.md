---
title: js设计模式
date: 2020-06-02 14:20:02
categories:
  - JavaScript
tags:
---

> ## S O L I D五大设计原则

+ S <code>单一职责原则</code>
（注：一个程序只做好一件事；如果功能过于复杂就拆分开，每个部分保持独立。）

+ O <code>开放封闭原则</code>
（注：对扩展开放，对修改封闭；增加需求时，扩展新代码，而非修改已有代码。 这是软件设计的终极目标。）

<!-- more -->

+ L <code>李氏置换原则</code>
（注：子类能覆盖父类；父类能出现的地方子类就能出现；js中使用较少<弱类型 & 继承使用较少>）

+ I <code>接口独立原则</code>
（注：保持接口的单一独立，避免出现‘胖接口’； js中没有接口，使用较少）

+ D <code>依赖导致原则</code>
（注：面向接口编程，依赖于抽象而不依赖于具体。js中使用较少<弱类型 & 没有接口>）

> ## 第一道题：

打车时，可以打专车或者快车。任何车都有车牌号和名称。

不同车价格不同，快车每公里1元，专车每公里2元。

行程开始时，显示车辆信息

行程结束时，显示打车金额（假定行程是5公里）

```js
// 车类
class Car {
  constructor (num, name) {
    this.num = num
    this.name = name
  }
}
// 快车类
class Kuaiche extends Car {
  constructor (num, name, price) {
    super(num, name)
    this.price = 1
  }
}
// 专车类
class Zhuanche extends Car {
  constructor (num, name, price) {
    super(num, name)
    this.price = 2
  }
}
// 行程
class Trip {
  constructor (car) {
    this.car = car
  }
  start () {
    console.log(`行程开始，名称：${ this.car.name }, 车牌号：${ this.car.num }`)
  }
  end () {
    console.log(`行程结束，金额 ${ this.car.price * 5 }元`)
  }
}

// 测试
let car = new Kuaiche(100, '大众')
let trip = new Trip(car)
trip.start()
trip.end()
```

> ## 第二道题：

某停车场，分3层，每层100车位

每个车位都能监控到车辆的驶入和离开

车辆进入前，显示每层的空余车位数量

车辆进入时，摄像头可识别车牌号和时间

车辆出来时，出口显示器显示车牌号和停车时长

```js
// 停车场
class Park {
  constructor(floors) {
    this.floors = floors || []
    this.camera = new Camera()
    this.screen = new Screen()
    this.carList = {}  // 存储摄像头拍摄返回的车辆信息
  }
  in (car) {
    // 通过摄像头获取信息
    const info = this.camera.shot(car)
    // 停到某个停车位
    const i = parseInt(Math.random() * 100 % 100)  // 生成一个随机数1~100
    const place = this.floors[0].places[i]
    place.in()
    info.place = place
    this.carList[car.num] = info
  }
  out (car) {
    // 获取信息
    const info = this.carList[car.num]
    // 将停车位清空
    const place = info.place
    place.out()
    // 显示时间
    this.screen.show(car, info.inTime)
    // 清空记录
    delete this.carList[car.num]
  }
  emptyNum () {  // 显示每层还有多少空位
    return this.floors.map( floor => {
      return `${ floor.index }层有${ floor.emptyPlaceNum() }空车位`
    }).join('\n')
  }
}
// 车辆
class Car {
  constructor (num) {
    this.num = num
  }
}
// 层
class Floor {
  constructor (index, places) {
    this.index = index  // 第几层
    this.places = places || []  // 总共有多少车位
  }
  emptyPlaceNum () {  // 空的车位数量
    let num = 0
    this.places.forEach(p => {
      if (p.empty) {
        num += 1
      }
    })
    return num
  }
}
// 车位
class Place {
  constructor () {
    this.empty = true  // 车位默认是空的
  }
  in () {  // 车辆进入时，车位状态改变为有车
    this.empty = false
  }
  out () {  // 车辆出来时，车位状态改变空
    this.empty = true
  }
}
// 摄像头
class Camera {
  shot (car) {
    return {
      num: car.num,
      inTime: Date.now()
    }
  }
}
// 出口显示屏
class Screen {
  show (car, inTime) {
    console.log('车牌号', car.num)
    console.log('停车时间', Date.now() - inTime)
  }
}

// 测试--------------------
// 初始化停车场（3层，每层100个车位）
const floors = []
for (let i = 0; i < 3; i++ ) {
  const places = []
  for (let j = 0; j < 100; j++ ) {
    places[j] = new Place()
  }
  floors[i] = new Floor(i+1, places)
}
// 停车场
const park = new Park(floors)
// 初始化车辆
const car1 = new Car(1001)
const car2 = new Car(1002)
const car3 = new Car(1003)

console.log('第一辆车进入')
console.log(park.emptyNum())
park.in(car1)
console.log('第二辆车进入')
console.log(park.emptyNum())
park.in(car2)
console.log('第一辆车离开')
park.out(car1)
console.log('第二辆车离开')
park.out(car2)
console.log('第三辆车进入')
console.log(park.emptyNum())
park.in(car3)
```

> ## 工厂模式

例子：jQuery的$、react的React.createElement都是一个工厂模式设计的函数。
```js
class Vnode (tag, attrs, children) {
  // ...省略内部代码...
}

React.createElement = function (tag, attrs, children) {
  return new Vnode(tag, attrs, children)
}
```

```js
class jQuery {
  constructor (selector) {
    let slice = Array.prototype.slice
    let dom = slice.call(document.querySelectorAll(selector))
    let len = dom ? dom.length : 0
    for (let i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
  }
  append (node) {

  }
  addClass (name) {

  }
  //...此处省略
}

window.$ = function (selector) {
  return new jQuery(selector)
}
```

> ## 单例模式

就是说这个函数只能被new一次,例如一个项目的登录、购物车模块，在项目中只有一个实例; jQuery只有一个$。这里用一个java代码的例子举例：

```js
public class SingleObject {
  // 注意，私有化构造函数，外部不能new，只能内部new
  private SingleObject () {}
  // 唯一被 new 出来的对象
  private SingleObject instance = null
  // 获取对象的唯一接口
  public SingleObject getInstance () {
    if (instance == null) {
      // 只 new 一次
      instance = new SingleObject()
    }
    return instance
  }
  // 对象方法
  public void login (username, password) {
    System.out.printIn('login....')
  }
}
```
下面这个是利用js的类静态方法实现的单例模式：
```js
// 这里要分清楚类的实例方法 和 类的静态方法
// 实例方法 即new 实例化后，实例才能调用的方法
// 静态方法 只能类调用，new 实例后的实例不能调用
class SingObject {
  login () {  // 类的实例方法
    console.log('login.....')
  }
}
SingObject.prototype.register = function () {  // 类的实例方法
  console.log('register....')
}
SingObject.getInstance = (function () {  // 类的静态方法
  let instance
  return function () {
    if (!instance) {
      instance = new SingObject()
    }
    return instance
  }
})()


// 测试
let obj1 = SingObject.getInstance()
obj1.login()
let obj2 = SingObject.getInstance()
obj2.login()

console.log(obj1 === obj2)  // ===> true  // 符合单例模式只能new一次

let obj3 = new SingObject()
obj3.login()

console.log(obj1 === obj3)  // ===> false
```

> ## 装饰器模式

装饰器就是一个函数，可以实现代码的复用
```js
function test (target) {
  target.isOk = true  // 这里的target就是Person
}

@test
class Person {

}

// 这个装饰器的作用：给Person类加一个isOk属性

@test
class Students {
}
// Students类也被装饰器修饰，那么他也就会增加一个isOk的属性

```



