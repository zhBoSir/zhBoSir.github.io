---
title: js总结的工具类（一）
date: 2019-01-10 17:02:38
tags:
---

> <font color="gold">点击非组件部分，让组件的弹框消失</font>

```
// vue代码，视具体情况具体修改

var self = this
document.addEventListener('click', function (e) {
  if (!self.$refs.datePickerBox.contains(e.target)) {
    self.isShow = false
  }
})

```

> <font color="gold">判断是否是空对象</font>

```
function isEmptyObject (obj) {
  return !obj || !Object.keys(obj).length
}

// 例子：
isEmptyObject({})  // 返回true
isEmptyObject({'0': 'a'})  // 返回false
```

> <font color="gold">数组reduce的示例：</font>
- 计算数组中每个元素出现的次数
```
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});

// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```
- 按属性对object分类节
```
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

var groupedPeople = groupBy(people, 'age');
// groupedPeople is:
// { 
//   20: [
//     { name: 'Max', age: 20 }, 
//     { name: 'Jane', age: 20 }
//   ], 
//   21: [{ name: 'Alice', age: 21 }] 
// }
```

- 数组去重节
```
// sort()的用法需要注意：
[1,2,3,11,7,777,1111,9].sort()
返回的是 [1,11,1111,2,3,7,777,9]

let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
let result = arr.sort().reduce((init, current) => {
    if(init.length === 0 || init[init.length-1] !== current) {
        init.push(current);
    }
    return init;
}, []);
console.log(result); //[1,2,3,4,5]
```
参考来源：

[Array.prototype.reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

> <font color="gold">判断是否是微信打开的页面</font>
```
export const isWeixin = () => {
  var ua = navigator.userAgent.toLowerCase()
  return /micromessenger/.test(ua)
}
```

> <font color="gold">判断是否设备是Android</font>
```
export const isAndroid = () => {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1  // android终端
  return isAndroid
}
```

> <font color="gold">判断是否设备是ios设备</font>
```
export const isIOs = () => {
  var u = navigator.userAgent
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  return isiOS
}
```