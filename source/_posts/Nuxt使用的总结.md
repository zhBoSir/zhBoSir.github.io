---
title: Nuxt使用的总结
date: 2019-12-04 17:05:00
---

>以下笔记拷在网上，不是自己总结的。

公司项目需要用到nuxt.js的服务端渲染，所以使用了nuxt.js官方的脚手架搭建了项目，在这儿记录一些搭建过程中踩过的坑。

IE9的适配问题
IE9是一个老大难的问题，因为它不支持ES6的语法，而且ie9也不知路由中的history模式，所以我在这儿暂时的解决办法如下。

```
// nuxt.config.js 
  /*
   ** Global router middleware
   */
  router: {
    mode: 'history',
    middleware: 'global',
    fallback: true 
  }
```
先在设置一下fallback，具体不知道为什么看文档，最重要的是设置babel-polyfill。
```
yarn add babel-polyfill --dev

// plugin 下 新建babel-polyfill文档下的index.js
import 'babel-polyfill'

// nuxt.config.js
  plugins: [
    { src: '@/plugins/babel-polyfill', ssr: true } // 将es6转换为es5 兼容ie9
  ],
  
// 在文档根目录下新建 .babelrc 文件
{
  "presets": [
    [
      "env",
      {
        "modules": false,
        "useBuiltIns": "entry"
      }
    ],
    "stage-3"
  ]
}
```
至此，项目就能在ie9上运行起来了，可能开发中还会有问题，到时候会进行补充。

全局样式变量的引入和全局样式的引入
因为开发时项目使用的css预编译器是scss，所以注册全局的样式变量如下。

先安装scss预编译器
```
npm i node-sass sass-loader scss-loader --save-dev

// nuxt.config.js 中配置 styleResources
  css: [
    {
      src: '~/assets/styles/index.scss',
      lang: 'scss'
    }
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  build: {
    transpile: [/^element-ui/],
    styleResources: {
      scss: './assets/styles/variable/index.scss'
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
```
Vue 全局注入函数和属性值
有时您希望在整个应用程序中使用某个函数或属性值，此时，你需要将它们注入到Vue实例（客户端），context（服务器端）甚至 store(Vuex)。按照惯例，新增的属性或方法名使用	$ 作为前缀。

其实这个官方文档有，但是我还是再写一遍加深一遍记忆。

比如说我想全局使用我定义的接口路径。
```
// urls -> index.js (PS:一定要写在plugins文件目录下)

import Vue from 'vue'
import dev from './dev'
import prod from './prod'
// 判断是生产环境还是开发环境
const env = process.env.NODE_ENV
const serverIp = env === 'production' ? prod.prodIp : dev.devIp
const interfacePORT =
  env === 'production'
    ? `${prod.prodInterfacePort}${
        prod.prodName === '' ? '' : '/' + prod.prodName
      }`
    : `${dev.devInterfacePort}${dev.devName === '' ? '' : '/' + dev.devName}`

const serverUrl = 'http://' + serverIp + '/'
const interfaceUrl = 'http://' + serverIp + ':' + interfacePORT + '/'

// 同时注入context 和 Vue中，在Vue中会自动加上在前面加上$ 
export default ({ app }, inject) => {
  inject('serverUrl', serverUrl)
  inject('interfaceUrl', interfaceUrl)
}

// nuxt.config.js
  plugins: [
    { src: '@/config/url', ssr: false }, // 接口地址的全局引入
  ],
```
然后就可以在项目中全局引入
```
export default {
  mounted(){
    console.log(this.$interfaceUrl)
  }
  asyncData(context){
    console.log(context.app.$interfaceUrl)
  }
}
```

参考：

[Nuxt.js项目搭建配置踩坑](https://www.codercto.com/a/89756.html)

