---
title: 学习vue源码笔记
date: 2022-2-21 11:56:35
categories:
  - Vue
tags:
  - Vue
---

## 1. mustache模版引擎

+ 最简单的模板引擎的实现机理，利用的是正则表达式中的replace()方法。replace()的第二个参数可以是一个函数，这个函数提供捕获的东西的参数，然后结合data对象，即可进行智能的替换。

<!-- more -->

## 2. diff算法比对的是虚拟dom，不是真实的dom。

## 3.变化侦测篇

<font color="gold">（一）</font>

observer类，它用来<code>将一个正常的object转换成可观测的object</code>。

并且给value新增一个<code>__ob__属性</code>，值为该value的Observer实例。这个操作<code>相当于为value打上标记，表示它已经被转化成响应式了，避免重复操作</code>

也就是说，只要我们将一个object传到observer中，那么这个object就会变成可观测的、响应式的object。

<font color="gold">（二）</font>

依赖管理器Dep类

<font color="gold">（三）</font>

Watcher类

谁用到了数据，谁就是依赖，我们就为谁创建一个Watcher实例。以后这个Watcher实例就代表这个依赖，在之后数据变化时，我们不直接去通知依赖更新，而是通知依赖对应的Watch实例，由Watcher实例去通知真正的视图。

简单总结一下就是：Watcher先把自己设置到全局唯一的指定位置（window.target），然后读取数据。因为读取了数据，所以会触发这个数据的getter。接着，在getter中就会从全局唯一的那个位置读取当前正在读取数据的Watcher，并把这个watcher收集到Dep中去。收集好之后，当数据发生变化时，会向Dep中的每个Watcher发送通知。通过这样的方式，Watcher可以主动去订阅任意一个数据的变化。

<font color="gold">不足之处：</font>

虽然我们通过Object.defineProperty方法实现了对object数据的可观测，但是这个方法仅仅只能观测到object数据的取值及设置值，当我们向object数据里添加一对新的key/value或删除一对已有的key/value时，它是无法观测到的，导致当我们对object数据添加或删除值时，无法通知依赖，无法驱动视图进行响应式更新。

当然，Vue也注意到了这一点，为了解决这一问题，Vue增加了两个全局API:Vue.set和Vue.delete。

<font color="gold">整个流程：</font>

其整个流程大致如下：

+ Data通过observer转换成了getter/setter的形式来追踪变化。
+ 当外界通过Watcher读取数据时，会触发getter从而将Watcher添加到依赖中。
+ 当数据发生了变化时，会触发setter，从而向Dep中的依赖（即Watcher）发送通知。
+ Watcher接收到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，也有可能触发用户的某个回调函数等。

## 4.虚拟dom篇

<font color="gold">（一）</font>

VNode类

+ 虚拟DOM就是用JS来描述一个真实的DOM节点。而在Vue中就存在了一个<code>VNode类，通过这个类，我们就可以实例化出不同类型的虚拟DOM节点</code>

+ VNode在Vue的整个虚拟DOM过程起了什么作用呢？

其实VNode的作用是相当大的。我们在视图渲染之前，把写好的template模板先编译成VNode并缓存下来，等到数据发生变化页面需要重新渲染的时候，我们把数据发生变化后生成的VNode与前一次缓存下来的VNode进行对比，找出差异，然后有差异的VNode对应的真实DOM节点就是需要重新渲染的节点，最后根据有差异的VNode创建出真实的DOM节点再插入到视图中，最终完成一次视图更新。

<font color="gold">（二）</font>

patch

+ 对比新旧两份VNode并找出差异的过程就是所谓的DOM-Diff过程

+ 以新的VNode为基准，改造旧的oldVNode使之成为跟新的VNode一样，这就是patch过程要干的事。

+ 整个patch过程干了三件事，分别是：创建节点，删除节点，更新节点。

## 5.模板编译篇

<font color="gold">（一）</font>

Vue的模板编译，Vue会把用户在&lt;template&gt;&lt;/template&gt;标签中写的类似于原生HTML的内容进行编译，把原生HTML的内容找出来，再把非原生HTML找出来，经过一系列的逻辑处理生成渲染函数，也就是render函数，而render函数会将模板内容生成对应的VNode，而VNode再经过前几篇文章介绍的patch过程从而得到将要渲染的视图中的VNode，最后根据VNode创建真实的DOM节点并插入到视图中， 最终完成视图的渲染更新。

<font color="gold">（二）</font>

+ 用户写的模板---->模板编译---->render函数---->VNode---->patch---->视图

+ 将一堆字符串模板解析成抽象语法树AST后，我们就可以对其进行各种操作处理了，处理完后用处理后的AST来生成render函数。其具体流程可大致分为三个阶段：

1>模板解析阶段：将一堆模板字符串用正则等方式解析成抽象语法树AST；

2>优化阶段：遍历AST，找出其中的静态节点，并打上标记；

3>代码生成阶段：将AST转换成渲染函数；

+ 模板编译的最终目的就是：把用户所写的模板转化成供Vue实例在挂载时可调用的render函数。

## 6.生命周期篇

<font color="gold">（一）</font>

+ 初始化的时候遵循了这种顺序，先初始化props，接着初始化data，最后初始化watch。所以在开发中有注意到我们在data中可以使用props，在watch中可以观察data和props。

<font color="gold">（二）</font>

使用计算属性的示例，如下：
```js
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 仅读取
    aDouble: function () {
      return this.a * 2
    },
    // 读取和设置
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
vm.aPlus   // => 2
vm.aPlus = 3
vm.a       // => 2
vm.aDouble // => 4
```
可以看到，computed选项中的属性值可以是一个函数，那么该函数默认为取值器getter，用于仅读取数据；还可以是一个对象，对象里面有取值器getter和存值器setter，用于读取和设置数据。

<font color="gold">（三）</font>

vue基于源码构建的有两个版本，一个是runtime only(一个只包含运行时的版本)，另一个是runtime + compiler(一个同时包含编译器和运行时的完整版本)。而两个版本的区别仅在于后者包含了一个编译器。

只包含运行时版本没有模板编译阶段，初始化阶段完成后直接进入挂载阶段，而完整版本是初始化阶段完成后进入模板编译阶段，然后再进入挂载阶段。

## 源码不懂的地方：

+ Watcher类没看懂。





