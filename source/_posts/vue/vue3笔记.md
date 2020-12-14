---
title: vue3笔记
date: 2020-12-05 20:59:02
categories:
  - Vue
tags:
  - Vue
---

+ <code>tree shaking</code> 只打包必要的依赖项。比如引入一个ui框架，但是只用了button，那么就只会把button以及button的依赖项打进去。

+ vdom提升性能，<code>核心思想：跳过静态节点，只处理动态节点。</code>

<!-- more -->

+ 支持TypeScript

+ 与vue2相比，之前的template里面必须有一个根元素，vue3中不需要了。

+ composition-api 逻辑复用 代替了mixin

> ## vue2.0和vue3.0响应式原理对比

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

> ## vue3.0是如何变快的？

<font color="pink">diff方法优化：</font>

+ vue2中的虚拟dom是进行全量的对比

+ vue3新增了静态标记（patchFlag）

在与上次虚拟节点进行对比时候，只对比带有patch falg的节点，并且可以通过flag的信息得知当前节点要对比的具体内容。

<font color="pink">静态提升：</font>

+ vue2中无论元素是否参与更新，每次都会重新创建

+ vue3中对于不参与更新的元素，只会被创建一次，之后会在每次渲染时候被不停的复用。





