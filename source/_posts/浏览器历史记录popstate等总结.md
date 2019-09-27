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

<font color="gold">出问题的背景：</font>

供应链金融项目里面合同的展示使用的是iframe，使用iframe的src指向具体的合同html页面，（为什么使用iframe嵌套合同，一方面是为了不让主页面用户输入的信息被清空，一方面是为了和平台友好的页面交互）。出现的问题是点击手机物理返回键的时候会出现一个空白页面。

<font color="pink"><b>解决方案：</b></font>

思路：有几个合同就放几个iframe，各个合同使用各自的iframe，当前合同的iframe展示的时候，其他的合同iframe隐藏。
```
// 部分代码：
<div class="contract" style="-webkit-overflow-scrolling:touch;overflow:auto;">

  <iframe id="iframe1" src="/transfer-mng/wap/hpk/contract/contract-quota.html"></iframe>
  <iframe id="iframe2" src="/transfer-mng/wap/hpk/contract/contract-credit-personal.html"></iframe>
  <iframe id="iframe3" src="/transfer-mng/wap/hpk/contract/contract-hi-service.html"></iframe>

</div>

// js文件：
$('#contract-quota').click(function(){
    console.log($('.contract iframe'))
    $('.contract #iframe1').show().siblings().hide()
      $('.contract').show();
      $('.shut-down').show(500);
});
// 关闭按钮
$('.shut-down').click(function(){
  $('.contract').hide();
  $('.shut-down').hide();
});
```

##### 参考文章：
[popstate玩转浏览器历史记录](https://www.jianshu.com/p/2247d300bad0)

[ajax与HTML5 history pushState/replaceState实例](https://www.zhangxinxu.com/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/)

[解决 iframe 后退不是主页面后退（浏览器 history）问题](https://www.cnblogs.com/yuxiaole/p/9771858.html)