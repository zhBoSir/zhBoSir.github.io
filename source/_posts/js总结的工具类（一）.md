---
title: js总结的工具类（一）
date: 2019-01-10 17:02:38
tags:
---

> 点击非组件部分，让组件的弹框消失

```
// vue代码，视具体情况具体修改

var self = this
document.addEventListener('click', function (e) {
  if (!self.$refs.datePickerBox.contains(e.target)) {
    self.isShow = false
  }
})

```

> 判断是否是空对象

```
function isEmptyObject (obj) {
  return !obj || !Object.keys(obj).length
}

// 例子：
isEmptyObject({})  // 返回true
isEmptyObject({'0': 'a'})  // 返回false
```
