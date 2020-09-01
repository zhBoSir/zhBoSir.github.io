---
title: 笔记3：阅读（阮一峰）JavaScript 标准参考教程（alpha）
date: 2019-03-18 16:03:29
categories:
  - JavaScript
tags: 
---

**31.** 下面六个值会被转为false
- undefined
- null
- false
- 0
- NaN
- ""或''（空字符串）
例如：
```
if ('') {  // JavaScript 自动将空字符串，转为布尔值false
  console.log('true');
}
// 没有任何输出
```
空数组（[]）和空对象（{}）对应的布尔值，都是true。
```
if ([]) {
  console.log('true');
}
// true

if ({}) {
  console.log('true');
}
// true
```

**32.** JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。所以，1与1.0是相同的，是同一个数。
```
1 === 1.0   // true
```
由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心。
```
0.1 + 0.2 === 0.3
// false

0.3 / 0.1
// 2.9999999999999996

(0.3 - 0.2) === (0.2 - 0.1)
// false
```



JavaScript中，绝对值小于2的53次方的整数，即-2的53到2的53，都可以精确表示。由于2的53次方是一个16位的十进制数值，所以简单的法则就是，JavaScript 对15位的十进制数都可以精确处理。
```
Math.pow(2, 53)
// 9007199254740992

// 多出的三个有效数字，将无法保存
9007199254740992111
// 9007199254740992000
```
上面示例表明，大于2的53次方以后，多出来的有效数字（最后三位的111）都会无法保存，变成0。

**33.** NaN不是独立的数据类型，而是一个特殊数值，它的数据类型依然属于Number，使用typeof运算符可以看得很清楚。
```
typeof NaN // 'number'
```
NaN在布尔运算时被当作false。
```
Boolean(NaN) // false
```
NaN与任何数（包括它自己）的运算，得到的都是NaN。
```
NaN + 32  // NaN
NaN - 32  // NaN
NaN * 32  // NaN
NaN / 32  // NaN
```

**34.**
``` 
parseInt(1.23) // 1
// 等同于
parseInt('1.23') // 1
```
字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。
```
parseInt('8a') // 8
parseInt('12**') // 12
parseInt('12.34') // 12
parseInt('15e2') // 15
parseInt('15px') // 15
```
```
parseInt('abc') // NaN
parseInt('.3') // NaN
parseInt('') // NaN
parseInt('+') // NaN
parseInt('+1') // 1
```
parseInt的返回值只有两种可能，要么是一个十进制整数，要么是NaN。

**35.** parseFloat的转换结果不同于Number函数。
```
parseFloat(true)  // NaN
Number(true) // 1

parseFloat(null) // NaN
Number(null) // 0

parseFloat('') // NaN
Number('') // 0

parseFloat('123.45#') // 123.45
Number('123.45#') // NaN
```

**36.** 判断NaN更可靠的方法是，利用NaN为唯一不等于自身的值的这个特点，进行判断。
```
function myIsNaN(value) {
  return value !== value;
}
```

**37.** 如果长字符串必须分成多行，可以在每一行的尾部使用反斜杠。
```
var longString = 'Long \
long \
long \
string';

longString
// "Long long long string"
```
连接运算符（+）可以连接多个单行字符串，将长字符串拆成多行书写，输出的时候也是单行。
```
var longString = 'Long '
  + 'long '
  + 'long '
  + 'string';
```

**38.** 反斜杠（\）转义
```
\0 ：null
\n ：换行符
\r ：回车键
```
```
'\a'
// "a"
```
上面代码中，a是一个正常字符，前面加反斜杠没有特殊含义，反斜杠会被自动省略。

**39.** Base64 就是一种编码方法，可以将任意值转成 0～9、A～Z、a-z、+和/这64个字符组成的可打印字符。
JavaScript 原生提供两个 Base64 相关的方法。
btoa()：任意值转为 Base64 编码
atob()：Base64 编码转为原来的值
```
var string = 'Hello World!';
btoa(string) // "SGVsbG8gV29ybGQh"
atob('SGVsbG8gV29ybGQh') // "Hello World!"
```
注意，这两个方法不适合非 ASCII 码的字符，会报错。
```
btoa('你好') // 报错
```
要将非 ASCII 码字符转为 Base64 编码，必须中间插入一个转码环节，再使用这两个方法。
```
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
```

**40.** 对象的所有键名都是字符串，所以加不加引号都可以。如果键名是数值，会被自动转为字符串。

**41.** 如果两个变量指向同一个原始类型的值。那么，变量这时都是值的拷贝。
```
var x = 1;
var y = x;

x = 2;
y // 1
```
y和x并不是指向同一个内存地址。

**42.** 对象如果使用方括号运算符，键名必须放在引号里面，否则会被当作变量处理。例如：
```
var foo = 'bar';

var obj = {
  foo: 1,
  bar: 2
};

obj.foo  // 1
obj[foo]  // 2
```
数字键可以不加引号，因为会自动转成字符串。
```
var obj = {
  0.7: 'Hello World'
};

obj['0.7'] // "Hello World"
obj[0.7] // "Hello World"
```
注意，数值键名不能使用点运算符（因为会被当成小数点），只能使用方括号运算符。
```
var obj = {
  123: 'hello world'
};

obj.123 // 报错
obj[123] // "hello world"
```

**43.** 查看一个对象本身的所有属性，可以使用Object.keys方法。
```
var obj = {
  key1: 1,
  key2: 2
};

Object.keys(obj);
// ['key1', 'key2']
```

**44,** in运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值），如果包含就返回true，否则返回false。它的左边是一个字符串，表示属性名，右边是一个对象。
```
var obj = { p: 1 };
'p' in obj // true
'toString' in obj // true
```
in运算符的一个问题是，它不能识别哪些属性是对象自身的，哪些属性是继承的。就像上面代码中，对象obj本身并没有toString属性，但是in运算符会返回true，因为这个属性是继承的。

这时，可以使用对象的hasOwnProperty方法判断一下，是否为对象自身的属性。
```
var obj = {};
if ('toString' in obj) {
  console.log(obj.hasOwnProperty('toString')) // false
}
```

**45.** for...in循环用来遍历一个对象的全部属性。
```
var obj = {a: 1, b: 2, c: 3};

for (var i in obj) {
  console.log('键名：', i);
  console.log('键值：', obj[i]);
}
// 键名： a
// 键值： 1
// 键名： b
// 键值： 2
// 键名： c
// 键值： 3
```
for...in循环有两个使用注意点
- 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性。
- 它不仅遍历对象自身的属性，还遍历继承的属性。

如果继承的属性是可遍历的，那么就会被for...in循环遍历到。但是，一般情况下，都是只想遍历对象自身的属性，所以使用for...in的时候，应该结合使用hasOwnProperty方法，在循环内部判断一下，某个属性是否为对象自身的属性。
```
var person = { name: '老张' };

for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key);
  }
}
// name
```