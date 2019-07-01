---
title: jquery源码学习笔记
date: 2019-07-01 23:57:39
---

> JQuery源码都包括哪些模块？

(function(){

  - （21~94行）定义了一些变量和函数，例如：jQuery = function() {...}
  - （96~283行）给jQuery对象，添加一些方法和属性
  - （285~347行）extend：jQuery的继承方法
  - （349~817行）jQuery.extend():扩展一些工具方法
  - （8826行）window.jQuery = window.$ = jQuery
  
})()

> 匿名函数自执行的好处：在里面写的任何代码都是局部的。这样就防止了和其他文件的代码冲突。
```
(function(){
  jQuery = function() {...}
  window.jQuery = window.$ = jQuery
})()
```
既然jquery把所有代码封装到一个匿名自执行函数里，那么外部怎么调用函数里面的方法和变量？

通过window把方法和变量暴露出去。例如：window.jQuery = window.$ = jQuery (jQuery是定义的一个函数)。就像上面的例子。