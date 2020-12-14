---
title: js基础巩固（二）
date: 2020-04-20 11:02:18
categories:
  - JavaScript
tags: 
---

> ## <font color="gold">1.this指向</font>

```js
setTimeout(function () {
  console.log(this)
}, 1000)
```
setTimeout里的this指向window，因为是window调用了setTimeout。

```js
(function a() {
  console.log(this)
})()
```
立即执行函数里的this指向也是window。

> ## <font color="gold">2.递归</font>

如果一个函数在内部可以调用其自身，那么这个函数就是递归函数。


### 练习题：

1.利用递归函数求1~n的阶乘 1 * 2 * 3 * .. n
```js
function fn (n) {
  if ( n === 1 ) {
    return 1
  }
  return n * fn(n - 1)
}

console.log(fn(5))  // 120
```

2.利用递归函数求<code>斐波那契数列</code>(兔子序列)1、1、2、3、5、8、13、21...
用户输入一个数字n就可以求出这个数字对应的兔子序列值。

斐波那契数列 就是<code>前两项相加等于第三项的值</code>
```js
function fn(n) {
  if (n === 1 || n === 2) {
    return 1
  }
  return fn(n-1) + fn(n-2)
}
console.log(fn(1))  // 1
console.log(fn(2))  // 1
console.log(fn(3))  // 2
console.log(fn(4))  // 3
console.log(fn(5))  // 5
```

3.从一个对象中，根据id找出对应的数据
```js
var objArray = [
  {
    id: 1,
    name: 'zhangsan',
    children: [
      {
        id: 11,
        name: 'xiaozhangsan01'
      },
      {
        id: 12,
        name: 'xiaozhangsan02',
        children: [
          {
            id: 111,
            name: 'xiaoxiaozhangsan01'
          },
          {
            id: 112,
            name: 'xiaoxiaozhangsan02'
          }
        ]
      }
    ]
  },
  {
    id: 1,
    name: 'lisi',
  }
]

function getById (array, id) {
  array.forEach(item => {
    if (item.id === id) {
      console.log(item.name)
    } else if (item.children && item.children.length > 0) {
      getById(item.children, id)  // 利用递归
    }
  }) 
}

getById(objArray, 1)  // 'zhangsan'
getById(objArray, 11)  // 'xiaozhangsan01'
getById(objArray, 112)  // 'xiaoxiaozhangsan02'
getById(objArray, 2)  // 'lisi'
```


