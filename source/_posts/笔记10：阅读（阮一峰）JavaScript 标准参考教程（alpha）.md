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

**140.** click事件指的是，用户在同一个位置先完成mousedown动作，再完成mouseup动作。因此，触发顺序是，mousedown首先触发，mouseup接着触发，click最后触发。

**141.** <code>事件的代理</code>
由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。
```
var ul = document.querySelector('ul');

ul.addEventListener('click', function (event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    // some code
  }
});
```
上面代码中，click事件的监听函数定义在ul节点，但是实际上，它处理的是子节点li的click事件。这样做的好处是，只要定义一个监听函数，就能处理多个子节点的事件，而不用在每个li节点上定义监听函数。而且以后再添加子节点，监听函数依然有效。

如果希望事件到某个节点为止，不再传播，可以使用事件对象的stopPropagation方法。
```
// 事件传播到 p 元素后，就不再向下传播了
p.addEventListener('click', function (event) {
  event.stopPropagation();
}, true);

// 事件冒泡到 p 元素后，就不再向上冒泡了
p.addEventListener('click', function (event) {
  event.stopPropagation();
}, false);
```

**142.** 为了让元素节点可拖拉，可以将该节点的draggable属性设为true。
```
<div draggable="true">
  此区域可拖拉
</div>
```
draggable属性可用于任何元素节点，但是图片（img）和链接（a）不加这个属性，就可以拖拉。对于它们，用到这个属性的时候，往往是将其设为false，防止拖拉这两种元素。

**143.** <font color="gold">假如有一个scroll事件，<code>requestAnimationFrame</code>方法保证每次页面重绘（每秒60次），只会触发一次scroll事件的监听函数。也就是说，将scroll事件的触发频率，限制在每秒60次。</font>

**144.** 用户在页面上按下鼠标的右键，会触发contextmenu事件，导致执行oncontextmenu()。如果该属性执行后返回false，就等于禁止了右键菜单。document.oncontextmenu与window.oncontextmenu效果一样。
```
document.oncontextmenu = function () {
  return false;
};
```
上面代码中，oncontextmenu属性执行后返回false，右键菜单就不会出现。

**145.** 如果type属性的值，浏览器不认识，那么它不会执行其中的代码。利用这一点，可以在&lt;script&gt;标签之中嵌入任意的文本内容，只要加上一个浏览器不认识的type属性即可。
```
<script id="mydata" type="x-custom-data">
  console.log('Hello World');
</script>
```
上面的代码，浏览器不会执行，也不会显示它的内容，因为不认识它的type属性。但是，这个&lt;script&gt;节点依然存在于 DOM 之中，可以使用&lt;script&gt;节点的text属性读出它的内容。
```
document.getElementById('mydata').text
//   console.log('Hello World');
```

**146.** 为了防止攻击者篡改外部脚本，script标签允许设置一个integrity属性，写入该外部脚本的 Hash 签名，用来验证脚本的一致性。
```
<script src="/assets/application.js"
  integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs=">
</script>
```
上面代码中，script标签有一个integrity属性，指定了外部脚本/assets/application.js的 SHA256 签名。一旦有人改了这个脚本，导致 SHA256 签名不匹配，浏览器就会拒绝加载。

**147.** 

history.go(0); // 刷新当前页面

<font color="red">
注意，移动到以前访问过的页面时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页。
</font>

** 148.**

<code>Location.reload()</code>

reload方法使得浏览器重新加载当前网址，相当于按下浏览器的刷新按钮。

它接受一个布尔值作为参数。如果参数为true，浏览器将向服务器重新请求这个网页，并且重新加载后，网页将滚动到头部（即scrollTop === 0）。如果参数是false或为空，浏览器将从本地缓存重新加载该网页，并且重新加载后，网页的视口位置是重新加载前的位置。
```
// 向服务器重新请求当前网址
window.location.reload(true);
```

** 149.** 

<code>ArrayBuffer 对象</code>表示一段二进制数据，用来模拟内存里面的数据。

<code>Blob 对象</code>表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写。它通常用来读写文件，它的名字是 Binary Large Object （二进制大型对象）的缩写。它与 ArrayBuffer 的区别在于，它用于操作二进制文件，而 ArrayBuffer 用于操作内存。



