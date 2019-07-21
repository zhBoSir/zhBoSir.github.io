---
title: 笔记9：阅读（阮一峰）JavaScript 标准参考教程（alpha）
date: 2019-07-06 23:59:39
---

**121.** <code>微任务</code>

Promise 的回调函数不是正常的异步任务，而是微任务（microtask）。它们的区别在于，正常任务追加到下一轮事件循环，微任务追加到本轮事件循环。这意味着，微任务的执行时间一定早于正常任务。
```
setTimeout(function() {
  console.log(1);
}, 0);

new Promise(function (resolve, reject) {
  resolve(2);
}).then(console.log);

console.log(3);
// 3
// 2
// 1
```
上面代码的输出结果是321。这说明then的回调函数的执行时间，早于setTimeout(fn, 0)。因为then是本轮事件循环执行，setTimeout(fn, 0)在下一轮事件循环开始时执行。

**122.** 
如果参数节点是 DOM 已经存在的节点，appendChild()方法会将其从原来的位置，移动到新位置。
```
var div = document.getElementById('myDiv');
document.body.appendChild(div);
```
上面代码中，插入的是一个已经存在的节点myDiv，结果就是该节点会从原来的位置，移动到document.body的尾部。

**123.** 

如何移除当前节点的所有子节点。
```
var element = document.getElementById('top');
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```

**124.**
<code>Element.dataset</code>

网页元素可以自定义data-属性，用来添加数据。

Element.dataset属性返回一个对象，可以从这个对象读写data-属性。
```
 <article
   id="foo"
   data-columns="3"
   data-index-number="12314"
   data-parent="cars">
   ...
 </article>

var article = document.getElementById('foo');
article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```

**125.**
```
// 视口高度
document.documentElement.clientHeight

// 网页总高度
document.body.clientHeight
```
<code>Element.scrollHeight</code>属性返回一个整数值（小数会四舍五入），表示当前元素的总高度（单位像素），包括溢出容器、当前不可见的部分。它包括padding，但是不包括border、margin以及水平滚动条的高度（如果有水平滚动条的话），还包括伪元素（::before或::after）的高度。
```
// 返回网页的总高度
document.documentElement.scrollHeight
document.body.scrollHeight
```

**126.**

<code>Element.scrollLeft，Element.scrollTop</code>

Element.scrollLeft属性表示当前元素的水平滚动条向右侧滚动的像素数量，Element.scrollTop属性表示当前元素的垂直滚动条向下滚动的像素数量。

设置该属性的值，会导致浏览器将当前元素自动滚动到相应的位置。

**127.**

<code>Element.clientHeight，Element.clientWidth</code> 与 <code>Element.offsetHeight，Element.offsetWidth</code>

<font color="pink">
Element.clientHeight属性返回一个整数值，表示元素节点的 CSS 高度（单位像素），只对块级元素生效，对于行内元素返回0。如果块级元素没有设置 CSS 高度，则返回实际高度。

除了元素本身的高度，它还包括padding部分，但是不包括border、margin。如果有水平滚动条，还要减去水平滚动条的高度。注意，这个值始终是整数，如果是小数会被四舍五入。

Element.clientWidth属性返回元素节点的 CSS 宽度，同样只对块级元素有效，也是只包括元素本身的宽度和padding，如果有垂直滚动条，还要减去垂直滚动条的宽度。
</font>

<font color="gold">
Element.offsetHeight属性返回一个整数，表示元素的 CSS 垂直高度（单位像素），包括元素本身的高度、padding 和 border，以及水平滚动条的高度（如果存在滚动条）。

Element.offsetWidth属性表示元素的 CSS 水平宽度（单位像素），其他都与Element.offsetHeight一致。

这两个属性都是只读属性，只比Element.clientHeight和Element.clientWidth多了边框的高度或宽度。
</font>

**128.**

<code>Element.offsetLeft，Element.offsetTop</code>
Element.offsetLeft返回当前元素左上角相对于Element.offsetParent节点的水平位移，Element.offsetTop返回垂直位移，单位为像素。通常，这两个值是指相对于父节点的位移。

下面的代码可以算出元素左上角相对于整张网页的坐标。
```
function getElementPosition(e) {
  var x = 0;
  var y = 0;
  while (e !== null)  {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent;
  }
  return {x: x, y: y};
}
```

**129.** <code>Element.scrollIntoView()</code>

