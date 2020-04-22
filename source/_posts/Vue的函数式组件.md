---
title: Vue的函数式组件
date: 2020-04-21 09:41:39
---

> ## vue的函数式组件

函数式组件是用来定义：那些<code>没有响应数据</code>，也<code>不需要有任何生命周期</code>的场景，它<code>只接受一些props </code>来显示组件。

使用方法： 
```js

Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})

// 或者单文件定义函数式组件
<template functional>
  <button
    class="btn btn-primary"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot/>
  </button>
</template>
```
<font color="gold" size="3">参数:</font>

+ <code>functional</code>  设置为true 即表示该组件为一个函数组件
+ <code>props（可选）</code>  传递值到组件内部
+ <code>render函数</code>  提供渲染函数来返回一个vnode

<font color="gold" size="3">和正常自定义组件的区别？</font>

+ 不维护响应数据
+ 无钩子函数
+ 没有instance实例,所以在组件内部没有办法像传统组件一样通过this来访问组件属性

<font color="gold" size="3">什么场景适合使用？</font>

正是因为函数式组件精简了很多例如响应式和钩子函数的处理，因此渲染性能会有一定的提高，所以如果你的业务组件是一个纯展示且不需要有响应式数据状态的处理的，那函数式组件会是一个非常好的选择。

<font color="gold" size="3">render函数</font>

render函数是函数式组件最重要的参数，且是必须的。

render函数有两个参数，一个是createElement，一个是context

+ createElement 是创建虚拟dom的函数
+ context 是函数式组件的上下文

<font color="gold" size="3">context中的scopedSlots使用演示</font>

```js
<func-comp>
   <div slot-scope="scope">demo functional component {{scope.a}}</div>
</func-comp>


Vue.component('func-comp', {
	functional: true,
	props: {
	  name: String
	},
	render (createElement, context) {
	  return createElement('div', context.data, [context.scopedSlots.default({
		 a:1
	  })])
	}
})
```

参考：

[Vue 函数式组件原理和使用详解](https://blog.csdn.net/weixin_41275295/article/details/100189869)