---
title: []是ES6中的计算属性名
date: 2019-11-26 23:59:00
---

## 什么是计算属性名

计算属性名是 ES6 的一个很大的增强，事实上可计算属性不是一个很新鲜的东西

在 ES5 版本中我们也可以通过计算属性来进行取值：
```
let name = "first name";
let person = {};

person[name] = "Raaa";
console.log(person[name]); // Raaa
console.log(person["first name"]); // Raaa
```
但是我们并不能在字面量声明的时候就使用这样的计算属性：
```
// 错误示范
let name = "first name";
let person = {
    name: "Raaa", // 错误
    "last name": "bbit" // 正确
};
```
### <font color="pink">重点来啦！！！</font>

在 ES6 的语法中，我们可以直接在字面量定义中使用计算属性，只要使用<code>[ ]</code>即可，我们甚至可以在<code>[ ]</code>中书写表达式：
```
let name = "first name"

let person = {
    [name]:"Raaa",
    ["last"+" name"]:"bbit",
    // 方法也可以用这样的方式定义
    ["say"+"Hello"](){
        console.log("hello");
    }
}
console.log(person["first name"]); // Raaa
```
新特性要有适合的应用场景才有意义，那么接下来就是我们计算属性的应用！

## 使用计算属性名优化我们的代码
这个词汇不止一次提到了，下面我们说说为什么需要使用计算属性名

当我们进行一个项目开发时（特别是多人项目），要保证命名的可读性和可维护性，这时往往需要进行统一的管理

现在一个常用的方法是使用模块化方法（如ES6模块化规范，CommonJS规范，AMD规范，CMD规范），在一个模块中定义一些常量，并进行统一的导出使用，从而保证变量名良好的维护性
```
// states.js
export const states = {
    states1:"start",
    states2:"doing",
    states3:"end"
}


import STATES from 'states.js'
let obj = {
    [STATES.states1](){
        console.log("start~~")
    }
}
obj[STATES.states1]();
```
我们可以在使用vuex这样的工具的时候采用上面的这种模式
```
//store.js
import Vuex from 'vuex'
import STATES from 'states.js'

const store = new Vuex.Store({
    mutations:{
        [STATES.doing](state){
            // to do
        }
    }
})
```


参考：

[ES6计算属性名-代码优化利器](https://blog.csdn.net/github_39457740/article/details/89714560)

[ES6动态计算属性名](https://www.cnblogs.com/mengfangui/p/9150458.html)
