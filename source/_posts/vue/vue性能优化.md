---
title: vue性能优化
date: 2020-12-05 22:59:02
categories:
  - 面试
tags:
  - 面试
---

+ 设置key值，更快定位数据与diff。

+ 模块化、组件化

  + 封装具有高度复用性的模块。

  + 组件可配置性强。

+ 路由懒加载

  + 首屏加快渲染

+ productionSourceMap是用来生成map文件、定位源码的，要把它设置成false

  + 生产环境关闭源码映射，一方面能减少代码包的大小，另一方面也有利于系统代码安全。

+ productionGzip设置为true，启用gzip压缩功能，打包体积更小。

+ keep-alive 缓存组件

+ 插件CDN

  像vue-router、axios等插件可以使用CDN静态引入到HTML中

+ 使用图片CDN，把图片放到远程CDN

+ 图片懒加载

+ 使用CSS图标， 像iconfont之类的

+ 组件库的组件按需导入

+ 定时器的销毁

