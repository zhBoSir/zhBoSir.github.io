---
title:  GraphQL学习与使用
date: 2022-05-22 16:03:02
categories:
  - Node
tags: 
  - GraphQL
---

> 1. "!"的作用

默认情况下，没有加“ ！”的，都是值可以为null的，“ ！”不是必填的意思，是返回值不能为null的意思

<!-- more -->

```js
type Query {
  name: String,
  age: Int!
}

// name可以返回null，age不能返回null
```

> 2. Apollo在GraphQL中使用

{% asset_img 1.png Apollo %}

> 3. Apollo-serve与框架配合的中间件

{% asset_img 2.png Apollo中间件 %}


> 其他相关：

[uuid包](https://www.npmjs.com/package/uuid)

[cors包](https://www.npmjs.com/package/cors)




