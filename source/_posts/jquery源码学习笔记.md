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
  - （877~2856）Sizzle:复杂选择器的实现
  - （2880~3042）Callbacks:回调对象：对函数的统一管理
  - （3043~3183）Deferred:延迟对象：对异步的统一管理
  - （3184~3295）support：功能检测
  - （3308~3652）data(): 数据缓存
  - （3653~3797）queue(): 队列管理
  - （3803~4299）attr() pop() val() addClass()等：对元素属性的操作
  - （4300~5128）on() trigger():事件操作的相关方法
  - （5140~6057）DOM操作：添加 删除 获取 包装 DOM筛选
  - (6058~6620) css():样式的操作
  - (6621~7854)提交的数据和ajax():ajax() load() getJson()
  - (7855~8584)animate():动画运动的方法
  - (8585~8792) offset():位置和尺寸的方法
  - (8804~8821)JQ支持模块化的模式
  - （8826行）window.jQuery = window.$ = jQuery
  
})()

> 匿名函数自执行的好处：在里面写的任何代码都是局部的。这样就防止了和其他文件的代码冲突。
```
(function(window, undefined){
  jQuery = function() {...}
  window.jQuery = window.$ = jQuery
})(window)
```
既然jquery把所有代码封装到一个匿名自执行函数里，那么外部怎么调用函数里面的方法和变量？

通过window把方法和变量暴露出去。例如：window.jQuery = window.$ = jQuery (jQuery是定义的一个函数)。就像上面的例子。

- 为什么自执行函数要传递window？
  因为找一个变量或方法都是从最近的一层一层往上找，window位于最顶层，如果不传window的话，往上找就慢些，传了就性能快些。
- 为什么要传undefined参数？
  因为在一些IE低版本（IE7、IE8）【var undefined = 10】undefined可以被修改，jQuery为了防止undefined被修改，所以把undefined传进去做了处理不让其修改。