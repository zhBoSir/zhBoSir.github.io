---
title: 笔记4：阅读（阮一峰）JavaScript 标准参考教程（alpha）
date: 2019-06-06 12:06:39
---

**61.** 对象的拷贝
有时，我们需要将一个对象的所有属性，拷贝到另一个对象，可以用下面的方法实现。
```
var extend = function (to, from) {
  for (var property in from) {
    to[property] = from[property];
  }

  return to;
}

extend({}, {
  a: 1
})
// {a: 1}
```
上面这个方法的问题在于，如果遇到存取器定义的属性，会只拷贝值。
```
extend({}, {
  get a() { return 1 }
})
// {a: 1}
```
为了解决这个问题，我们可以通过Object.defineProperty方法来拷贝属性。
```
var extend = function (to, from) {
  for (var property in from) {
    if (!from.hasOwnProperty(property)) continue;
    Object.defineProperty(
      to,
      property,
      Object.getOwnPropertyDescriptor(from, property)
    );
  }

  return to;
}

extend({}, { get a(){ return 1 } })
// { get a(){ return 1 } })
```
上面代码中，hasOwnProperty那一行用来过滤掉继承的属性，否则可能会报错，因为Object.getOwnPropertyDescriptor读不到继承属性的属性描述对象。

**62.**Array构造函数有一个很大的缺陷，就是不同的参数，会导致它的行为不一致。
```
// 单个正整数参数，表示返回的新数组的长度
new Array(1) // [ empty ]
new Array(2) // [ empty x 2 ]

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
new Array('abc') // ['abc']
new Array([1]) // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2) // [1, 2]
new Array('a', 'b', 'c') // ['a', 'b', 'c']
```

**63.** Array.isArray()
```
var arr = [1, 2, 3];

typeof arr // "object"
Array.isArray(arr) // true
```
上面代码中，typeof运算符只能显示数组的类型是Object，而Array.isArray方法可以识别数组。

**64.** toString方法也是对象的通用方法，数组的toString方法返回数组的字符串形式。
```
var arr = [1, 2, 3];
arr.toString() // "1,2,3"

var arr = [1, 2, 3, [4, 5, 6]];
arr.toString() // "1,2,3,4,5,6"
```

**64.** 
```
var obj = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.join.call(obj, '-')
// 'a-b'
```