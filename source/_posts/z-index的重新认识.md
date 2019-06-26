---
title: z-index的重新认识
date: 2019-06-26 17:00:00
---

> 错误认知：
- z-index不是设置的值越高，就会显示在最上层
- z-index的值设置为负值，不是一定会在z-index为正值的元素之下，例如：
```
<div style="position:absolute;z-index: 5;width:100px;height:100px;background:gold;">
  <div style="position:absolute; z-index: -1;width:100px;height:100px;background:pink;">
  </div>
</div>
```
子元素不管z-index的值多大都会显示在父元素之上。

>主要围绕 <code>层叠上下文</code>

<font color="red">注意：</font>

下面的参考链接里内容要关注和着重看一下渲染的顺序


参考：

[层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)

