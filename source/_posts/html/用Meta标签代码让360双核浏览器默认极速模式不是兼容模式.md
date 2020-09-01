---
title: 用Meta标签代码让360双核浏览器默认极速模式不是兼容模式
date: 2019-06-11 18:23:39
categories:
  - Css
tags:
  - Css
---

双核浏览器的浏览模式

极速模式、兼容模式及IE9高速模式是双核浏览器显示网页时使用的三种模式：

- 表示极速模式

- 表示兼容模式

- 表示IE9/IE10模式（仅在安装了IE9或IE10后可用）

360极速浏览器会自动为您选择使用适合每个网站的浏览模式。所以，通常您不用了解几种内核的区别。

代码示例

在head标签中添加一行代码：
 
```
<html>  
  <head>  
    <meta name="renderer" content="webkit|ie-comp|ie-stand" />  
  </head>  
  <body></body>  
</html>
```
content的取值为webkit,ie-comp,ie-stand之一，区分大小写，分别代表用webkit内核，IE兼容内核，IE标准内核。

若页面需默认用极速核，增加标签：
```
<meta name="renderer" content="webkit" /> 
```
若页面需默认用ie兼容内核，增加标签：
```
<meta name="renderer" content="ie-comp" /> 
```
若页面需默认用ie标准内核，增加标签：
```
<meta name="renderer" content="ie-stand" />
```
这里发现一个问题，官方给的信息里结尾是“>”，实际测试时不起作用，这时只要把结尾改为“ />”（注意 / 前面有空格），测试是可行的。 

<code>实测后是没有达到自己想要的效果，设置了meta标签也不能让双核浏览器用极速模式打开。</code>

<code>又查了一些文档，说是要把需要以极速模式打开的url让360浏览器官方设置到极速模式的名单里面，见下面参考文章二</code>


参考文章：

[用Meta标签代码让360双核浏览器默认极速模式不是兼容模式](https://www.jb51.net/web/259920.html)

[网站设置meta标签仍然无法默认极速模式](https://bbs.360.cn/forum.php?mod=viewthread&tid=15451810&highlight=meta)