---
title: vue源码笔记
date: 2020-08-07 16:49:02
categories:
  - Vue
tags:
  - Vue
---

- 1.要想知道数据什么时候被读取了或数据什么时候被改写了，其实不难，JS为我们提供了<code>Object.defineProperty</code>方法，通过该方法我们就可以轻松的知道数据在什么时候发生变化。

- 2.vue中定义了<code>observer</code>类，它用来将一个正常的<code>object对象</code>通过<code>Object.defineProperty</code>转换成<code>可观测的object</code>

<!-- more -->

- 3.只要将一个object传到observer中，那么这个object就会变成可观测的、响应式的object。

- 4.在Vue中实现了一个叫做Watcher的类，而Watcher类的实例就是所说的那个谁用到了数据的"谁"。换句话说就是：谁用到了数据，谁就是依赖，我们就为谁创建一个Watcher实例。在之后数据变化时，我们不直接去通知依赖更新，而是通知依赖对应的Watch实例，由Watcher实例去通知真正的视图。

- 5.vue中对数据的侦测变化，使用Object.defineProperty对对象数据侦测。对数组怎么侦测？

- 6.VNode的作用

VNode在Vue的整个虚拟DOM过程起了什么作用呢？

其实VNode的作用是相当大的。我们在视图渲染之前，把写好的template模板先编译成VNode并缓存下来，等到数据发生变化页面需要重新渲染的时候，我们把数据发生变化后生成的VNode与前一次缓存下来的VNode进行对比，找出差异，然后有差异的VNode对应的真实DOM节点就是需要重新渲染的节点，最后根据有差异的VNode创建出真实的DOM节点再插入到视图中，最终完成一次视图更新。

- 7.模板编译篇：HTML解析器内部运行流程：一边解析不同的内容一边调用对应的钩子函数生成对应的AST节点（解析到开始标签时，调用开始钩子函数；解析到文本节点时，调用文本钩子函数；解析到注释节点时，调用注释钩子函数），最终完成将整个模板字符串转化成AST（抽象语法树）,这就是HTML解析器所要做的工作。

在解析器内维护了一个栈，用来保证构建的AST节点层级与真正DOM层级一致。


参考：

[逐行剖析Vue.js源码](https://vue-js.com/learn-vue/)
