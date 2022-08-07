---
title: webpack零碎知识点
date: 2022-4-14 22:58:00
categories:
  - webpack
tags: 
  - webpack
---

> ## <font color="gold">1.webpack配置多入口多出口</font>

参考：

[如何使用webpack搭建一个多入口多出口的前端工程](https://www.jianshu.com/p/bf38cae9837f)

[webpack之多页面应用打包](https://blog.csdn.net/ccxCode/article/details/118865851)

> ## <font color="gold">2.webpack 中 loader 和 plugin 的区别</font>

+ loader，它是一个转换器，将A文件进行编译成B文件，webpack自身只支持js和json这两种格式的文件，对于其他文件需要通过loader将其转换为commonJS规范的文件后，webpack才能解析到。让webpack能够处理非js文件。

+ plugin是一个扩展器，它丰富了webpack本身，是用于在webpack打包编译过程里，在对应的事件节点里执行自定义操作，比如资源管理、bundle文件优化、打包优化和压缩等操作。

参考：

[webpack 中 loader 和 plugin 的区别是什么](https://blog.csdn.net/weixin_45087659/article/details/106840160)





