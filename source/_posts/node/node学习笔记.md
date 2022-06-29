---
title:  node学习笔记
date: 2022-06-29 22:39:02
categories:
  - Node
tags: 
  - Node
---

> ## 1.调用fs.readFile()读取文件内容

```js
const fs = require('fs')

fs.readFile('文件名.txt', 'utf8', function (err, dataStr) {
  if (err) {
    return console.log('读取文件失败')
  }
})
```

<!-- more -->
> ## 2.调用fs.writeFile()写入文件内容

```js
const fs = require('fs')

fs.writeFile('文件名.txt', newStr, function (err) {
  if (err) {
    return console.log('写入文件失败')
  }
})
```



