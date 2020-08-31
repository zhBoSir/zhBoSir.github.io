---
title: async...await...用法
categories:
  - js
abbrlink: 9b63ad8a
date: 2020-08-26 22:18:02
tags:
---

async 函数的实现原理

async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

<!-- more -->
```js
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```
所有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器。

下面给出spawn函数的实现，基本就是前文自动执行器的翻版。
```js
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```
async...await...使用注意：

```js
// 写法一
let foo = await getFoo();
let bar = await getBar();
```
上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有getFoo完成以后，才会执行getBar。

这是同步执行的写法。

```js
// 写法二
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法三
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```
上面两种写法，getFoo和getBar都是同时触发，这样就会缩短程序的执行时间。

这是异步的写法。

<code>上面写法一与写法三为什么一个是同步一个是异步。</code>

这块还没有弄清楚，待后续学习补充。。。

