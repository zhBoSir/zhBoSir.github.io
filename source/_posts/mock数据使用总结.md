---
title: mock数据使用总结
date: 2019-07-02 15:59:39
---

### 常用mock语法：
> <code>@county(true)</code>生成一个省市区地址
```
Random.county(true)  // "辽宁省 朝阳市 凌源市"
Mock.mock('@county(true)')  // "陕西省 渭南市 大荔县"

// 使用例子：
"address": "@county(true)"

```

> <code>@id</code>随机生成一个 18 位身份证。
```
// 使用例子：
"Id": "@id"  // "650000198707045825"
```

> <code>@date("yyyy-MM-dd")</code>返回一个随机的日期字符串。参数 format：可选。指示生成的日期字符串的格式。默认值为 yyyy-MM-dd。
```
Random.date('yyyy-MM-dd')  // "2001-10-20"
Mock.mock('@date("yyyy-MM-dd")')  // "2014-02-11"

// 使用例子：
"startTime": "@date("yyyy-MM-dd")"

```

> 从数组中选择一条数据
```
"myarray|1": [
    "AMD",
    "CMD",
    "UMD"
  ]

// "myarray": "AMD"
```

> <code>@cname</code>随机生成一个中文名字
```
// 使用例子：
"custName": "@cname"  // "张三"
```

参考：

[mock数据example](http://mockjs.com/examples.html)

[mockjs官网](http://mockjs.com/0.1/)
