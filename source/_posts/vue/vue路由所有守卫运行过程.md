---
title: vue路由所有守卫运行过程
date: 2020-11-15 21:31:00
categories:
  - Vue
tags:
  -  
---

1.导航被触发

2.在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave

3.调用全局的前置守卫 beforeEach

4.在重用的组件里调用 beforeRouteUpdate

5.调用路由独享的守卫 beforeEnter

6.解析异步路由组件

7.在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter

8.调用全局的解析守卫 beforeResolve

9.导航被确认

10.调用全局的后置守卫 afterEach

11.触发dom更新

12.用创建好的实例调用beforeRouterEnter守卫传给next的回调函数
