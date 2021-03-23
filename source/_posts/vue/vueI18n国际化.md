---
title: elementUI、vueI18n国际化
date: 2021-03-23 22:59:02
categories:
  - Vue
tags:
  - 国际化
---

### 1.需要安装vue-i18n

```
npm install vue-i18n
```
### 2.因为我是把国际化单独分离到一个文件夹里了，所以需要导出，并在main.js里引入与挂载

<!-- more -->

具体配置
```js
// locale文件夹下的index.js文件

// 配置国际化主要就在这个文件里
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
import en from './en'
import zh from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...en,
    ...enLocale
  },
  zh: {
    ...zh,
    ...zhLocale
  }
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages // set locale messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
```
```js
// locale文件夹下的en.js文件

const en = {
  myFuture: 'myFuture',
  activity: 'Activity'
}

export default en

```
```js
// locale文件夹下的zh.js文件

const zh = {
  myFuture: '我的未来',
  activity: '活动'
}

export default zh
```
```js
// main.js文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locale/index'
import { Button, Select, Input, Form, FormItem, RadioGroup, RadioButton } from 'element-ui'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Select)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(RadioGroup)
Vue.use(RadioButton)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
```
配置好后，在页面的使用：
```html

<div class="home">
  <p>{{ $t('myFuture') }}</p>
</div>
```
在js文件里的使用：
```js
computed: {
  myactivity () {
    return this.$t('activity')
  }
}
```
<font color="gold">this.$i18n.locale</font>

通过<code>this.$i18n.locale</code>赋值'en'或'zh'，来改变是显示是'英文'或'中文'

可以把 this.$i18n.locale 的值存储在 store 和 cookie 中，这样全局也可以访问，并且页面刷新的时候也不会有问题。

<font color="gold">需要注意的问题：</font>

<code>有些惰性的组件</code>，在语言切换的时候不会随着 i18n.locale 的值变化而变化，比如一些 echarts 的图表，虽然语言环境变了，但是！！！echarts 不重新渲染，就无法使内容改变。

这里有几种办法可以选择：

1. 利用 watch 监听语言环境，当变化的时候手动调用 echarts 重新渲染

2. 利用 computed 属性，有些内容（如下拉列表里的值）可以放到 computed 计算属性中，这样也能解决问题

3. 通过 vue 的 this.reload ，在语言变化的时候直接刷新页面。

```js
import store from 'store'
export default {
	computed: {
		lang(){ return store,getters.lang }
	},
	watch:{
		lang(n, o){
			myCharts.resize()
		}
	}
}

```

参考：

[elementUI文档](https://element.eleme.cn/#/zh-CN/component/i18n)

[vue+elementUI+vue-i18n 实现国际化](https://blog.csdn.net/zhai_865327/article/details/101053658)
