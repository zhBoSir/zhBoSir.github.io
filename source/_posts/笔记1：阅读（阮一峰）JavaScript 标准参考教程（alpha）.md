---
title: 笔记1：阅读（阮一峰）JavaScript 标准参考教程（alpha）
date: 2019-03-07 09:48:51
categories:
  - JavaScript
tags:
---

**1.**  JavaScript 是一种轻量级的脚本语言。所谓“脚本语言”（script language），指的是它不具备开发操作系统的能力，而是只用来编写控制其他大型应用程序（比如浏览器）的“脚本”。
**2.**  JavaScript 的宿主环境有多种，最常见的环境就是浏览器，另外还有服务器环境，也就是 Node 项目。
**3.**  浏览器F12的console控制台输入代码换行，用<code>Shift + Enter</code>键
**4. ** 语句以分号结尾，一个分号就表示一个语句结束。分号前面可以没有任何内容，JavaScript 引擎将其视为空语句。
```
;;;
```
上面的代码就表示3个空语句。
**5.**  表达式不需要分号结尾。一旦在表达式后面添加分号，则 JavaScript 引擎就将表达式视为语句，这样会产生一些没有任何意义的语句。
```
1 + 3;
'abc';
```
**6.**  JavaScript 的变量名区分大小写，A和a是两个不同的变量。
**7.**  <font color="#BF2073">**变量提升**</font>
JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。
```
console.log(a);
var a = 1;
```
上面代码首先使用console.log方法，在控制台（console）显示变量a的值。这时变量a还没有声明和赋值，所以这是一种错误的做法，但是实际上不会报错。因为存在变量提升，真正运行的是下面的代码。
```
var a;
console.log(a);
a = 1;
```
最后的结果是显示undefined，表示变量a已声明，但还未赋值。
**8.**  标识符指的是用来识别各种值的合法名称。标识符命名规则如下：
第一个字符，可以是任意 Unicode 字母（包括英文字母和其他语言的字母），以及美元符号（$）和下划线（_）。
第二个字符及后面的字符，除了 Unicode 字母、美元符号和下划线，还可以用数字0-9。
下面这些都是合法的标识符
```
arg0
_tmp
$elem
π
```
下面这些则是不合法的标识符
```
1a  // 第一个字符不能是数字
23  // 同上
***  // 标识符不能包含星号
a+b  // 标识符不能包含加号
-d  // 标识符不能包含减号或连词线
```
中文是合法的标识符，可以用作变量名
```
var 临时变量 = 1;
```
**9.**  JavaScript 使用大括号，将多个相关的语句组合在一起，称为“区块”（block）。
对于var命令来说，JavaScript 的区块不构成单独的作用域（scope）。
```
{
  var a = 1;
}
a // 1
```
上面代码在区块内部，使用var命令声明并赋值了变量a，然后在区块外部，变量a依然有效，区块对于var命令不构成单独的作用域，与不使用区块的情况没有任何区别。在 JavaScript 语言中，单独使用区块并不常见，区块往往用来构成其他更复杂的语法结构，比如 <font color="purple">for、if、while、function</font> 等。
**10.** switch...case...语句，每个case代码块内部的break语句不能少，否则会接下去执行下一个case代码块，而不是跳出switch结构。例：
```
var x = 1;
switch (x) {
  case 1:
    console.log('x 等于1');
  case 2:
    console.log('x 等于2');
  default:
    console.log('x 等于其他值');
}
// x等于1
// x等于2
// x等于其他值
```
正确的写法：
```
var x = 1;
switch (x) {
  case 1:
    console.log('x 等于1');
    break;
  case 2:
    console.log('x 等于2');
    break;
  default:
    console.log('x 等于其他值');
}
```
需要注意的是，switch语句后面的表达式，与case语句后面的表示式比较运行结果时，采用的是严格相等运算符（= = =），而不是相等运算符（==），这意味着比较时不会发生类型转换。
```
var x = 1;
switch (x) {
  case true:
    console.log('x 发生类型转换');
    break;
  default:
    console.log('x 没有发生类型转换');
}
// x 没有发生类型转换
```
上面代码中，由于变量x没有发生类型转换，所以不会执行case true的情况。
**11.** for语句的三个部分（初始化表达式、条件表达式、递增表达式），可以省略任何一个，也可以全部省略。
```
for ( ; ; ){
  console.log('Hello World');
}
```
上面代码省略了for语句表达式的三个部分，结果就导致了一个无限循环。
**12.** break语句用于跳出代码块或循环。
continue语句用于立即终止本轮循环，返回循环结构的头部，开始下一轮循环。
```
var i = 0;
while (i < 100){
  i++;
  if (i % 2 === 0) continue;
  console.log('i 当前为：' + i);
}
```
上面代码只有在i为奇数时，才会输出i的值。如果i为偶数，则直接进入下一轮循环。
<font color="blue">如果存在多重循环，不带参数的break语句和continue语句都只针对最内层循环。</font>
**13.** JavaScript 的数据类型，共有六种<code>【数值（number）、字符串（string）、布尔值（boolean）、undefined、null、对象（object）】</code>（ES6 又新增了第七种 Symbol 类型的值。）
对象是复杂的数据类型，又可以分成三个子类型<code>【狭义的对象（object）、数组（array）、函数（function）】</code>。
**14.**  JavaScript 有三种方法，可以确定一个值到底是什么类型。
- typeof运算符
- instanceof运算符
- Object.prototype.toString方法

几种特殊的情况：
```
typeof undefined
// "undefined"
typeof null
// "object"
typeof window 
// "object"
typeof {} 
// "object"
typeof [] 
// "object"
```
**15.** 数组本质上只是一种特殊的对象。这里顺便提一下，instanceof运算符可以区分数组和对象。
```
var o = {};
var a = [];

o instanceof Array // false
a instanceof Array // true
```


