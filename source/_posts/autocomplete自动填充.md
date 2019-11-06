---
title: autocomplete 自动完成功能
date: 2019-11-06 14:32:39
---

实例:

启用自动完成功能的 HTML 表单（其中一个输入字段禁用了自动完成）：
```
<form action="demo_form.html" autocomplete="on">

姓:<input type="text" name="fname"><br>
名: <input type="text" name="lname"><br>
邮箱: <input type="email" name="email" autocomplete="off"><br>

<input type="submit">

</form>
```
autocomplete的两个值：

<code>on</code> 默认。规定启用自动完成功能。

<code>off</code> 规定禁用自动完成功能。

<font color="red">特别注意：</font>

禁止浏览器表单自动填充

普通文本框添加 autocomplete="off"，<code>密码输入框添加 autocomplete="new-password"</code>。
```
<input type="text" autocomplete="off" name="userName"/>

<input type="password" autocomplete="new-password" name="password"/>
```
如果是整个表单可以设置：
```
<form method="post" action="/form" autocomplete="off">
[…]
</form>
```