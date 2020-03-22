---
title: Array的every和some方法
date: 2020-03-17 23:41:35
---

> ### 使用array.every()和array.some()实现一个复选框全选与否的表单效果

```html
<!-- 完整的demo -->
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>0.5px边框</title>
</head>
<body>
	<input type="checkbox" id="all"> 全选 <br/>
	<input type="checkbox" name="funs" checked> 足球
	<input type="checkbox" name="funs" checked> 篮球
	<input type="checkbox" name="funs" > 排球
	<input type="checkbox" name="funs" checked> 羽毛球 <br/><br/>
	
	<input type="button" value="确认提交" disabled>
	
	<script>
		let allInput = document.querySelectorAll('input[name="funs"]')
		let allChb = document.querySelector('#all')
		let btn = document.querySelector('input[type="button"]')
		
		allInput = Array.from(allInput)
		checkFun()
		
		// 点击每一项
		allInput.forEach((item) => {
			item.addEventListener('click', () => {
				checkFun()
			})
		})
		
		// 点击全选
		allChb.onclick = () => {
			allInput.forEach((item) => {
				item.checked = allChb.checked
			})
		}
		
		function checkFun () {
			// 全选
			allChb.checked = allInput.every((item) => {
				return item.checked
			})
			
			// 提交按钮
			let isDisabled = allInput.some((item) => {
				return item.checked
			})
			btn.disabled = !isDisabled
		}
	</script>
</body>
</html>
```

<font color="gold">知识点：</font>

> ## array.every()

every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

<code>注意：若收到一个空数组，此方法在一切情况下都会返回 true。</code>
```js
arr.every(callback[, thisArg])
```

参数

<code>callback</code>用来测试每个元素的函数，它可以接收三个参数：

+ <code>element</code>

  用于测试的当前值。

+ <code>index</code>可选
  用于测试的当前值的索引。

+ <code>array</code>可选

  调用 every 的当前数组。

<code>thisArg</code>
执行 callback 时使用的 this 值。

返回值

如果回调函数的每一次返回都为 truthy 值，返回 true ，否则返回 false。

> ## array.some()

some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

<code>注意：如果用一个空数组进行测试，在任何情况下它返回的都是false。</code>

```js
arr.some(callback(element[, index[, array]])[, thisArg])
```

参数

<code>callback</code>用来测试每个元素的函数，接受三个参数：

<code>element</code>数组中正在处理的元素。

<code>index</code> 可选 数组中正在处理的元素的索引值。

<code>array</code>可选 some()被调用的数组。

<code>thisArg</code>可选执行 callback 时使用的 this 值。

返回值

数组中有至少一个元素通过回调函数的测试就会返回true；所有元素都没有通过回调函数的测试返回值才会为false。


参考：

[Array.prototype.every()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

[Array.prototype.some()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

