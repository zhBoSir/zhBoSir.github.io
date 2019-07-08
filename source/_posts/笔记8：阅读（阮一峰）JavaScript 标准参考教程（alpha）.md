---
title: 笔记8：阅读（阮一峰）JavaScript 标准参考教程（alpha）
date: 2019-06-24 10:51:30
---

**106.**

- <code>\d</code> 匹配0-9之间的任一数字，相当于[0-9]。
- <code>\D</code> 匹配所有0-9以外的字符，相当于[^0-9]。
- <code>\w</code> 匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]。
- <code>\W</code> 除所有字母、数字和下划线以外的字符，相当于[^A-Za-z0-9_]。
- <code>\s</code> 匹配空格（包括换行符、制表符、空格符等），相等于[ \t\r\n\v\f]。
- <code>\S</code> 匹配非空格的字符，相当于[^ \t\r\n\v\f]。
- <code>\b</code> 匹配词的边界。
- <code>\B</code> 匹配非词边界，即在词的内部。

下面是一些例子。
```
// \s 的例子
/\s\w*/.exec('hello world') // [" world"]

// \b 的例子
/\bworld/.test('hello world') // true
/\bworld/.test('hello-world') // true
/\bworld/.test('helloworld') // false

// \B 的例子
/\Bworld/.test('hello-world') // false
/\Bworld/.test('helloworld') // true
```
上面代码中，\s表示空格，所以匹配结果会包括空格。\b表示词的边界，所以world的词首必须独立（词尾是否独立未指定），才会匹配。同理，\B表示非词的边界，只有world的词首不独立，才会匹配。

通常，正则表达式遇到换行符（\n）就会停止匹配。
```
var html = "<b>Hello</b>\n<i>world!</i>";

/.*/.exec(html)[0]
// "<b>Hello</b>"
```
上面代码中，字符串html包含一个换行符，结果点字符（.）不匹配换行符，导致匹配结果可能不符合原意。这时使用\s字符类，就能包括换行符。
```
var html = "<b>Hello</b>\n<i>world!</i>";

/[\S\s]*/.exec(html)[0]
// "<b>Hello</b>\n<i>world!</i>"
```
上面代码中，[\S\s]指代一切字符。

**107.**量词符

量词符用来设定某个模式出现的次数。

- <code>?</code> 问号表示某个模式出现0次或1次，等同于{0, 1}。
- <code>*</code> 星号表示某个模式出现0次或多次，等同于{0,}。
- <code>+</code> 加号表示某个模式出现1次或多次，等同于{1,}。
```
// t 出现0次或1次
/t?est/.test('test') // true
/t?est/.test('est') // true

// t 出现1次或多次
/t+est/.test('test') // true
/t+est/.test('ttest') // true
/t+est/.test('est') // false

// t 出现0次或多次
/t*est/.test('test') // true
/t*est/.test('ttest') // true
/t*est/.test('tttest') // true
/t*est/.test('est') // true
```

**108.** 
默认情况下都是最大可能匹配，即匹配直到下一个字符不满足匹配规则为止。这被称为贪婪模式。
```
var s = 'aaa';
s.match(/a+/) // ["aaa"]
```
上面代码中，模式是/a+/，表示匹配1个a或多个a，那么到底会匹配几个a呢？因为默认是贪婪模式，会一直匹配到字符a不出现为止，所以匹配结果是3个a。

如果想将贪婪模式改为非贪婪模式，可以在量词符后面加一个问号。
```
var s = 'aaa';
s.match(/a+?/) // ["a"]
```
上面代码中，模式结尾添加了一个问号/a+?/，这时就改为非贪婪模式，一旦条件满足，就不再往下匹配。

除了非贪婪模式的加号，还有非贪婪模式的星号（*）和非贪婪模式的问号（?）。

