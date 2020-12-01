---
title: 虚拟dom
date: 2020-11-27 17:00:00
categories:
  - JavaScript
tags: 
---

> ## 虚拟DOM是什么？

一个能代表DOM树的对象，通常含有<code>标签名</code>、<code>标签上的属性</code>、<code>事件监听和子元素们</code>，以及其他属性。

> ## 虚拟DOM为什么比真实DOM快（虚拟DOM的优点）？

+ 虚拟DOM可以将多次操作合并为一次操作；

+ 虚拟DOM借助DOM diff可以把多余的操作省掉；

> <code>## 虚拟DOM本质上只是一个js对象。<code>

> ## 什么是DOM diff？

DOM diff就是一个函数，我们称之为patch。 

patches = patch(oldVNode, newVNode)

{% asset_img 1.png 图1 %}



