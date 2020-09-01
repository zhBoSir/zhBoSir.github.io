---
title: 笔记5：阅读（阮一峰）JavaScript 标准参考教程（alpha）
date: 2019-06-06 12:06:39
categories:
  - JavaScript
tags: 
---

**61.** 对象的拷贝
有时，我们需要将一个对象的所有属性，拷贝到另一个对象，可以用下面的方法实现。
```
var extend = function (to, from) {
  for (var property in from) {
    to[property] = from[property];
  }

  return to;
}

extend({}, {
  a: 1
})
// {a: 1}
```
上面这个方法的问题在于，如果遇到存取器定义的属性，会只拷贝值。
```
extend({}, {
  get a() { return 1 }
})
// {a: 1}
```
为了解决这个问题，我们可以通过Object.defineProperty方法来拷贝属性。
```
var extend = function (to, from) {
  for (var property in from) {
    if (!from.hasOwnProperty(property)) continue;
    Object.defineProperty(
      to,
      property,
      Object.getOwnPropertyDescriptor(from, property)
    );
  }

  return to;
}

extend({}, { get a(){ return 1 } })
// { get a(){ return 1 } })
```
上面代码中，hasOwnProperty那一行用来过滤掉继承的属性，否则可能会报错，因为Object.getOwnPropertyDescriptor读不到继承属性的属性描述对象。

**62.**Array构造函数有一个很大的缺陷，就是不同的参数，会导致它的行为不一致。
```
// 单个正整数参数，表示返回的新数组的长度
new Array(1) // [ empty ]
new Array(2) // [ empty x 2 ]

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
new Array('abc') // ['abc']
new Array([1]) // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2) // [1, 2]
new Array('a', 'b', 'c') // ['a', 'b', 'c']
```

**63.** Array.isArray()
```
var arr = [1, 2, 3];

typeof arr // "object"
Array.isArray(arr) // true
```
上面代码中，typeof运算符只能显示数组的类型是Object，而Array.isArray方法可以识别数组。

**64.** toString方法也是对象的通用方法，数组的toString方法返回数组的字符串形式。
```
var arr = [1, 2, 3];
arr.toString() // "1,2,3"

var arr = [1, 2, 3, [4, 5, 6]];
arr.toString() // "1,2,3,4,5,6"
```

**64.** 
```
var obj = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.join.call(obj, '-')
// 'a-b'
```

**65.**
所谓“包装对象”，指的是与数值、字符串、布尔值分别相对应的Number、String、Boolean三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象。
```
var v1 = new Number(123);
var v2 = new String('abc');
var v3 = new Boolean(true);

typeof v1 // "object"
typeof v2 // "object"
typeof v3 // "object"

v1 === 123 // false
v2 === 'abc' // false
v3 === true // false
```
上面代码中，基于原始类型的值，生成了三个对应的包装对象。可以看到，v1、v2、v3都是对象，且与对应的简单类型值不相等。
```
// 字符串转为数值
Number('123') // 123

// 数值转为字符串
String(123) // "123"

// 数值转为布尔值
Boolean(123) // true
```
总结一下，这三个对象作为构造函数使用（带有new）时，可以将原始类型的值转为对象；作为普通函数使用时（不带有new），可以将任意类型的值，转为原始类型的值。

**66.**
valueOf()方法返回包装对象实例对应的原始类型的值。
```
new Number(123).valueOf()  // 123
new String('abc').valueOf() // "abc"
new Boolean(true).valueOf() // true
```

**67.** 
注意，false对应的包装对象实例，布尔运算结果也是true。
```
if (new Boolean(false)) {
  console.log('true');
} // true

if (new Boolean(false).valueOf()) {
  console.log('true');
} // 无输出
```
上面代码的第一个例子之所以得到true，是因为false对应的包装对象实例是一个对象，进行逻辑运算时，被自动转化成布尔值true（因为所有对象对应的布尔值都是true）。而实例的valueOf方法，则返回实例对应的原始值，本例为false。

