---
title: 笔记2：阅读（阮一峰）JavaScript 标准参考教程（alpha）
date: 2019-03-09 09:48:51
tags:
---

**16.** Object.keys方法返回数组的所有键名。
```
var arr = ['a', 'b', 'c'];

Object.keys(arr)
// ["0", "1", "2"]
```
数组成员的键名是固定的（默认总是0、1、2...），对象的键名一律为字符串，所以，数组的键名其实也是字符串。之所以可以用数值读取，是因为非字符串的键名会被转为字符串。

**17.** 对象有两种读取成员的方法：点结构（object.key）和方括号结构（object[key]）。但是，对于数值的键名，不能使用点结构。
```
var arr = [1, 2, 3];
arr.0 // SyntaxError
```
arr.0的写法不合法，因为单独的数值不能作为标识符（identifier）。所以，数组成员只能用方括号arr[0]表示（方括号是运算符，可以接受数值）。

**18.** 只要是数组，就一定有length属性。该属性是一个动态的值，等于键名中的最大整数加上1。
```
var arr = ['a', 'b'];
arr.length // 2

arr[2] = 'c';
arr.length // 3

arr[9] = 'd';
arr.length // 10

arr[1000] = 'e';
arr.length // 1001
```
上面代码表示，数组的数字键不需要连续，length属性的值总是比最大的那个整数键大1。另外，这也表明数组是一种动态的数据结构，可以随时增减数组的成员。
length属性是可写的。如果人为设置一个小于当前成员个数的值，该数组的成员会自动减少到length设置的值。
```
var arr = [ 'a', 'b', 'c' ];
arr.length // 3

arr.length = 2;
arr // ["a", "b"]
```
上面代码表示，当数组的length属性设为2（即最大的整数键只能是1）那么整数键2（值为c）就已经不在数组中了，被自动删除了。

清空数组的一个有效方法，就是将length属性设为0。
```
var arr = [ 'a', 'b', 'c' ];

arr.length = 0;
arr // []
```
如果人为设置length大于当前元素个数，则数组的成员数量会增加到这个值，新增的位置都是空位，读取新增的位置都会返回undefined。
```
var a = ['a'];

a.length = 3;
a[1] // undefined
```
由于数组本质上是一种对象，所以可以为数组添加属性，但是这不影响length属性的值。
```
var a = [];

a['p'] = 'abc';
a.length // 0

a[2.1] = 'abc';
a.length // 0
```
上面代码将数组的键分别设为字符串和小数，结果都不影响length属性。因为，length属性的值就是等于最大的数字键加1，而这个数组没有整数键，所以length属性保持为0。

**19.** 检查某个键名是否存在的运算符in，适用于对象，也适用于数组。
```
var arr = [ 'a', 'b', 'c' ];
2 in arr  // true
'2' in arr // true
4 in arr // false
```
上面代码表明，数组存在键名为2的键。由于键名都是字符串，所以数值2会自动转成字符串。

注意，如果数组的某个位置是空位，in运算符返回false。
```
var arr = [];
arr[100] = 'a';

100 in arr // true
1 in arr // false
```
上面代码中，数组arr只有一个成员arr[100]，其他位置的键名都会返回false。

**20.** for...in循环不仅可以遍历对象，也可以遍历数组，毕竟数组只是一种特殊对象。for...in遍历出来的是键名。
```
var a = [1, 2, 3];
for (var i in a) {
  console.log(a[i]);
}
// 1
// 2
// 3
```
数组的forEach方法，可以用来遍历数组。forEach遍历出来时键值。
```
var colors = ['red', 'green', 'blue'];
colors.forEach(function (color) {
  console.log(color);
});
// red
// green
// blue
```