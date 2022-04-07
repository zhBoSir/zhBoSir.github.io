---
title: js总结的工具类（一）
date: 2019-01-10 17:02:38
categories:
  - JavaScript
tags: 
---

> <font color="gold">1.点击非组件部分，让组件的弹框消失</font>

```
// vue代码，视具体情况具体修改

var self = this
document.addEventListener('click', function (e) {
  if (!self.$refs.datePickerBox.contains(e.target)) {
    self.isShow = false
  }
})

```

> <font color="gold">2.判断是否是空对象</font>

```
function isEmptyObject (obj) {
  return !obj || !Object.keys(obj).length
}

// 例子：
isEmptyObject({})  // 返回true
isEmptyObject({'0': 'a'})  // 返回false
```

> <font color="gold">3.判断是否是微信打开的页面</font>
```
export const isWeixin = () => {
  var ua = navigator.userAgent.toLowerCase()
  return /micromessenger/.test(ua)
}
```

> <font color="gold">4.判断是否设备是Android</font>
```
export const isAndroid = () => {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1  // android终端
  return isAndroid
}
```

> <font color="gold">5.判断是否设备是ios设备</font>
```
export const isIOs = () => {
  var u = navigator.userAgent
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  return isiOS
}
```

> <font color="gold">6.js判断设备是pc端还是移动端</font>
```js
function browserRedirect() {
  const sUserAgent = navigator.userAgent.toLowerCase()
  const bIsIpad = sUserAgent.match(/ipad/i) == "ipad"
  const bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os"
  const bIsMidp = sUserAgent.match(/midp/i) == "midp"
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"
  const bIsUc = sUserAgent.match(/ucweb/i) == "ucweb"
  const bIsAndroid = sUserAgent.match(/android/i) == "android"
  const bIsCE = sUserAgent.match(/windows ce/i) == "windows ce"
  const bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile"
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    document.writeln("您的浏览设备为：phone")
  } else {
    document.writeln("您的浏览设备为：pc")
  }
}

browserRedirect()
```
代码简化：
```js
function browserRedirect() {
  const sUserAgent = navigator.userAgent.toLowerCase()
  if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
    document.writeln("您的浏览设备为：phone")
  } else {
    document.writeln("您的浏览设备为：pc")
  }
}
browserRedirect()
```
使用device.js插件来判断是否移动端设备

插件GIT地址：https://github.com/matthewhudson/device.js

参考：

[详解JS判断页面是在手机端还是在PC端打开的方法](https://www.jb51.net/article/160272.htm)

[js判断浏览器的环境（pc端，移动端，还是微信浏览器）](https://www.jb51.net/article/178066.htm)

[js判断是移动端设备还是pc端设备代码](https://www.51xuediannao.com/javascript/jspdsyddsbhspcdsbdm_996.html)

[JS-判断设备操作系统是Andorid还是IOS](https://blog.csdn.net/wang704987562/article/details/85227319)

> <font color="gold">7.url的?后面参数转成对象</font>
```js
/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}
```

> <font color="gold">8.js获取日期加或减多少天后的日期</font>
```js
function getTargetDate (startDate, days) {
  let startTime
  startTime = startDate ? new Date(startDate).getTime() : new Date().getTime()
  let diff = days*86400*1000
  let endTime = startTime + diff
  let d = new Date(endTime)
  var CurrentDate = ''
  CurrentDate +=(d.getFullYear())
  d.getMonth()+1 > 9 ? CurrentDate +="-"+(d.getMonth()+1) : CurrentDate +="-0"+(d.getMonth()+1)
  d.getDate() > 9 ? CurrentDate+="-"+(d.getDate()) : CurrentDate+="-0"+(d.getDate())
  return CurrentDate
}
```
可以使用现成的第三方库<code>moment.js</code>，它里面也有加或减的方法
```js
moment().add(10, 'days').calendar()
```

[moment.js地址](http://momentjs.cn/)

> <font color="gold">9.如果是一位数就在前面加0，变成01这种格式</font>
```js
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
```

> <font color="gold">10.JS如何判断一个对象是否为空、是否有某个属性</font>

js判断一个对象是否为空

```js
// 第一种方法：
let obj1 = {}
if (JSON.stringify(obj1) == "{}") {
  console.log("空对象")
} else {
  console.log("非空对象")
}

// 第二种方法
let obj1 = {}
if (Object.keys(obj1).length == 0){   
  console.log("空对象")
} else {
  console.log("非空对象")
}
```

js判断对象中是否有某个属性

```js
//  in运算符   如果某属性在指定对象或其原型链上则返回true，只需判断自身属性时，此方法不适用。
let obj2 = { a : 1 }
if ("a" in obj2) {
  console.log("对象或其原型链上有此属性")
} else {
  console.log("对象或其原型链上无此属性")
}


// obj.hasOwnProperty() 对象自身属性中含有某属性，返回true。
let obj2 = {a:1}
if (obj2.hasOwnProperty("a")){
   console.log("对象上有此属性")
}else {
   console.log("对象上无此属性")
}
```