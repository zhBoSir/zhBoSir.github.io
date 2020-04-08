---
title: js基础巩固
date: 2020-03-25 23:27:18
---

> ## this问题

+ es6的<code>class类里constructor里面的this</code>指向实例对象，<code>方法里面的this</code>指向这个方法的调用者。

> ## 对象创建

ES6是基于类class创建对象。

ES6之前是用一种称为构造函数的特殊函数来定义对象和他们的特征。

> ## new在执行时做的四件事

1, 在内存中创建一个新的空对象；

2, 让this指向这个新的对象；

3, 执行构造函数里面的代码，给这个新对象添加属性和方法；

4, 返回这个新对象（所以构造函数里面不需要return）

> ## 构造函数中的静态成员和实例成员

```js
function Star (name, age) {
  this.name = name
  this.age = age
  this.sing = function () {
    console.log('我会唱歌')
  }
}
Star.sex = '男'

let ldh = new Star('刘德华', 18)
ldh.sing()
```
像上面的name、age、sing都是通过this添加的成员，这些就是<code>实例成员</code>，实例成员只能通过实例化的对象来访问。

添加到构造函数上的成员就叫做<code>静态成员</code>，例如上面的sex。只能通过构造函数来访问。

> ## new构造函数创建实例时，为什么公共的函数要放到prototype原型上？

```js
// 构造函数
function Person (name, age) {
  this.name = name
  this.age = age
  // this.sing = function () {
  //   console.log('唱歌')
  // }
}

Person.prototype.sing = function () {
  console.log('唱歌')
}

let ldh = new Person('刘德华', 58)
let lf = new Person('路飞', 38)
```
<font color="skyblue">解析：</font>

每new一个实例的时候，里面的sing方法都会开辟一块内存，存在浪费内存问题。 所以把每个实例都要用的公共函数定义到prototype原型上就解决了这个问题，所有对象的实例就可以共享这些方法。

- JavaScript规定，每个构造函数都有一个<code>prototype</code>属性，指向一个对象，叫做原型对象。
- <code>原型的作用是共享方法。</code>
- <code>每一个实例对象都会有一个属性__proto__指向构造函数的prototype原型对象。</code>之所以实例对象可以使用构造函数prototype原型对象的属性和方法，就是因为实例对象有__proto__原型的存在。
- <code>__proto__对象原型和原型对象prototype是等价的。</code>
<hr>

```js
 ldh.__proto__.constructor 与 Person.prototype.constructor  都指向Person这个构造函数
```

```js
function Person (name, age) {
  this.name = name
  this.age = age
}

// Person.prototype.sing = function () {
//   console.log('唱歌')
// }

Person.prototype = {
  // 构造函数的原型对象是一个对象，之前是把sing方法挂载到这个对象上。下面是把原型对象重新赋值了一个对象，所以原型对象的constructor没有了，需要手动的利用constructor指回原来的构造函数。
  constructor: Person,
  sing: function () {
    console.log('唱歌')
  },
  movie: function () {
    console.log('电影')
  }
}

let ldh = new Person('刘德华', 58)
let lf = new Person('路飞', 38)
```

> ## 原型链

```js
还是上面的例子，ldh.__proto__指向的是Person构造函数的原型对象prototype，Person.prototype原型对象也有__proto__，指向Object.prototype;Object.prototype原型对象也有__proto__，指向null。
```

<code>只要是对象都有一个__proto__原型。</code>

> ## ES6之前的<code>继承</code>

```js
function Father (name, age) {
  this.name = name
  this.age = age
}
Father.prototype.money = function () {
  console.log('父亲有钱')
}

function Son (name, age) {
  // 通过构造函数和call实现属性继承
  Father.call(this, name, age)
}
// 通过new一个父亲构造函数，并把Son原型对象里的constructor重新手动指回Son,因为Son.prototype = new Father()这一步改变了Son原型对象里的constructor

// 通过这两步实现方法的继承
Son.prototype = new Father()
Son.prototype.contructor = Son

let lf = new Son('路飞', 18)
```

> ## ES6中class类
```js
class Star {

}

console.log(typeof Star) // ==> function
```
类的本质其实还是一个函数，也可以简单的认为 类就是 构造函数的另外一种写法。

ES6的类其实就是语法糖。