<code>+?</code>：表示某个模式出现1次或多次，匹配时采用非贪婪模式。
<code>*?</code>：表示某个模式出现0次或多次，匹配时采用非贪婪模式。
<code>??</code>：表格某个模式出现0次或1次，匹配时采用非贪婪模式。
```
'abb'.match(/ab*b/) // ["abb"]
'abb'.match(/ab*?b/) // ["ab"]

'abb'.match(/ab?b/) // ["abb"]
'abb'.match(/ab??b/) // ["ab"]
```

**109.**
```
var regex = /b/;
var str = 'abba';

regex.test(str); // true
regex.test(str); // true
regex.test(str); // true
```
上面代码中，正则模式不含g修饰符，每次都是从字符串头部开始匹配。所以，连续做了三次匹配，都返回true。
```
var regex = /b/g;
var str = 'abba';

regex.test(str); // true
regex.test(str); // true
regex.test(str); // false
```
上面代码中，正则模式含有g修饰符，每次都是从上一次匹配成功处，开始向后匹配。因为字符串abba只有两个b，所以前两次匹配结果为true，第三次匹配结果为false。

**110.**
<code>i</code> 修饰符

默认情况下，正则对象区分字母的大小写，加上i修饰符以后表示忽略大小写（ignoreCase）。
```
/abc/.test('ABC') // false
/abc/i.test('ABC') // true
```

**111.**
<code>m</code>修饰符表示多行模式（multiline），会修改^和$的行为。默认情况下（即不加m修饰符时），^和$匹配字符串的开始处和结尾处，加上m修饰符以后，^和$还会匹配行首和行尾，即^和$会识别换行符（\n）。
```
/world$/.test('hello world\n') // false
/world$/m.test('hello world\n') // true
```
上面的代码中，字符串结尾处有一个换行符。如果不加m修饰符，匹配不成功，因为字符串的结尾不是world；加上以后，$可以匹配行尾。
```
/^b/m.test('a\nb') // true
```
上面代码要求匹配行首的b，如果不加m修饰符，就相当于b只能处在字符串的开始处。加上b修饰符以后，换行符\n也会被认为是一行的开始。

**112.** 
组匹配的先行断言

<code>x(?=y)</code>称为先行断言（Positive look-ahead），x只有在y前面才匹配，y不会被计入返回结果。比如，要匹配后面跟着百分号的数字，可以写成<code>/\d+(?=%)/</code>。

“先行断言”中，括号里的部分是不会返回的。
```
var m = 'abc'.match(/b(?=c)/);
m // ["b"]
```
上面的代码使用了先行断言，b在c前面所以被匹配，但是括号对应的c不会被返回。

**112.**
组匹配的先行否定断言

<code>x(?!y)</code>称为先行否定断言（Negative look-ahead），x只有不在y前面才匹配，y不会被计入返回结果。比如，要匹配后面跟的不是百分号的数字，就要写成/\d+(?!%)/。
```
/\d+(?!\.)/.exec('3.14')
// ["14"]
```
上面代码中，正则表达式指定，只有不在小数点前面的数字才会被匹配，因此返回的结果就是14。

“先行否定断言”中，括号里的部分是不会返回的。
```
var m = 'abd'.match(/b(?!c)/);
m // ['b']
```
上面的代码使用了先行否定断言，b不在c前面所以被匹配，而且括号对应的d不会被返回。

**113.**
在json中，如果对象的属性是undefined、函数或 XML 对象，该属性会被JSON.stringify过滤。
```
var obj = {
  a: undefined,
  b: function () {}
};

JSON.stringify(obj) // "{}"
```
上面代码中，对象obj的a属性是undefined，而b属性是一个函数，结果都被JSON.stringify过滤。

如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null。
```
var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]"
```
上面代码中，数组arr的成员是undefined和函数，它们都被转成了null。

