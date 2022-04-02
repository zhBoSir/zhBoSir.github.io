---
title: 读vue技术揭秘笔记
date: 2021-12-31 10:34:57
categories:
  - Vue
tags:
  - Vue
---

[vue.js技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)

> # 1.定义变量，然后使用类进行约束

```js
class Bar {
  x: string;           
  y: string | number;  // y 可以是字符串或者数字
  z: boolean;

  constructor(x: string, y: string | number) {
    this.x = x
    this.y = y
    this.z = false
  }
}

var bar: Bar = new Bar('hello', 4)

var obj: { a: string, b: number, c: Array<string>, d: Bar } = {
  a: 'hello',
  b: 11,
  c: ['hello', 'world'],
  d: new Bar('hello', 3)  // 这里是关键
}

// 解释：这里定义的变量obj，必须是按：后面的约束

```

<!-- more -->

> # 2.若想任意类型 T 可以为 null 或者 undefined，只需类似如下写成 ?T 的格式即可。

```js
var foo: ?string = null
```
此时，foo 可以为字符串，也可以为 null。

> # 3.在源码中看beforeCreate 和 created

```js
Vue.prototype._init = function (options?: Object) {
  // ...
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')
  // ...
}
```

可以看到 beforeCreate 和 created 的钩子调用是在 initState 的前后，initState 的作用是初始化 props、data、methods、watch、computed 等属性。那么显然 beforeCreate 的钩子函数中就不能获取到 props、data 中定义的值，也不能调用 methods 中定义的函数。

一般来说，如果组件在加载的时候需要和后端有交互，放在这俩个钩子函数执行都可以，如果是需要访问 props、data 等数据的话，就需要使用 created 钩子函数。

> # 4.异步组件

<code>方法一：</code>
```js

Vue.component(
  'async-webpack-example',
  // 该 `import` 函数返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```
<code>方法一：</code>
```js
Vue.component('async-example', function (resolve, reject) {
   // 这个特殊的 require 语法告诉 webpack
   // 自动将编译后的代码分割成不同的块，
   // 这些块将通过 Ajax 请求自动下载。
   require(['./my-async-component'], resolve)
})
```

示例中可以看到，Vue 注册的组件不再是一个对象，而是一个工厂函数，函数有两个参数 resolve 和 reject，函数内部用 setTimout 模拟了异步，实际使用可能是通过动态请求异步组件的 JS 地址，最终通过执行 resolve 方法，它的参数就是我们的异步组件对象。

> # 5.保证函数只执行一次

```js
/**
 * Ensure a function is called only once.
 */
export function once (fn: Function): Function {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
```
once 逻辑非常简单，传入一个函数，并返回一个新函数，它非常巧妙地利用闭包和一个标志位保证了它包装的函数只会执行一次，也就是确保 resolve 和 reject 函数只执行一次。

> # 6.this.$forceUpdate()

因为 Vue 通常是数据驱动视图重新渲染，但是在整个异步组件加载过程中是没有数据发生变化的，所以通过执行 $forceUpdate 可以强制组件重新渲染一次。

```js
<template>
  <div class="home">
    <span>{{ obj.name }}</span>
    <button @click="changeName">change</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      obj: {}
    }
  },
  methods: {
    changeName () {
      // 方法一：
      this.obj.name = '小稻'
      this.$forceUpdate()

      // 方法二：
      // this.$set(this.obj, 'name', '小稻')

      // 如果不使用上面的this.$forceUpdate()与this.$set()，那么点击按钮的时候，给obj.name赋值，不会渲染到页面
    }
  }
}
</script>

```
<font color="gold">扩展：</font>

<code>一：对象添加属性</code>

对于使用 Object.defineProperty 实现响应式的对象，当我们去给这个对象添加一个新的属性的时候，是不能够触发它的 setter 的，比如：
```js
var vm = new Vue({
  data:{
    a:1
  }
})
// vm.b 是非响应的
vm.b = 2
```

但是添加新属性的场景我们在平时开发中会经常遇到，那么 Vue 为了解决这个问题，定义了一个全局 API Vue.set 方法。

<code>二：数组</code>

Vue 也是不能检测到以下变动的数组：

1.当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue

2.当你修改数组的长度时，例如：vm.items.length = newLength

对于第一种情况，可以使用：Vue.set(example1.items, indexOfItem, newValue)；而对于第二种情况，可以使用 vm.items.splice(newLength)。

> # 7.this.$nextTick(）

了解到数据的变化到 DOM 的重新渲染是一个异步过程，发生在下一个 tick。这就是我们平时在开发的过程中，比如从服务端接口去获取数据的时候，数据做了修改，如果我们的某些方法去依赖了数据修改后的 DOM 变化，我们就必须在 nextTick 后执行。比如下面的伪代码：
```js
getData(res).then(()=>{
  this.xxx = res.data
  this.$nextTick(() => {
    // 这里我们可以获取变化后的 DOM
  })
})
```

> # 8.input的v-model实现原理

<font color="gold">一：</font>

```js
<input v-model="message" placeholder="edit me">
```

input 实现 v-model 的精髓，通过修改 AST 元素，给 el 添加一个 prop，相当于我们在 input 上动态绑定了 value，又给 el 添加了事件处理，相当于在 input 上绑定了 input 事件，其实转换成模板如下：

```js
<input
  v-bind:value="message"
  v-on:input="message=$event.target.value">
```

其实就是动态绑定了 input 的 value 指向了 messgae 变量，并且在触发 input 事件的时候去动态把 message 设置为目标值，这样实际上就完成了数据双向绑定了，所以说 v-model 实际上就是语法糖。

<font color="gold">二：</font>

子组件的 value prop 以及派发的 input 事件名是可配的，可以在定义子组件的时候通过 model 选项配置子组件接收的 prop 名以及派发的事件名。
```js
let Child = {
  template: '<div>'
  + '<input :value="msg" @input="updateValue" placeholder="edit me">' +
  '</div>',
  props: ['msg'],
  model: {
    prop: 'msg',
    event: 'change'
  },
  methods: {
    updateValue(e) {
      this.$emit('change', e.target.value)
    }
  }
}

let vm = new Vue({
  el: '#app',
  template: '<div>' +
  '<child v-model="message"></child>' +
  '<p>Message is: {{ message }}</p>' +
  '</div>',
  data() {
    return {
      message: ''
    }
  },
  components: {
    Child
  }
})
```
子组件修改了接收的 prop 名以及派发的事件名，然而这一切父组件作为调用方是不用关心的，这样做的好处是我们可以把 value 这个 prop 作为其它的用途。

> # 9.keep-alive缓存的生命周期钩子函数

组件一旦被 &lt;keep-alive&gt; 缓存，那么再次渲染的时候就不会执行 created、mounted 等钩子函数，但是我们很多业务场景都是希望在我们被缓存的组件再次被渲染的时候做一些事情，好在 Vue 提供了 activated 钩子函数，它的执行时机是 &lt;keep-alive&gt; 包裹的组件渲染的时候。

已缓存的组件不会执行 mounted，所以不会有一般的组件的生命周期函数但是又提供了 activated 和 deactivated 钩子函数。

> # 10.v-once指令

+ v-once所在节点在初次动态渲染后，就视为静态内容了。
+ 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。
