---
title: webpack打包效率优化
date: 2020-12-08 16:39:00
categories:
  - Vue
tags: 
---

> ## <font color="gold">1.webpack-bundle-analyzer 插件</font>

可视化分析包大小；

可以直观分析打包出的文件包含哪些，大小占比如何，模块包含关系，依赖项，文件是否重复。

> ## <font color="gold">2.mini-css-extract-plugin  插件</font>

剥离css，less文件

> ## <font color="gold">3.DllPlugin 和 DllReferencePlugin分离第三方类库</font>

DllPlugin是webpack内置的插件，不需要额外安装，直接配置webpack.dll.config.js文件

我们的代码都可以至少简单区分成业务代码和第三方库。如果不做处理，每次构建时都需要把所有的代码重新构建一次，耗费大量的时间。然而大部分情况下，很多第三方库的代码并不会发生变更（除非是版本升级），这时就可以用到dll：把复用性较高的第三方模块打包到动态链接库中，在不升级这些库的情况下，动态库不需要重新打包，每次构建只重新打包业务代码。

> ## <font color="gold">4.利用scope histing （变量提升） 减少代码闭包形成</font>

配置前：可以清晰的看到打包之后的代码分别生成了两个闭包函数（闭包函数的副作用占内存）

配置后：可以看到效果已经没有了针对两个两个js的闭包代码块

> ## <font color="gold">5.Tree shaking 删除没用的函数或者变量</font>

webpack4中已经默认实现了tree shaking

> ## <font color="gold">6.压缩图片文件大小 image-webpack-loader</font>



参考：

[https://www.cnblogs.com/moran1992/p/11233419.html](https://www.cnblogs.com/moran1992/p/11233419.html)

[https://www.cnblogs.com/moran1992/p/11233419.html](https://www.cnblogs.com/moran1992/p/11233419.html)


