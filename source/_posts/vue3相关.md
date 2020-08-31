---
title: vue3相关
date: 2020-05-04 20:59:02
categories:
  - Vue
tags:
  - Vue
---

+ <code>tree shaking</code> 只打包必要的依赖项。比如引入一个ui框架，但是只用了button，那么就只会把button以及button的依赖项打进去。

+ vdom提升性能，<code>核心思想：跳过静态节点，只处理动态节点。</code>

<!-- more -->

+ 支持TypeScript

+ 与vue2相比，之前的template里面必须有一个根元素，vue3中不需要了。

+ composition-api 逻辑复用 代替了mixin

