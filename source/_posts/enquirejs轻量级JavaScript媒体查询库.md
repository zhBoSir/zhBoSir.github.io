---
title: enquirejs轻量级JavaScript媒体查询库
categories:
  - JavaScript
abbrlink: 26b8ef5
date: 2020-05-12 15:54:18
tags:
---

enquire.js 是轻量级，纯 JavaScript 实现的 CSS 媒体查询库。

<code>适用场景：</code>

假如一个网站，对于小视口，我们希望只包含主要内容的一列。对于较大的视口，我们希望显示包含补充内容的侧边栏。

<!-- more -->

举个例子（来自ant-design-pro-vue）

```js
// device.js

import enquireJs from 'enquire.js'

export const DEVICE_TYPE = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile'
}

export const deviceEnquire = function (callback) {
  const matchDesktop = {
    match: () => {  // match是enquirejs的API定义的
      callback && callback(DEVICE_TYPE.DESKTOP)
    }
  }

  const matchLablet = {
    match: () => {
      callback && callback(DEVICE_TYPE.TABLET)
    }
  }

  const matchMobile = {
    match: () => {
      callback && callback(DEVICE_TYPE.MOBILE)
    }
  }

  // screen and (max-width: 1087.99px)
  enquireJs
    .register('screen and (max-width: 576px)', matchMobile)
    .register('screen and (min-width: 576px) and (max-width: 1199px)', matchLablet)
    .register('screen and (min-width: 1200px)', matchDesktop)
}

```
使用：
```js
mounted () {
  const { $store } = this
  deviceEnquire(deviceType => {
    switch (deviceType) {
      case DEVICE_TYPE.DESKTOP:  // 电脑的话做一些操作
        $store.commit('TOGGLE_DEVICE', 'desktop')
        $store.dispatch('setSidebar', true)
        break
      case DEVICE_TYPE.TABLET:  // 平板的话做一些操作
        $store.commit('TOGGLE_DEVICE', 'tablet')
        $store.dispatch('setSidebar', false)
        break
      case DEVICE_TYPE.MOBILE:
      default:  // 手机的话做一些操作
        $store.commit('TOGGLE_DEVICE', 'mobile')
        $store.dispatch('setSidebar', true)
        break
    }
  })
}
```
参考：

[enquire.js官网](https://wicky.nillia.ms/enquire.js/)
