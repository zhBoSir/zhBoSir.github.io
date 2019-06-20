---
title: 笔记6：阅读（阮一峰）JavaScript 标准参考教程（alpha）
date: 2019-06-16 20:57:39
---

**76.**
Math.round方法用于四舍五入。注意，它对负数的处理（主要是对0.5的处理）。
```
Math.round(-1.1) // -1
Math.round(-1.5) // -1
Math.round(-1.6) // -2
```

**77.**
Math.pow方法返回以第一个参数为底数、第二个参数为幂的指数值。
```
// 等同于 2 ** 2
Math.pow(2, 2) // 4
// 等同于 2 ** 3
Math.pow(2, 3) // 8
```
下面是计算圆面积的方法。
```
var radius = 20;
var area = Math.PI * Math.pow(radius, 2);
```

**78.** 
Math.sqrt方法返回参数值的平方根。如果参数是一个负值，则返回NaN。
```
Math.sqrt(4) // 2
Math.sqrt(-4) // NaN
```

**79.**
Math.random()返回0到1之间的一个伪随机数，可能等于0，但是一定小于1。
任意范围的随机数生成函数如下。
```
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

getRandomArbitrary(1.5, 6.5)
// 2.4942810038223864
```
任意范围的随机整数生成函数如下。
```
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(1, 6) // 5
```

**80.** 
这些参数如果超出了正常范围，会被自动折算。比如，如果月设为15，就折算为下一年的4月。
```
new Date(2013, 15)
// Tue Apr 01 2014 00:00:00 GMT+0800 (CST)
new Date(2013, 0, 0)
// Mon Dec 31 2012 00:00:00 GMT+0800 (CST)
```
上面代码的第二个例子，日期设为0，就代表上个月的最后一天。

参数还可以使用负数，表示扣去的时间。
```
new Date(2013, -1)
// Sat Dec 01 2012 00:00:00 GMT+0800 (CST)
new Date(2013, 0, -1)
// Sun Dec 30 2012 00:00:00 GMT+0800 (CST)
```
上面代码中，分别对月和日使用了负数，表示从基准日扣去相应的时间。

**81.**
日期的运算
类型自动转换时，Date实例如果转为数值，则等于对应的毫秒数；如果转为字符串，则等于对应的日期字符串。所以，两个日期实例对象进行减法运算时，返回的是它们间隔的毫秒数；进行加法运算时，返回的是两个字符串连接而成的新字符串。
```
var d1 = new Date(2000, 2, 1);
var d2 = new Date(2000, 3, 1);

d2 - d1
// 2678400000
d2 + d1
// "Sat Apr 01 2000 00:00:00 GMT+0800 (CST)Wed Mar 01 2000 00:00:00 GMT+0800 (CST)"
```

**82.**
Date.now()
Date.now方法返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数。
```
Date.now() // 1364026285194
```

**83.**
valueOf方法返回实例对象距离时间零点（1970年1月1日00:00:00 UTC）对应的毫秒数，该方法等同于getTime方法。
```
var d = new Date();

d.valueOf() // 1362790014817
d.getTime() // 1362790014817
```
预期为数值的场合，Date实例会自动调用该方法，所以可以用下面的方法计算时间的间隔。
```
var start = new Date();
// ...
var end = new Date();
var elapsed = end - start;
```

**84.**
Date.prototype.toDateString()

toDateString方法返回日期字符串（不含小时、分和秒）。
```
var d = new Date(2013, 0, 1);
d.toDateString() // "Tue Jan 01 2013"
```
Date.prototype.toTimeString()

toTimeString方法返回时间字符串（不含年月日）。
```
var d = new Date(2013, 0, 1);
d.toTimeString() // "00:00:00 GMT+0800 (CST)"
```

**85.** 
计算本年度还剩下多少天。
```
function leftDays() {
  var today = new Date();
  var endYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
  var msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((endYear.getTime() - today.getTime()) / msPerDay);
}
```

**86.**
正则表达式消除字符串首尾两端的空格。
```
var str = '  #id div.class  ';

str.replace(/^\s+|\s+$/g, '')
// "#id div.class"
```