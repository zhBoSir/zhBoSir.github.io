---
title: Vue面试题02
date: 2020-04-28 09:43:39
categories:
  - 面试
tags: 
  - 面试
---


## <font color="gold">1.hash路由和history路由</font>
location.hash的值实际就是URL中<code>#</code>后面的东西。

history实际采用了HTML5中提供的API来实现，主要有<code>history.pushState()</code>和<code>history.replaceState()</code>。

## <font color="gold">2.请说一下你对响应式数据的理解？</font>

+ 对象：使用Object.defineProperty将属性进行劫持（只会劫持已经存在的属性）；多层对象是通过递归来实现劫持的。

+ 数组：通过改写数组的方法实现的。 在vue中修改数组的索引和长度是无法监控到的，需要通过重写的7个（push、shift、pop、splice、unshift、sort、reverse）方法修改数组才会触发数组对应watcher进行更新。 要更改数组的索引以及长度，可以通过vue.$set()。

+ vue3中是通过proxy来实现响应式数据。

+ 内部依赖收集是怎样做到的，每个属性都拥有自己的dep属性，存放他所依赖的watcher，当属性变化后会通知自己对应的watcher去更新。
```js
// 用Object.defineProperty实现对象的响应式例子

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div class="app"></div>

  <script>
    let state = {count: '1'}
    let app = document.querySelector('.app')
    let active;

    function defineReactive (obj) {
      for (let key in obj) {
        let value = obj[key]
        let dep = []
        Object.defineProperty(obj, key, {
          get() {
            if (active) {
              dep.push(active)  // 依赖收集
            }
            return value
          },
          set (newValue) {  // 触发更新
            value = newValue
            dep.forEach( watcher => watcher())
          }
        })
      }
    }

    defineReactive(state)

    const watcher = (fn) => {
      active = fn
      fn()
      active = null
    }

    watcher(() => {
      app.innerHTML = state.count
    })

    watcher(() => {
      console.log(state.count)
    })
    
    
  </script>
</body>
</html>
```

## <font color="gold">3.为何vue采用异步渲染？</font>

因为如果不采用异步更新，那么每次更新数据都会对当前组件进行重新渲染，所以为了性能考虑，vue会在本轮数据更新后，再去异步更新视图！

## <font color="gold">4.nextTick实现原理？</font>

nextTick方法主要是使用了宏任务和微任务，定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列。所以这个nextTick方法就是异步方法。

## <font color="gold">5.为什么v-for和v-if不能连用</font>

v-for会比v-if的优先级高一些，如果连用的话会把v-if给每个元素都添加一下，会造成性能问题。

如果要用的话，可以使用computed
```js
<ul>
  <li
    v-for="user in showUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>

computed: {
  showUsers: function () {
    return this.users.filter(function (user) {
      return user.isShow
    })
  }
}
```

## <font color="gold">6.vuex在什么场景下使用？</font>

多个组件共享数据或者是跨组件传递数据时

## <font color="gold">7.linkActiveClass与active-class？</font>

都是router-link组件的属性，linkActiveClass是配置在全局，active-class是配置在标签上。

<code>设置链接激活时使用的 CSS 类名。</code>

## <font color="gold">8.vue中v-for与v-if能同时使用吗？哪个优先级高？</font>

通过看vue的源码，源码里

```js
// for是在前面的，所以v-for的优先级高
else if (el.for) {
  ...
} else if (el.if) {
  ...
}
```
<code>结论：</code>


+ v-for优先于v-if被解析

+ 如果同时出现，每次渲染都会先执行循环再判断条件，无论如何循环都不可避免，浪费了性能

+ 要避免出现这种情况，则在外层嵌套template，在上面进行v-if判断，然后在内部进行v-for循环

```js
<template v-if="isShow">
  <p v-for="item in list">{{item}}</p>
</template>
```

## <font color="gold">9.vue中data为什么是一个函数不是一个对象？vue的根实例为什么又是一个对象？</font>

+ vue组件可能存在多个实例，如果使用对象形式定义data，就会导致它们公用一个data对象，那么状态变更将会影响所有组件实例，这是不合理的，采用函数形式定义，在initData时会将其作为工厂函数返回全新data对象，有效规避多实例之间状态污染问题。

+ 而在vue根实例创建过程中则不存在限制，是因为根实例只能有一个，不需要担心这种情况。

## <font color="gold">10.vue中key的作用？</font>

+ key的作用主要是为了高效的更新虚拟Dom,其原理是vue在patch过程中通过key可以精准判断两个节点是否是同一个，从而避免频繁更新不同元素，使得整个patch过程更加高效，减少Dom操作量,提高性能。





