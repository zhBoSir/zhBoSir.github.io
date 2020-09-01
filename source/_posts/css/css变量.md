---
title: css变量
date: 2020-08-27 13:39:02
categories:
  - Css
tags:
  - Css
---

声明变量的时候，变量名前面要加两根连词线（--）。CSS 变量（CSS variable）又叫做"CSS 自定义属性"

<!-- more -->

```css
body {
  --foo: #7F583F;
  --bar: #F7EFD2;
}
```
上面代码中，body选择器里面声明了两个变量：--foo和--bar。

<code>var()函数用于读取变量。</code>

```css
a {
  color: var(--foo);
  text-decoration-color: var(--bar);
}
```
var()函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。

```css
color: var(--foo, #7F583F);
```

<code>变量值的类型</code>

+ 如果变量值是一个字符串，可以与其他字符串拼接。

```css
--bar: 'hello';
--foo: var(--bar)' world';
```

+ 如果变量值是数值,必须使用calc()函数，将它们连接。

```css
.foo {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px);
}
```

+ 如果变量值带有单位，就不能写成字符串。

```css
/* 无效 */
.foo {
  --foo: '20px';
  font-size: var(--foo);
}

/* 有效 */
.foo {
  --foo: 20px;
  font-size: var(--foo);
}
```
作用域
```css
body {
  --foo: #7F583F;
}

.content {
  --bar: #F7EFD2;
}
```
上面代码中，变量--foo的作用域是body选择器的生效范围，--bar的作用域是.content选择器的生效范围。

由于这个原因，全局的变量通常放在<code>根元素:root</code>里面，确保任何选择器都可以读取它们。

```css
:root {
  --main-color: #06c;
}
```

<code>JavaScript 操作 CSS 变量的写法如下。</code>

```js
// 设置变量
document.body.style.setProperty('--primary', '#7F583F');

// 读取变量
document.body.style.getPropertyValue('--primary').trim();
// '#7F583F'

// 删除变量
document.body.style.removeProperty('--primary');
```

CSS 变量提供了 JavaScript 与 CSS 通信的一种途径。


参考：

[CSS 变量教程](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)


