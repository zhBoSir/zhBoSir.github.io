---
title: 笔记4：阅读（阮一峰）JavaScript 标准参考教程（alpha）
date: 2019-03-18 16:06:39
---

**46.** 函数的toString方法返回一个字符串，内容是函数的源码。
```
function f() {
  a();
  b();
  c();
}

f.toString()
// function f() {
//  a();
//  b();
//  c();
// }
```

**47.** 函数内部定义的变量，会在该作用域内覆盖同名全局变量。
```
var v = 1;

function f(){
  var v = 2;
  console.log(v);
}

f() // 2
v // 1
```
上面代码中，变量v同时在函数的外部和内部有定义。结果，在函数内部定义，局部变量v覆盖了全局变量v。

<font color="purple">注意，对于var命令来说，局部变量只能在函数内部声明，在其他区块中声明，一律都是全局变量。</font>例如：
```
if (true) {
  var x = 5;
}
console.log(x);  // 5
```

**48.** 函数本身也是一个值，也有自己的作用域。它的作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关。
```
var a = 1;
var x = function () {
  console.log(a);
};

function f() {
  var a = 2;
  x();
}

f() // 1
```
上面代码中，函数x是在函数f的外部声明的，所以它的作用域绑定外层，内部变量a不会到函数f体内取值，所以输出1，而不是2。

<font color="purple">总之，函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。</font>

 同样的，函数体内部声明的函数，作用域绑定函数体内部。
```
function foo() {
  var x = 1;
  function bar() {
    console.log(x);
  }
  return bar;
}

var x = 2;
var f = foo();
f() // 1
```
上面代码中，函数foo内部声明了一个函数bar，bar的作用域绑定foo。当我们在foo外部取出bar执行时，变量x指向的是foo内部的x，而不是foo外部的x。