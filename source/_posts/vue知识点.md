---
title: vue知识点
date: 2020-03-22 21:51:18
---

> ## style绑定样式对象

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

> ## computed计算属性具有缓存特性

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


参考：

[Vue计算属性缓存(computed) vs 方法](https://www.cnblogs.com/Vanish-F/p/11730743.html)

