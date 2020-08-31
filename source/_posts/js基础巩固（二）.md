---
title: js基础巩固（二）
date: 2020-04-20 11:02:18
categories:
  - JavaScript
tags: 
---

> ## 闭包

变量作用域的常识：

<font color="pink" size="3"> 当函数执行完毕，本作用域内的局部变量会销毁。</font>

闭包概念：

<code><font color="pink">闭包</font>指有权访问另一个函数作用域中变量的<font color="pink">函数</font>。 简单理解就是，一个作用域可以访问另外一个函数内部的局部变量。</code>
```js
// 第一个例子：fn内部的变量被fn内部的函数访问
function fn () {
  var num = 10
  function fun () {
    // fun函数访问了fn函数的局部变量
    console.log(num)
  }
  fun()
}

fn()

// fn就是一个闭包函数

// 第二个例子：fn外部访问fn内部的变量
function fn () {
  var num = 8

  return function fun () {
    console.log(num)
  }
}

var f = fn()  // 用f接收返回来的函数，这样就实现了在fn外部访问到fn内部的变量
f()
```
闭包的作用：

<code>延伸了变量的作用范围</code>
