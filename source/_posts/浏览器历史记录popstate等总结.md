---
title: 浏览器历史记录popstate等总结
date: 2019-09-12 15:47:29
---

- HTML5新增的用来控制浏览器历史记录的api
  - 存储当前历史记录点 <code>pushState</code>
  - 替换当前历史记录点 <code>replaceState</code>
  - 监听历史记录点 <code>popstate </code>

```
history.pushState(data,title,url);

/* 其中第一个参数data是给state的值；
*  第二个参数title为页面的标题，但当前所有浏览器都忽略这个参数，传个空字符串就好；
*  第三个参数url是想要去的链接；
*/
```
replaceState用法类似。

---
- <code>window.history</code> 对象，该对象上包含有 <code>length</code> 和 <code>state</code> 的两个值，在它的 \_\_proto\_\_ 上继承有 <code>back</code> 、<code>forward</code> 、<code>go</code> 等几个功能函数。

---
> pushState与replaceState两者区别：

pushState 会改变 history.length，而 replaceState 不改变 history.length。

---
需要注意的是调用 history.pushState 或 history.replaceState 不会触发 popstate 事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在 Javascript 代码中调用 history.back）
```
window.addEventListener("popstate", function () {
  console.log(history.state)
})
```

##### 参考文章：
[popstate玩转浏览器历史记录](https://www.jianshu.com/p/2247d300bad0)

[ajax与HTML5 history pushState/replaceState实例](https://www.zhangxinxu.com/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/)