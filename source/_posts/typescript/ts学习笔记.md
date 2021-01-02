---
title: ts学习笔记
date: 2020-12-19 22:34:00
categories:
  - TypeScript
tags: 
---

> ## <code>1.ts-node</code>包
```js
// node中执行ts代码需要两个步骤：

tsc hello.ts  // 把hello.ts转成hello.js
node hello.js
```
安装ts-node包后，只需
```js
ts-node hello.ts
```

> ## <code>2.将数字字符串类型转换成数字类型</code>

```js
console.log(2-'1')  // 在ts里会报错，因为数字不能减字符串

改成

console.log(2- +'1')  // 输出1
```

> ## <code>3.break与continue</code>
```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break  // 跳出循环
  }
  console.log(`第${i}个`)
}

// 输出：
// 第1个
// 第2个
```
```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue  // 跳出本次循环
  }
  console.log(`第${i}个`)
}

// 输出：
// 第1个
// 第2个
// 第4个
// 第5个
```

> ## <code>4.声明数组的方式</code>
```js
// 第一种方式
let arr: string[] = ['1', '2']
let arr: number[] = [1, 2]
```
```js
// 第二种方式：通过泛型的方式
let arr: Array<string> = ['1', '2']
let arr: Array<number> = [1, 2]
```

> ## <code>5.元组（数组的升级）</code>
元组即已知（确定）每一项的类型，以及已知（确定）数组的个数
```js
let arr: [string, number, string, boolean]
arr = ['1', 1, '1', true]
```

> ## <code>6.枚举类型</code>

```js
enum Sex {
  Man,
  Woman
}

let sex1: Sex = Sex.Man
let sex2: Sex = Sex.Woman

console.log(sex1)  // 输出0
console.log(sex2)  // 输出1
```
```js
enum Sex {
  Man = 1,
  Woman = 8
}

let sex1: Sex = Sex.Man
let sex2: Sex = Sex.Woman

console.log(sex1)  // 输出1
console.log(sex2)  // 输出8
```

```js
enum Sex {
  Man = 1,
  Woman = 8
}

let sex1name: string = Sex['1']
let sex2name: string = Sex['8']

console.log(sex1name)  // 输出Man
console.log(sex2name)  // 输出Woman
```

