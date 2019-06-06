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

**49.** 以下六个值取反后为true，其他值都为false。
<code>undefined</code>
<code>null</code>
<code>false</code>
<code>0</code>
<code>NaN</code>
<code>空字符串（''）</code>
```
!undefined // true
!null // true
!0 // true
!NaN // true
!"" // true

!54 // false
!'hello' // false
![] // false
!{} // false
```

**50.** 且运算符,它的运算规则是：如果第一个运算子的布尔值为true，则返回第二个运算子的值（注意是值，不是布尔值）；如果第一个运算子的布尔值为false，则直接返回第一个运算子的值，且不再对第二个运算子求值。
```
't' && '' // ""
't' && 'f' // "f"
't' && (1 + 2) // 3
'' && 'f' // ""
'' && '' // ""

var x = 1;
(1 - 1) && ( x += 1) // 0
x // 1
```
且运算符可以多个连用，这时返回第一个布尔值为false的表达式的值。如果所有表达式的布尔值都为true，则返回最后一个表达式的值。
```
true && 'foo' && '' && 4 && 'foo' && true
// ''

1 && 2 && 3
// 3
```
或运算符可以多个连用，这时返回第一个布尔值为true的表达式的值。如果所有表达式都为false，则返回最后一个表达式的值。
```
false || 0 || '' || 4 || 'foo' || true
// 4

false || 0 || ''
// ''
```
或运算符的一个例子：
```
var x = 1;
true || (x = 2) // true
x // 1
```

**51.** 三元条件表达式与if...else语句具有同样表达效果，前者可以表达的，后者也能表达。但是两者具有一个重大差别，if...else是语句，没有返回值；三元条件表达式是表达式，具有返回值。

**52.** 减法运算符预期左右两侧的运算子应该是数值，如果不是，就会自动将它们转为数值。
```
'4' - '3' // 1
```

**53.** if语句的条件部分，除了以下五个值，其他都是自动转为true
- undefined
- null
- +0或-0
- NaN
- ''（空字符串）

**54.** 字符串的自动转换，主要发生在字符串的加法运算时。当一个值为字符串，另一个值为非字符串，则后者转为字符串。
```
'5' + 1 // '51'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function (){} // "5function (){}"
'5' + undefined // "5undefined"
'5' + null // "5null"
```

**55.** Error 实例对象
```
var err = new Error('出错了');
err.message // "出错了"
```
Error实例对象必须有message属性，表示出错时的提示信息

**56.** JavaScript 最大的语法缺点，可能就是全局变量对于任何一个代码块，都是可读可写。这对代码的模块化和重复使用，非常不利。

因此，建议避免使用<code>全局变量</code>。如果不得不使用，<code>可以考虑用大写字母表示</code>变量名，这样更容易看出这是全局变量，比如UPPER_CASE。

**57.**debugger语句

debugger语句主要用于除错，作用是设置断点。
Chrome 浏览器中，当代码运行到debugger语句时，就会暂停运行，自动打开脚本源码界面。

**58.**
- 实例方法就是定义在Object原型对象Object.prototype上的方法
- 凡是定义在Object.prototype对象上面的属性和方法，将被所有实例对象共享
- instanceof运算符用来验证，一个对象是否为指定的构造函数的实例。

**59.**
Object.keys方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名。
```
var obj = {
  p1: 123,
  p2: 456
}

Object.keys(obj) // ["p1", "p2"]
```
Object.getOwnPropertyNames方法与Object.keys类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。
```
var obj = {
  p1: 123,
  p2: 456
};
```
Object.getOwnPropertyNames(obj) // ["p1", "p2"]
对于一般的对象来说，Object.keys()和Object.getOwnPropertyNames()返回的结果是一样的。只有涉及不可枚举属性时，才会有不一样的结果。Object.keys方法只返回可枚举的属性，Object.getOwnPropertyNames方法还返回不可枚举的属性名。
```
var a = ['Hello', 'World'];

Object.keys(a) // ["0", "1"]
Object.getOwnPropertyNames(a) // ["0", "1", "length"]
```
上面代码中，数组的length属性是不可枚举的属性，所以只出现在Object.getOwnPropertyNames方法的返回结果中。

由于 JavaScript 没有提供计算对象属性个数的方法，所以可以用这两个方法代替。
```
var obj = {
  p1: 123,
  p2: 456
};

Object.keys(obj).length // 2
Object.getOwnPropertyNames(obj).length // 2
```

**60.**写出一个比typeof运算符更准确的类型判断函数。
```
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

type({}); // "object"
type([]); // "array"
type(5); // "number"
type(null); // "null"
type(); // "undefined"
type(/abcd/); // "regex"
type(new Date()); // "date"
```