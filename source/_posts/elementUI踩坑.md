---
title: elementUI踩坑
date: 2020-03-06 17:41:00
---

> ### 1.<code>el-collapse</code>里的项如果是v-for循环出来的，那么name的动态绑定和v-model='activeName'取值要注意
```js
<el-collapse v-model="activeName" accordion>
  <el-collapse-item :name="index" v-for="(item,index) in list">
    <div>展示内容区域</div>
  </el-collapse-item>
</el-collapse>

<script>
  export default {
    data() {
      return {
        activeName: 1
      };
    }
  }
</script>
```
<font color="gold">解析：</font>

因为name绑定的index值是索引，是数值类型，所以activeName的取值也要是<code>数值型</code>，不能是字符串。




