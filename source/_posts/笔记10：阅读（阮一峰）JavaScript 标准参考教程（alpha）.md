---
title: 笔记9：阅读（阮一峰）JavaScript 标准参考教程（alpha）
date: 2019-07-06 23:59:39
---

**136.**  document.fullscreenElement

document.fullscreenElement属性返回当前以全屏状态展示的 DOM 元素。如果不是全屏状态，该属性返回null。
```
if (document.fullscreenElement.nodeName == 'VIDEO') {
  console.log('全屏播放视频');
}
```
上面代码中，通过document.fullscreenElement可以知道<video>元素有没有处在全屏状态，从而判断用户行为。

