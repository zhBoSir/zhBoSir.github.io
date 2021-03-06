<<<<<<< Updated upstream
---
title: vue知识点
date: 2020-03-22 21:51:18
categories:
  - Vue
tags:
  - Vue
---

> ## 1.style绑定样式对象

```html
<template>
  <p :style="styleObj">这是一个段落</p>
</template>

<script>
  export default {
    data () {
      return {
        // 属性名要用驼峰式命名
        styleObj: {
          color: 'red',
          fontSize: '12px',
          backgroundColor: 'gold'
        }
      }
    }
  }
</script>
```

> ## 2.computed计算属性具有缓存特性

computed本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，第一次访问 computed 属性，才会计算新的值。

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  },
  methods: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
})
```
上面的computed 和methods中都有reversedMessage，但是不同之处在于计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着<code>只要message还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果</code>，而不必再次执行函数。

<code>methods则会每次执行</code>

> ## 3.v-bind绑定一个有属性的对象
```js
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

// 或者

<div v-bind="attrObj"></div>

<script>
  export default {
    data: {
      return {
        attrObj: {
          id: '11',
          name: 'zhongguo',
          age: 5000
        }
      }
    }
  }
</script>
```

> ## 4.router-view标签上绑定key的作用

<code>在 router-view 上加上一个唯一的 key，来保证路由切换时都会重新渲染触发钩子。</code>
```js
<router-view :key="key"></router-view>

computed: {
  key() {
    // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
    return this.$route.fullPath
  }
 }
```

> ## 5.baseUrl转换成publicPath

<code>vue.config.js</codd>文件中，从vue cli3.3起baseUrl已弃用，得适用publicPath。

> ## 使用prettier + prettier-eslint(vetur)格式化代码

vscode的prettier格式化插件

prettier插件可以把文件格式化

+ husky + lint-staged把关代码质量


参考：

[Vue计算属性缓存(computed) vs 方法](https://www.cnblogs.com/Vanish-F/p/11730743.html)

> ## 6.vue中的环境变量

<code>process.env.NODE_ENV</code>来判断当前是开发环境（<code>development</code>）还是生产环境（<code>production</code>）


参考：

[Vue计算属性缓存(computed) vs 方法](https://www.cnblogs.com/Vanish-F/p/11730743.html)

