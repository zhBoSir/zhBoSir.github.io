---
title: vue3笔记
date: 2020-12-05 20:59:02
categories:
  - Vue
tags:
  - Vue
---

> ## <font color="gold" >1. vue2.0和vue3.0对比</font>

+ <code>tree shaking</code> 只打包必要的依赖项。比如引入一个ui框架，但是只用了button，那么就只会把button以及button的依赖项打进去。

+ vdom提升性能，<code>核心思想：跳过静态节点，只处理动态节点。</code>

<!-- more -->

+ 支持TypeScript

+ 与vue2相比，之前的template里面必须有一个根元素，vue3中不需要了。

+ composition-api 逻辑复用 代替了mixin

> ## <font color="gold" >2. vue2.0和vue3.0响应式原理对比</font>

vue2.0使用的是Object.defineProperty方法实现响应式

<font color="pink">缺点：</font>

1.无法监测到对象属性的动态添加和删除

2.无法监测到数组的下标和length属性的变更

<font color="pink">解决办法：</font>

1.vue2.0提供vue.set方法用于动态给对象添加属性

2.vue2.0提供vue.delete方法用于动态删除对象的属性

3.重写vue中数组的方法，用于监测数组的变化

vue3.0使用ES6中的proxy实现响应式数据

<font color="pink">缺点：</font>

1.ES6的proxy语法对于低版本浏览器不支持IE11

<font color="pink">优点：</font>

1.可以监测到代理对象属性的动态添加和删除

2.可以监测到数组的下标和length属性的变化

> ## <font color="gold" >3. vue3.0是如何变快的？</font>

<font color="pink">diff方法优化：</font>

+ vue2中的虚拟dom是进行全量的对比

+ vue3新增了静态标记（patchFlag）

在与上次虚拟节点进行对比时候，只对比带有patch falg的节点，并且可以通过flag的信息得知当前节点要对比的具体内容。

<font color="pink">静态提升：</font>

+ vue2中无论元素是否参与更新，每次都会重新创建

+ vue3中对于不参与更新的元素，只会被创建一次，之后会在每次渲染时候被不停的复用。

> ## <font color="gold" >4. toRef 与 toRefs的区别</font>

+ toRef：创建一个ref对象，其value值指向另一个对象中的某个属性
```js
toRef语法：const name = toRef(object , 'property')
```

+ toRefs：功能与toRef一致，但可以批量创建多个ref对象
```js
toRefs语法：toRefs(object)
```

+ 可以用return { ...toRefs(object)}的方式，将整个响应式对象object的所有属性提供给外部使用。

+ toRefs常用于es6的解构赋值操作，因为在对一个响应式对象直接解构时解构后的数据将不再有响应式，而使用toRefs可以方便解决这一问题。

```js
let { a, b } = reactive({
  a: 1,
  b: 2
})

// 解构出来不是响应式数据
console.log(a, b)  // 1, 2

================================

// 改成响应式的
let obj = reactive({
  a: 1,
  b: 2
})

let　{ a, b } = toRefs(obj)
console.log(a, b) // 这里的a,b才是响应式的

```





