---
title: firefox火狐浏览器改placeholder注意事项
date: 2019-06-19 16:28:39
categories:
  - 兼容性
tags: 
---

><font color="gold" size="4">修改浏览器默认placeholder样式，火狐浏览器注意事项：</font>

<code>火狐浏览器修改placeholder默认的样式后，默认会带透明度，要把透明度改为1，这样才能和其他浏览器保持一致。有时候加前缀的写法不成功，那么就要用第一个不带前缀的写法弥补下</code>
```css
input::placeholder {
  opacity: 1;
  font-size: 14px;
  color: #4290C9;
}
input::-webkit-input-placeholder {
  font-size: 14px;
  color: #4290C9;
}

<!-- 火狐浏览器修改placeholder默认的样式后，默认会带透明度，要把透明度改为1，这样才能和其他浏览器保持一致。有时候加前缀的写法不成功，那么就要用第一个不带前缀的写法弥补下 -->

input::-moz-input-placeholder {
  opacity: 1;
  font-size: 14px;
  color: #4290C9;
}
input::-ms-input-placeholder {
  font-size: 14px;
  color: #4290C9;
}
input::-o-input-placeholder {
  font-size: 14px;
  color: #4290C9;
}
```