**68.** 
对于一些特殊值，Boolean对象前面加不加new，会得到完全相反的结果，必须小心。
```
if (Boolean(false)) {
  console.log('true');
} // 无输出

if (new Boolean(false)) {
  console.log('true');
} // true

if (Boolean(null)) {
  console.log('true');
} // 无输出

if (new Boolean(null)) {
  console.log('true');
} // true
```
**69.** 
```
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean('') // false
Boolean(NaN) // false

Boolean(1) // true
Boolean('false') // true
Boolean([]) // true
Boolean({}) // true
Boolean(function () {}) // true
Boolean(/foo/) // true
```
上面代码中几种得到true的情况，都值得认真记住。

**70.**
Number对象部署了自己的toString方法，用来将一个数值转为字符串形式。
```
(10).toString() // "10"
```
toString方法可以接受一个参数，表示输出的进制。如果省略这个参数，默认将数值先转为十进制，再输出字符串；否则，就根据参数指定的进制，将一个数字转化成某个进制的字符串。
```
(10).toString(2) // "1010"
(10).toString(8) // "12"
(10).toString(16) // "a"
```
上面代码中，10一定要放在括号里，这样表明后面的点表示调用对象属性。如果不加括号，这个点会被 JavaScript 引擎解释成小数点，从而报错。

**71.**
通过方括号运算符也可以调用toString方法。
```
10['toString'](2) // "1010"
```

**72.**
toFixed()方法先将一个数转为指定位数的小数，然后返回这个小数对应的字符串。
```
(10).toFixed(2) // "10.00"
10.005.toFixed(2) // "10.01"
```
由于浮点数的原因，小数5的四舍五入是不确定的，使用的时候必须小心。
```
(10.055).toFixed(2) // 10.05
(10.005).toFixed(2) // 10.01
```

**73.** 
replace方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）。
```
'aaa'.replace('a', 'b') // "baa"
```

**74.**
如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符。
```
'a|b|c'.split('') // ["a", "|", "b", "|", "c"]
```
如果省略参数，则返回数组的唯一成员就是原字符串。
```
'a|b|c'.split() // ["a|b|c"]
```
如果满足分割规则的两个部分紧邻着（即两个分割符中间没有其他字符），则返回数组之中会有一个空字符串。
```
'a||c'.split('|') // ['a', '', 'c']
```
如果满足分割规则的部分处于字符串的开头或结尾（即它的前面或后面没有其他字符），则返回数组的第一个或最后一个成员是一个空字符串。
```
'|b|c'.split('|') // ["", "b", "c"]
'a|b|'.split('|') // ["a", "b", ""]
```

**75.** 
实现一个总是返回数值的整数部分的函数。
```
function ToInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

ToInteger(3.2) // 3
ToInteger(3.5) // 3
ToInteger(3.8) // 3
ToInteger(-3.2) // -3
ToInteger(-3.5) // -3
ToInteger(-3.8) // -3
```

**额外补充1** 
> 数组的some()

some方法是只要一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false。
```
var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
  return elem >= 3;
});
// true
```
> 数组的every()

every方法是所有成员的返回值都是true，整个every方法才返回true，否则返回false。
```
var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) {
  return elem >= 3;
});
// false
```

**额外补充2**数组的reduce()，reduceRight()

reduce方法和reduceRight方法依次处理数组的每个成员，最终累计为一个值。它们的差别是，reduce是从左到右处理（从第一个成员到最后一个成员），reduceRight则是从右到左（从最后一个成员到第一个成员），其他完全一样。
```
[1, 2, 3, 4, 5].reduce(function (a, b) {
  console.log(a, b);
  return a + b;
})
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15
```

reduce方法和reduceRight方法的第一个参数都是一个函数。该函数接受以下四个参数。

累积变量，默认为数组的第一个成员

当前变量，默认为数组的第二个成员

当前位置（从0开始）

原数组

这四个参数之中，只有前两个是必须的，后两个则是可选的。

如果要对累积变量指定初值，可以把它放在reduce方法和reduceRight方法的第二个参数。
```
[1, 2, 3, 4, 5].reduce(function (a, b) {
  return a + b;
}, 10);
// 25
```
上面代码指定参数a的初值为10，所以数组从10开始累加，最终结果为25。注意，这时b是从数组的第一个成员开始遍。

**额外补充3** 
```
[NaN].indexOf(NaN) // -1
[NaN].lastIndexOf(NaN) // -1
```
NaN是唯一一个不等于自身的值。