正则对象会被转成空对象。
```
JSON.stringify(/foo/) // "{}"
JSON.stringify方法会忽略对象的不可遍历的属性。

var obj = {};
Object.defineProperties(obj, {
  'foo': {
    value: 1,
    enumerable: true
  },
  'bar': {
    value: 2,
    enumerable: false
  }
});

JSON.stringify(obj); // "{"foo":1}"
```
上面代码中，bar是obj对象的不可遍历属性，JSON.stringify方法会忽略这个属性。

**114.**
> <code>debounce（防抖动） 函数</code>

我们不希望回调函数被频繁调用。jQuery 的写法如下。
```
$('textarea').on('keydown', ajaxAction);
```
这样写有一个很大的缺点，就是如果用户连续击键，就会连续触发keydown事件，造成大量的 Ajax 通信。这是不必要的，而且很可能产生性能问题。正确的做法应该是，设置一个门槛值，表示两次 Ajax 通信的最小间隔时间。如果在间隔时间内，发生新的keydown事件，则不触发 Ajax 通信，并且重新开始计时。如果过了指定时间，没有发生新的keydown事件，再将数据发送出去。

这种做法叫做 debounce（防抖动）。假定两次 Ajax 通信的间隔不得小于2500毫秒，上面的代码可以改写成下面这样。
```
$('textarea').on('keydown', debounce(ajaxAction, 2500));

function debounce(fn, delay){
  var timer = null; // 声明计时器
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
```
上面代码中，只要在2500毫秒之内，用户再次击键，就会取消上一次的定时器，然后再新建一个定时器。这样就保证了回调函数之间的调用间隔，至少是2500毫秒。

**115.** <code>setTimeout和setInterval的运行机制</code>，是将指定的代码移出本轮事件循环，等到下一轮事件循环，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就继续等待。

这意味着，setTimeout和setInterval指定的回调函数，必须等到本轮事件循环的所有同步任务都执行完，才会开始执行。由于前面的任务到底需要多少时间执行完，是不确定的，所以没有办法保证，setTimeout和setInterval指定的任务，一定会按照预定时间执行。
```
setTimeout(someTask, 100);
veryLongTask();
```
上面代码的setTimeout，指定100毫秒以后运行一个任务。但是，如果后面的veryLongTask函数（同步任务）运行时间非常长，过了100毫秒还无法结束，那么被推迟运行的someTask就只有等着，等到veryLongTask运行结束，才轮到它执行。

**116.** setTimeout的作用是将代码推迟到指定时间执行，如果指定时间为0，即setTimeout(f, 0)，那么会立刻执行吗？

答案是不会。因为上一节说过，必须要等到当前脚本的同步任务，全部处理完以后，才会执行setTimeout指定的回调函数f。也就是说，<code>setTimeout(f, 0)</code>会在下一轮事件循环一开始就执行。
```
setTimeout(function () {
  console.log(1);
}, 0);
console.log(2);
// 2
// 1
```
setTimeout(f, 0)这种写法的目的是，尽可能早地执行f，但是并不能保证立刻就执行f。

**117.** 用户自定义的回调函数，通常在浏览器的默认动作之前触发。比如，用户在输入框输入文本，keypress事件会在浏览器接收文本之前触发。因此，下面的回调函数是达不到目的的。
```
// HTML 代码如下
// <input type="text" id="input-box">

document.getElementById('input-box').onkeypress = function (event) {
  this.value = this.value.toUpperCase();
}
```
上面代码想在用户每次输入文本后，立即将字符转为大写。但是实际上，它只能将本次输入前的字符转为大写，因为浏览器此时还没接收到新的文本，所以this.value取不到最新输入的那个字符。只有用setTimeout改写，上面的代码才能发挥作用。
```
document.getElementById('input-box').onkeypress = function() {
  var self = this;
  setTimeout(function() {
    self.value = self.value.toUpperCase();
  }, 0);
}
```
上面代码将代码放入setTimeout之中，就能使得它在浏览器接收到文本之后触发。

**118.** <code>Promise 就是解决这个问题，使得异步流程可以写成同步流程。</code>
