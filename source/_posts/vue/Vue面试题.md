---
title: Vue面试题01
date: 2020-04-22 09:43:39
categories:
  - 面试
tags: 
  - 面试
---

> ## <font color="gold" >1. 讲一讲MVVM？</font>

MVVM是Model-View-ViewModel缩写，也就是把MVC中的Controller演变成ViewModel。Model层代表数据模型，View代表UI组件，ViewModel是View和Model层的桥梁，数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据。

MVVM就是一个双向绑定的过程。在vue中数据都是响应式的，数据变化了会驱动视图，视图更改了数据也会发生变化，比如v-model就实现了一个双向数据绑定的过程。

> ## <font color="gold" >2.说一下Vue的生命周期</font>

<code>beforeCreate</code>是new Vue()之后触发的第一个钩子，<font color="pink">在当前阶段data、methods、computed以及watch上的数据和方法都不能被访问。</font>

<code>created</code>在实例创建完成后发生，当前阶段已经完成了数据观测，也就是<font color="pink" >可以使用数据，更改数据</font>，在这里更改数据不会触发updated函数。可以做一些初始数据的获取，<font color="pink" >在当前阶段无法与Dom进行交互，如果非要想，可以通过vm.$nextTick来访问Dom。</font>

<code>beforeMounted</code>发生在挂载之前，在这之前template模板已导入渲染函数编译。而<font color="pink" >当前阶段虚拟Dom已经创建完成，即将开始渲染</font>。在此时也可以对数据进行更改，不会触发updated。

<code>mounted</code>在挂载完成后发生，<font color="pink" >在当前阶段，真实的Dom挂载完毕，数据完成双向绑定，可以访问到Dom节点，使用$ref属性对Dom进行操作。</font>

<code>beforeUpdate</code>发生在更新之前，也就是响应式数据发生更新，虚拟dom重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。

<code>updated</code>发生在更新完成之后，当前阶段组件Dom已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。

<code>beforeDestroy</code>发生在实例销毁之前，<font color="pink" >在当前阶段实例完全可以被使用</font>，我们可以在这时进行善后收尾工作，比如清除计时器。

<code>destroyed</code>发生在实例销毁之后，这个时候只剩下了dom空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。

参考：

[20+Vue面试题整理](https://mp.weixin.qq.com/s/pjKzhSi0oamqzVFGd-d7dg)

> ## <font color="gold" >3.vue父子组件生命周期顺序</font>

组件的调用顺序都是先父后子，渲染完成的顺序是先子后父。

组件的销毁操作是先父后子，销毁完成的顺序是先子后父。

```js
加载渲染过程
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount- >子mounted->父mounted

子组件更新过程
父beforeUpdate->子beforeUpdate->子updated->父updated

父组件更新过程
父 beforeUpdate -> 父 updated

销毁过程
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

```

+ father组件的beforeMount时，child子组件的vue创建生命周期已经完成到mounted阶段。说明father在执行dom模板渲染（渲染dom模板只是在内存中，并非是在HTML中的DOM结构中渲染，内存中渲染DOM可以理解为是Virtual DOM技术）的时候，会监测模板中是否有自定义的vue子组件。如果有，就进入子组件的生命周期的创建阶段，等到所有子组件的完成创建并挂载（mounted）到父组件的模板当中后。才能表明父组件在内存中的模板渲染完成。

+ 在beforeDestroy与destroyed之间，组件开始注销自己的属性、方法、事件以及自己的子组件。只有等到所有都已注销完成（子组件达到destroyed阶段），父组件才能够进入destroyed阶段。

参考：

[vue生命周期，及父子组件生命周期顺序](https://www.cnblogs.com/jaykoo/p/10529518.html)

[vue父子组件的生命周期顺序](https://www.jianshu.com/p/e98290a974d9)

> ## <font color="gold" >4.说一下v-if和v-show的区别</font>

当条件不成立时，<code>v-if不会渲染DOM元素，v-show操作的是样式(display)</code>，切换当前DOM的显示和隐藏。

> ## <font color="gold" >5. 说一下Computed和Watch</font>
Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。适用于计算比较消耗性能的计算场景。当<code>表达式过于复杂时</code>，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。

Watch没有缓存性，更多的是<code>观察的作用</code>，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开deep：true选项，这样便会对对象中的每一项进行监听。这样会带来性能问题，优化的话可以使用字符串形式监听，如果没有写到组件中，不要忘记使用unWatch手动注销哦。

> ## <font color="gold" >6.组件中的data为什么是一个函数？</font>
一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。

> ## <font color="gold" >7.说一下v-model的原理</font>
v-model本质就是一个语法糖，可以看成是value + input方法的语法糖。可以<code>通过model属性的prop和event属性来进行自定义</code>。原生的v-model，会根据标签的不同生成不同的事件和属性。

> ## <font color="gold" >8.虚拟Dom以及key属性的作用</font>

+ 由于在浏览器中操作DOM是很昂贵的。频繁的操作DOM，会产生一定的性能问题。这就是虚拟Dom的产生原因。

+ Virtual DOM本质就是用一个原生的JS对象去描述一个DOM节点。是对真实DOM的一层抽象。

+ key的作用是尽可能的复用 DOM 元素。

> ## <font color="gold">9.keep-alive</font>

keep-alive可以实现组件缓存，当组件切换时不会对当前组件进行卸载。

> ## <font color="gold">10.Vue2.x组件通信有哪些方式？</font>

<font color="skyblue" size="3">父子组件通信</font>

父->子props，子->父 $on、$emit

获取父子组件实例 $parent、$children

Ref 获取实例的方式调用组件的属性或者方法

Provide、inject 官方不推荐使用，但是写组件库时很常用

<font color="skyblue" size="3">兄弟组件通信</font>

Event Bus 实现跨组件通信 Vue.prototype.$bus = new Vue

Vuex

<font color="skyblue" size="3">跨级组件通信</font>

Vuex

$attrs、$listeners

Provide、inject

## <font color="gold">11.hash路由和history路由</font>
location.hash的值实际就是URL中<code>#</code>后面的东西。

history实际采用了HTML5中提供的API来实现，主要有<code>history.pushState()</code>和<code>history.replaceState()</code>。

