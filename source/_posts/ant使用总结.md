---
title: ant design pro vue使用总结
categories:
  - Vue
abbrlink: 6d3071aa
date: 2020-05-26 15:32:02
tags:
---

### form组件报警告的问题

warning信息：
```
You cannot set a form field before rendering a field associated with the value.

意思就是：你不能在页面未渲染之前就进行form表单的相关信息的设置。
```

产生的原因：

使用了表单的方法setFieldsValue()，来设置每个控件的值，但是setFieldsValue(object)，传入的值为object，传入的值没有和表单的值一一对应，能少传不能多传。

<!-- more -->

举例：加入form表单只需要id,name,age三个值，你却传了id,name,age,gender,title等值，那么就会报警告。

解决办法：

第一种方法：
```js
this.$nextTick(()=>{
  this.form.setFieldsValue({ 
    name: 'zhangwan',
    age: '18' 
  })
})
```
第一种方法适用于字段较少的情况下。这里使用this.$nextTick()方法，是因为vue操作dom是异步的，更新了数据不能及时更新到页面，所以使用this.$nextTick()方法。

第二种方法：
```js
import _ from 'lodash'

// ==================
// 这里是lodash的pick的文档及例子:
// _.pick(object, [props])
// 创建一个从 object 中选中的属性的对象。

var object = { 'name': 'zhangwan', 'age': 18, 'gender': 'man' }

_.pick(object, ['name', 'age'])

// => { 'name': 'zhangwan', 'age': 18 }

// ==================

this.$nextTick(()=>{
  this.form.setFieldsValue(_.pick(object, ['name', 'age']))
})
```
第二种方法是借用lodash的pick方法，拿到指定的属性组成的对象。

<font color="red">
需要注意：

Object.assign(formObj, _.pick(this.editFormObj, ['rpd001', 'rpd002', 'rpd003', 'rpd004', 'rpd005', 'rpd006', 'rpd007', 'rpd008', 'rpd009', 'rpd010', 'rpd012']))

<a-input
  v-decorator="['rpd002']"
  placeholder="请输入标题"
  allow-clear
/>

_.pick数组里的字段必须与v-decorator="['rpd002']"的字段对应。_.pick数组里的字段不要多，也不要少，不然都会报警告
</font>

如果还报同样的警告的话，加个setTimeout试试：
```js
this.$nextTick(() => {
  setTimeout(() => {
    this.form.setFieldsValue(_.pick(object, ['name', 'age']))
  }, 0)
})
```

参考：

[[Antd-vue] Warning: You cannot set a form field before rendering a field associated with the value.](https://www.cnblogs.com/cirry/p/12483131.html)

### a-checkbox组件的change事件传自定义参数

例子：
```js
 <a-checkbox 
 :checked="formData.rsa003 === 'Y'"
 v-decorator="['rsa003', rule.buyList]"
 @change="value => handleChange(value, 'rsa003')">启用请购单否1</a-checkbox>


<a-checkbox 
 :checked="formData.rsa004 === 'Y'"
 v-decorator="['rsa004', rule.buyList]"
 @change="value => handleChange(value, 'rsa004')">启用请购单否2</a-checkbox>

// 方法

handleChange (e, prop) {
  this.formData[prop] = e.target.checked ? 'Y' : 'N'
}
                
```

<code>解析：</code>

a-checkbox组件的change事件如果不传自定义参数的话，直接写@change="handleChange",然后方法里handleChange(e){e.target.checked}就可以使用。

但如果想要传自定义参数，比如上面的例子，相传‘rsa003’，‘rsa004’，就得这样写了
```
@change="value => handleChange(value, 'rsa004')"
```
<code>value就是默认的e</code>

然后方法里这样使用：
```js
handleChange (e, prop) {
  this.formData[prop] = e.target.checked ? 'Y' : 'N'
}
```

### date-picker日历组件使用，日期相互转换

时间戳转日期字符串：
```
moment(new Date(time)).format('YYYY-MM-DD')
```
时间戳转日期moment对象
```
moment(new Date(text), 'YYYY-MM-DD')
```


