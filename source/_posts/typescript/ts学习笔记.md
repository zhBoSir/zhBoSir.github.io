---
title: ts学习笔记
date: 2020-12-19 22:34:00
categories:
  - TypeScript
tags: 
---

> ## <code>1.ts-node</code>包
```js
// node中执行ts代码需要两个步骤：

tsc hello.ts  // 把hello.ts转成hello.js
node hello.js
```
安装ts-node包后，只需
```js
ts-node hello.ts
```

> ## <code>2.将数字字符串类型转换成数字类型</code>

```js
console.log(2-'1')  // 在ts里会报错，因为数字不能减字符串

改成

console.log(2- +'1')  // 输出1
```

> ## <code>3.break与continue</code>
```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break  // 跳出循环
  }
  console.log(`第${i}个`)
}

// 输出：
// 第1个
// 第2个
```
```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue  // 跳出本次循环
  }
  console.log(`第${i}个`)
}

// 输出：
// 第1个
// 第2个
// 第4个
// 第5个
```

> ## <code>4.声明数组的方式</code>
```js
// 第一种方式
let arr: string[] = ['1', '2']
let arr: number[] = [1, 2]
```
```js
// 第二种方式：通过泛型的方式
let arr: Array<string> = ['1', '2']
let arr: Array<number> = [1, 2]
```

> ## <code>5.元组（数组的升级）</code>
元组即已知（确定）每一项的类型，以及已知（确定）数组的个数
```js
let arr: [string, number, string, boolean]
arr = ['1', 1, '1', true]
```

> ## <code>6.枚举类型</code>

```js
enum Sex {
  Man,
  Woman
}

let sex1: Sex = Sex.Man
let sex2: Sex = Sex.Woman

console.log(sex1)  // 输出0
console.log(sex2)  // 输出1
```
```js
enum Sex {
  Man = 1,
  Woman = 8
}

let sex1: Sex = Sex.Man
let sex2: Sex = Sex.Woman

console.log(sex1)  // 输出1
console.log(sex2)  // 输出8
```

```js
enum Sex {
  Man = 1,
  Woman = 8
}

let sex1name: string = Sex['1']
let sex2name: string = Sex['8']

console.log(sex1name)  // 输出Man
console.log(sex2name)  // 输出Woman
```

> ## <code>7.类类型</code>

类类型即类遵循接口的约束
```js
// 接口就是规范，继承它的都要遵循它的写法
interface ClockInterface {
  currentTime: Date  // 属性 // 一旦接口里定义了，继承的类就要实现
  setTime (d: Date) {}  // 方法
}

class Clock implements ClockInterface {
  currentTime: Date  // 实现
  constructor (h: number, m: number) {
    console.log(h, m)
  }
  setTime (d: Date) {
    console.log(d)
  }
}
```
类继承接口用关键字<code>implements</code>

> ## <code>8.接口的继承</code>

```js
interface Animal {
  breed: string
}
interface Cat extends Animal {
  color: string
}
let cat = {} as Cat

cat.breed = '波斯猫'
cat.color = 'red'


// 继承两个接口
interface Mammal {
  leg: number
}

interface Dog extends Animal,Mammal {
  color: string
}
let dog = {} as Dog

dog.breed = '开啡狗'
dog.color = 'orange'
dog.leg = 4

```

> ## <code>9.interface接口可选属性</code>
```js
interface Circle {
  color: string,
  area: number
}
interface CircleConfig {
  color?: string  // 接口属性可选
  radius?: number // 接口属性可选
}

// demo
function createCircle(config: CircleConfig): Circle {
  let newCircle = {color: 'green', area: 100}
  if (config.color) {
    newCircle.color = config.color
  }
  if (config.radius) {
    newCircle.area = Math.PI * config.radius * config.radius
  }
  return newCircle
}
```

> ## <code>10.interface只读属性</code>
```js
interface FullName {
  readonly firstName: string
  readonly lastName: string
}
```
只读数组
```js
let arr: ReadonlyArray<number> = [1,2,3,4]

// 只读数组，这样
// arr.push(5)
// arr.pop()
// arr[0] = 10
// arr.length = 8
// 这几个都不能用了
```

> ## <code>11.类型断言</code>

断言的好处：可以让断言后变量身上的方法和属性被<code>.</code>出来，比如字符串的length、substr()、split()方法，数组的push()、pop()

两种方式：
```js
// 第一种方式

let obj: any = 'like it, it like'

let str: string = (<string>obj).substr(0, 3)  
// 通过<string>obj这种方式就可以断言obj为string类型，那么就可以使用string的属性和方法

// 第二种方式

let str: string = (obj as string).substr(0, 4)
```



