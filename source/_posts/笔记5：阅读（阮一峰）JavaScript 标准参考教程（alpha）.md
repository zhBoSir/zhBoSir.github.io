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