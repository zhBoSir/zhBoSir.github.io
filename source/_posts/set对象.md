---
title: set对象
date: 2019-10-12 18:13:00
categories:
  - JavaScript
tags: 
---

> Set 对象

Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

```
const set1 = new Set([1, 2, 3, 4, 5]);

console.log(set1.has(1));
// expected output: true

console.log(set1.has(5));
// expected output: true

console.log(set1.has(6));
// expected output: false
```

Set对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set中的元素只会出现一次，即 Set 中的元素是唯一的。
```
Set.prototype.has(value)
返回一个布尔值，表示该值在Set中存在与否。
```

参考：

[Set (MSDN)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

