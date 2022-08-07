---
title: 使用reduce的例子
date: 2022-1-20 13:36:05
categories:
  - JavaScript
tags:
  - JavaScript
---

## 1. 将二维数组转化为一维

```js
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  function(a, b) {
    return a.concat(b);
  },
  []
);

// flattened is [0, 1, 2, 3, 4, 5]
```

<!-- more -->

## 2. 计算数组中每个元素出现的次数

```js
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

## 3. 按属性对object分类

```js
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

## 4. 数组去重

```js

let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']

let myOrderedArray = myArray.reduce(function (accumulator, currentValue) {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue)
  }
  return accumulator
}, [])

console.log(myOrderedArray)

```
```js

let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];

let result = arr.sort().reduce((init, current) => {
    if(init.length === 0 || init[init.length-1] !== current) {
      init.push(current);
    }
    return init;
}, []);

console.log(result); //[1,2,3,4,5]
```

数组去重最简便方法：
```js
//来获得一个相同元素被移除的数组。

let myArray = ['1', '2', 'a', 'b', 'a', '1']
let orderedArray = Array.from(new Set(myArray)); 

```

