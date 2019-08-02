---
title: 笔记10：阅读（阮一峰）JavaScript 标准参考教程（alpha）
date: 2019-07-06 23:59:39
---

**136.**  document.fullscreenElement

document.fullscreenElement属性返回当前以全屏状态展示的 DOM 元素。如果不是全屏状态，该属性返回null。
```
if (document.fullscreenElement.nodeName == 'VIDEO') {
  console.log('全屏播放视频');
}
```
上面代码中，通过document.fullscreenElement可以知道&lt;video&gt;元素有没有处在全屏状态，从而判断用户行为。

**137.** 
- document.scripts

document.scripts属性返回所有&lt;script&gt;节点。
```
var scripts = document.scripts;
if (scripts.length !== 0 ) {
  console.log('当前网页有脚本');
}
```
- document.styleSheets

document.styleSheets属性返回文档内嵌或引入的样式表集合

- document.images

document.images属性返回页面所有&lt;img&gt;图片节点。
```
var imglist = document.images;

for(var i = 0; i < imglist.length; i++) {
  if (imglist[i].src === 'banner.gif') {
    // ...
  }
}
```
上面代码在所有img标签中，寻找某张图片。

**138.**

<code>document.querySelector</code>和<code>document.querySelectorAll</code>

这两个方法的参数，可以是逗号分隔的多个 CSS 选择器，返回匹配其中一个选择器的元素节点，这与 CSS 选择器的规则是一致的。
```
var matches = document.querySelectorAll('div.note, div.alert');
```
上面代码返回class属性是note或alert的div元素。

最后，这两个方法除了定义在document对象上，还定义在元素节点上，即在元素节点上也可以调用。

<code>document.getElementsByClassName()</code>同上面用法。
```
var firstPara = document.getElementsByTagName('p')[0];
var spans = firstPara.getElementsByTagName('span');
```
上面代码选中第一个p元素内部的所有span元素。

**139.** <code>事件的传播</code>

一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。

第一阶段：从window对象传导到目标节点（上层传到底层），<code>称为“捕获阶段”（capture phase）</code>。

第二阶段：在目标节点上触发，<code>称为“目标阶段”（target phase）</code>。

第三阶段：从目标节点传导回window对象（从底层传回上层），<code>称为“冒泡阶段”（bubbling phase）</code>。

