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