Element.scrollIntoView方法<code>滚动当前元素，进入浏览器的可见区域</code>，类似于设置window.location.hash的效果。
```
el.scrollIntoView(); // 等同于el.scrollIntoView(true)
el.scrollIntoView(false);
```
该方法可以接受一个布尔值作为参数。如果为true，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为false，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为true。

**130.** <code>Element.getBoundingClientRect</code>方法返回一个对象，提供当前元素节点的大小、位置等信息，基本上就是 CSS 盒状模型的所有信息。
```
var rect = obj.getBoundingClientRect();
```
上面代码中，getBoundingClientRect方法返回的rect对象，具有以下属性（全部为只读）。

<code>x</code>：元素左上角相对于视口的横坐标

<code>y</code>：元素左上角相对于视口的纵坐标

<code>height</code>：元素高度

<code>width</code>：元素宽度

<code>left</code>：元素左上角相对于视口的横坐标，与x属性相等

<code>right</code>：元素右边界相对于视口的横坐标（等于x + width）

<code>top</code>：元素顶部相对于视口的纵坐标，与y属性相等

<code>bottom</code>：元素底部相对于视口的纵坐标（等于y + height）

由于元素相对于视口（viewport）的位置，会随着页面滚动变化，因此表示位置的四个属性值，都不是固定不变的。如果想得到绝对位置，可以将left属性加上window.scrollX，top属性加上window.scrollY。dd

注意，getBoundingClientRect方法的所有属性，都把边框（border属性）算作元素的一部分。也就是说，都是从边框外缘的各个点来计算。因此，width和height包括了元素本身 + padding + border。

另外，上面的这些属性，都是继承自原型的属性，Object.keys会返回一个空数组，这一点也需要注意。
```
var rect = document.body.getBoundingClientRect();
Object.keys(rect) // []
```
上面代码中，rect对象没有自身属性，而Object.keys方法只返回对象自身的属性，所以返回了一个空数组。

**131.** <font color="orange"> <code>Element.focus()，Element.blur()</code>

Element.focus方法用于将当前页面的焦点，转移到指定元素上。
```
document.getElementById('my-span').focus();
```
该方法可以接受一个对象作为参数。参数对象的preventScroll属性是一个布尔值，指定是否将当前元素停留在原始位置，而不是滚动到可见区域。
```
function getFocus() {
  document.getElementById('btn').focus({preventScroll:false});
}
```
上面代码会让btn元素获得焦点，并滚动到可见区域。

最后，从document.activeElement属性可以得到当前获得焦点的元素。

Element.blur方法用于将焦点从当前元素移除。</font>

**132.** 
```
// HTML 代码为
// <button>Hello World</button>
var b = document.querySelector('button');
b.setAttribute('name', 'myButton');
b.setAttribute('disabled', true);
```
上面代码中，button元素的name属性被设成myButton，disabled属性被设成true。

这里有两个地方需要注意，首先，属性值总是字符串，其他类型的值会自动转成字符串，比如布尔值true就会变成字符串true；其次，上例的disable属性是一个布尔属性，对于&lt;button&gt;元素来说，这个属性不需要属性值，只要设置了就总是会生效，因此setAttribute方法里面可以将disabled属性设成任意值。

**133.**

操作 CSS 样式最简单的方法，就是使用网页元素节点的getAttribute方法、setAttribute方法和removeAttribute方法，直接读写或删除网页元素的style属性。
```
div.setAttribute(
  'style',
  'background-color:red;' + 'border:1px solid black;'
);
```
上面的代码相当于下面的 HTML 代码。
```
<div style="background-color:red; border:1px solid black;" />
```

**134.** 

删除一个元素的所有行内样式，最简便的方法就是设置cssText为空字符串。
```
divStyle.cssText = '';
```

**134.**

实例：<code>添加样式表</code>

网页添加样式表有两种方式。一种是添加一张内置样式表，即在文档中添加一个&lt;style&gt;节点。
```
// 写法一
var style = document.createElement('style');
style.setAttribute('media', 'screen');
style.innerHTML = 'body{color:red}';
document.head.appendChild(style);

// 写法二
var style = (function () {
  var style = document.createElement('style');
  document.head.appendChild(style);
  return style;
})();
style.sheet.insertRule('.foo{color:red;}', 0);
```

另一种是添加外部样式表，即在文档中添加一个<link>节点，然后将href属性指向外部样式表的 URL。
```
var linkElm = document.createElement('link');
linkElm.setAttribute('rel', 'stylesheet');
linkElm.setAttribute('type', 'text/css');
linkElm.setAttribute('href', 'reset-min.css');

document.head.appendChild(linkElm);
```
