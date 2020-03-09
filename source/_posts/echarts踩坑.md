---
title: echarts踩坑
date: 2020-03-09 18:15:00
---

> ### 1.遇到的问题： 用element-ui的el-collapse手风琴效果，每一个折叠项里都有echarts图表，默认第一项展开，所以第一项的图表尺寸正常；点击其他项的时候，里面的<code>echarts图表被压缩了</code>。

<font color="gold">解析：</font>

+ 图表被压缩到很窄，可能是因为JSs执行太快，CSS来不及渲染，导致canvas只有默认的宽度，可以使用setTimeout()延迟加载JS。

+ 拿到数据后，图表需要resize()，每次调整后图表是重新绘制，图表尺寸才能正常渲染。  echart图表本身是提供了一个resize的函数的。于是当浏览器发生resize事件的时候，让其触发echart的resize事件，重绘canvas。

参考：

[h5做echarts图表Tab切换时图表被压缩或不显示的问题](https://blog.csdn.net/qq_42279109/article/details/83090534)

[VUE-切换tab时，echarts图表被压缩](https://blog.csdn.net/LzzMandy/article/details/89886749)

[Echarts出现图表被压缩到很窄的情况的解决方法](https://blog.csdn.net/wsln_123456/article/details/100016269)

[echarts使用技巧（一）echarts的图表自适应resize问题、单选、缩放等](https://www.cnblogs.com/goloving/p/9008165.html)




