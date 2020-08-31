---
title: 关闭blank打开的新页面
date: 2020-06-22 23:31:00
---

假设有两个页面a.html 与 b.html

a.html的代码：
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<h1>我是a页面</h1>
	<a id="a" href="b.html" target="_blank">按钮</a>
</body>
</html>
```
b.html的代码：
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<h1>我是b页面</h1>
	<button id="btn">按钮</button>

	<script type="text/javascript">
		window.onload = function() {
			let btn = document.getElementById('btn')
			btn.addEventListener('click', function(){
				window.close()
			})
		}
	</script>
</body>
</html>
```
总结：a页面通过target="_blank"打开的新页面b,b页面可以通过window.close()关掉自身。

<font color="gold">扩展知识：</font>

<code>window.open(URL,name,specs,replace)</code>open()方法可以打开一个网页，它的参数可以看具体的文档，通过控制第三个参数可以控制打开浏览器的样式以及位置。

参考链接：

[Window open() 方法 https://www.runoob.com/jsref/met-win-open.html](https://www.runoob.com/jsref/met-win-open.html)
