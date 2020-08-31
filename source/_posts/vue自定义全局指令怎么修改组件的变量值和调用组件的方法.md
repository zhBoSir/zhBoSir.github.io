---
title: vue自定义全局指令怎么修改组件的变量值和调用组件的方法
date: 2019-06-27 16:19:00
categories:
  - Vue
tags:
  - Vue
---
>vue中在main.js文件中自定义全局指令，那么这个全局指令怎么修改组件的变量和怎么调用组件的方法？

```
// main.js

// 自定义组件v-clickother
Vue.directive('clickother', function (el, binding, vnode) {
  document.addEventListener('click', function (e) {
    if (!el.contains(e.target)) {
      // 通过全局指令的第三个参数vnode（Vue编译生成的虚拟节点），// vnode.context拿到组件的所有内容
      vnode.context.clickOtherHide()
    }
  })
})
```

```
// bankList组件

<script>
  export default {
    data () {
      return {
        isShow: false
      }
    },
    methods: {
      clickOtherHide () {
        this.isShow = flase
      }
    }
  }
</script>
```

- el：指令所绑定的元素，可以用来直接操作 DOM 。
- 通过全局指令的第三个参数vnode（Vue编译生成的虚拟节点）， <code>vnode.context</code>拿到组件的所有内容,可以console.log(vnode.context)在控制台看详细信息。


参考：

[vue2.0 自定义指令的时候没有传入指令的this对象？](https://segmentfault.com/q/1010000009138385?_ea=1834789)

[vue自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)
