---
title: call与apply与bind
date: 2020-03-15 15:57:00
categories:
  - JavaScript
tags: 
---

> ### 1.call、apply、 bind使用总结：

<font color="gold">相同点：</font>

都可以改变函数内部的this指向。

<font color="gold">区别点：</font>

+ <code>call、apply会调用函数</code>，并且改变函数内部的this指向；

```js
// 调用了函数
fn.call()
fn.apply() 
```

+ call与apply传递的参数不一样，call传递参数是arg1,arg2,....形式，<code>apply传递参数是数组[args]形式</code>；

+ <code>bind不会调用函数</code>，可以改变函数内部的this指向，<code>返回的是原函数改变this后产生的新函数</code>。

```js
let obj = {
	name: "zhangsan",
	age: 18
}

function fn (a, b) {
	console.log(a + b)
}

let f = fn.bind(obj,1,2) // bind改变函数内部的this指向，返回的是原函数改变this后产生的新函数 这里函数没有调用，要调用的话使用下面的语句
f()
```

<font color="gold">主要应用场景：</font>

+ <code>call经常做继承</code>；

+ bind不调用函数，但是还想改变函数内部this指向，比如改变定时器内容的this指向；

```js
let btn = document.querySelector('#btn')
btn.onclick = function () {
	this.disabled = true  // 这个this指向的是btn按钮
	
	setTimeOut(function () {
		this.disabled = false   // 定时器没有bind的话，函数体里的this指向window，bind后this指向了btn
	}.bind(this), 3000)  // 这个this指向的是btn按钮对象
}
```

+ apply经常跟数组有关系，比如借助数学对象（Math）实现数组中最大值与最小值。

```js
Math.max.apply(Math, [1,2,3])
// 输出3

// Math.max() 函数返回一组数中的最大值。
console.log(Math.max(-1, -3, -2));
// expected output: -1

const array1 = [1, 3, 2];
console.log(Math.max(...array1));
// expected output: 3

// Math.max()传递的参数不是数组，是数组展开后的一组数。

// 使用 apply 方法寻找一个数值数组中的最大元素。getMaxOfArray([1,2,3]) 等价于 Math.max(1, 2, 3)

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

// 或者通过使用最新的扩展语句，获得数组中的最大值。

var arr = [1, 2, 3];
var max = Math.max(...arr);
```