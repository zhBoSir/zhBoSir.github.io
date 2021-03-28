---
title: vue中ts的知识点
date: 2021-03-27 22:15:02
categories:
  - Vue
tags:
  - Vue
---

> ## 1.vue中的ts类型推断
```js
// vue2中的ts类型推断写法
import Vue from 'vue'

export default Vue.extend({

})
```

```js
// vue3中的ts类型推断写法
import Vue from 'vue'

export default defineComponent({

})
// 使用 defineComponent 能够让传入的对象获得类型以及能够获得自动提示
```

<!-- more -->

