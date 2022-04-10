---
title: Vue面试题03
date: 2020-04-29 23:32:39
categories:
  - 面试
tags: 
  - 面试
---


## <font color="gold">1.vue-router与location.href的区别</font>

+ vue-router使用history.pushState进行路由更新，静态跳转，无刷新页面；location.href会触发浏览器，刷新了页面

+ vue-router使用diff算法，实现按需加载，减少dom操作

其实使用router跳转和使用history.pushState()没什么差别的，因为vue-router就是用了history.pushState()，尤其是在history模式下。

