---
title: vue相关第三方插件
date: 2020-05-12 16:25:02
categories:
  - Vue
tags:
  - Vue
---

> 1.<code>vue-ls</code>

vue-ls : vue插件，用于从Vue上下文中使用本地存储，会话存储和内存存储。

<!-- more -->

具体使用可以看参考文章，使用挺简单的。

参考：

[vue插件vue-ls](https://www.dazhuanlan.com/2019/11/30/5de15053e3589/)

[Vue的Vue-ls使用](https://www.jianshu.com/p/ab7f67878279)

> 2.<code>vue-print-nb打印插件</code>

参考：

[vue插件vue-print-nb](https://www.npmjs.com/package/vue-print-nb)

> 3.<code>v-charts基于Vue2.x的 Echarts 图表组件</code>

参考：

[v-charts](https://vue-echarts.github.io/)

> 4.<code>qs.js的使用</code>

安装
```
yarn add qs

import qs from 'qs'
```

qs.stringify 把对象转换成字符串
```js
qs.stringify({ a: 'b' }), 
// 'a=b'

qs.stringify({ a: { b: 'c' } })
// a[b]=c
```

qs.parse 把字符串转换为对象
```js
qs.parse('a=c'); 
// {a:'c'}

qs.parse('a=b&c=d')
// {a: 'b', c: 'd'}

// 去掉？号的写法
qs.parse('?a=b&c=d', { ignoreQueryPrefix: true })
// {a: 'b', c: 'd'}

```



