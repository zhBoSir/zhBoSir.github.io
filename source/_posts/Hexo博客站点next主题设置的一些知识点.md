---
title: Hexo博客站点next主题设置的一些知识点
date: 2019-01-10 17:02:38
tags:
---

###### 参考文章：
2018最新版Hexo博客Next主题6.0配置优化
[https://blog.csdn.net/qq_32454537/article/details/79482896](https://blog.csdn.net/qq_32454537/article/details/79482896)

[next主题官网](http://theme-next.iissnan.com/)

> **1.next主题下有4种Scheme外观**

Scheme的切换是通过更改<code>主题</code>配置文件（即next主题文件夹下_config.yml），搜索 scheme 关键字， 你会看到有四行 scheme 的配置，将你需用启用的 scheme 前面注释 # 去除即可。
> **2.动态背景设置**

打开主题下面的配置文件_config.yml，搜索下面的配置
Canvas-nest
three_waves
canvas_lines
canvas_sphere
直接设置里把需要的动态背景改为true。
> **3.侧边栏社交小图标设置**

打开主题配置文件_config.yml，搜索<code>social:</code>,后面有注释的例子，可以按着格式写自己的。
```html
social:
  GitHub: https://github.com/zhBoSir || github
  前端网: https://www.qdfuns.com/u/23906/works/articles || angellist
  #E-Mail: mailto:yourname@gmail.com || envelope
  #Google: https://plus.google.com/yourname || google
  #Twitter: https://twitter.com/yourname || twitter
```
第一个是写社交的名字，第二个是写社交的链接地址，第三个即<code>||</code>之后是社交对应的图标。在图标库（[http://fontawesome.io/icons/](http://fontawesome.io/icons/)）中可以找到对应的图标。注意空格就行。 
> **4.主页文章加阴影**

具体实现方法 
打开<code>\themes\next\source\css\_custom\custom.styl</code>,向里面加入：
```
// 主页文章添加阴影效果
// Custom styles.
.post {
	margin-top: 60px;
	margin-bottom: 60px;
	padding: 25px;
	-webkit-box-shadow: 0 0 10px rgba(255,215,0,.5);
	-ms-box-shadow: 0 0 10px rgba(255,215,0,.5);
	-moz-box-shadow: 0 0 10px rgba(255,215,0,.5);
	box-shadow: 0 0 10px rgba(255,215,0,.5);
}
```
要改博客站点的标题、字体颜色、背景颜色，也可以把F12审查元素得来的样式修改加入即可。