---
title: Vue源码学习笔记
date: 2019-08-11 13:16:39
---

> 1. vue支持的最低浏览器是？以及为什么？

通过看vue的源码发现用了Object.defineProperty()方法，这个方法在IE8下不能支持，所以vue只吃饭的最低浏览器版本是IE8。

<code>Object.defineProperty(obj, prop, descriptor)</code>
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

> 2. vue代理对data数据的读操作

```
let vm = new Vue({
  data () {
    return {
      name: '张三',
      age: 20
    }
  }
})
```
vue实例得到data的name的值，为什么不是vm.data.name而是vm.name就可以直接拿到，是因为vue的实例vm代理对data数据的读操作。