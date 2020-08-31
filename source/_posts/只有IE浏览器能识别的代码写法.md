---
title: 只有IE浏览器能识别的代码写法
date: 2019-06-19 12:32:39
categories:
  - 兼容性
tags: 
---

> 小于IE10版本的IE浏览器才会出现的代码

<code>&lt;!--[if lt IE 10 ]&gt;&lt;![endif]--&gt;</code>
```
<!--[if lt IE 10 ]>
  <div style="background-color:#fdf5e4;color:#fe5c02;text-align:center;font-size:12px;height:32px;line-height:32px;">您的浏览器版本过低，请使用chrome、火狐等性能较高的浏览器或者在360浏览器、QQ浏览器的极速模式下浏览
  </div> 
<![endif]-->
  ```
> IE9浏览器才会出现的代码
```
<!--[if IE 9 ]>代码内容<![endif]-->
```
> 大于IE9浏览器和非IE浏览器才会出现的代码
```
<!--[if (gt IE 9)|!(IE)]><!-->代码内容<!--<![endif]-->
```
