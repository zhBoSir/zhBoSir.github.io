---
title: gitee与hexo搭建博客踩坑
date: 2020-04-23 13:46:57
categories:
  - 博客
tags:
  - 博客
---

gitee搭建个人博客其实和github搭建博客大同小异，只是代码提交到gitee上后，使用【服务】里的【gitee pages】部署线上博客

<!-- more -->

> 踩坑1：icarus主题

搭建的博客使用的是icarus主题，icarus主题git clone下来放到themes文件夹下后，需要在blog（我的博客是blog，视具体情况订）根目录下npm install 安装下，然后icarus主题里要创建一个_config.yml文件，一般会根据git bash的提示会自动创建这个文件。这样主题就搞定了。

> 踩坑2：部署到远程上后css、js等文件没有加载

+ 没有加载的原因是根目录下的_config.yml文件里url 和 root 配置的值没配正确，url是放域名，root是放根目录。

+ 如果样式还是不正确的话，注意右击网站审查源代码，看是否引用的css文件是放在cnd远程服务器上的。

> 踩坑3：在博客.md文件里，插入本地图片不能显示

问题描述：

+ 在文章里面插入图片，最后hexo g的时候总会在图片前面插一个.io
```
update link as:-->/.io//06/01/vim/1561905818946.png
update link as:-->/.io//06/01/vim/1561905818946.png
```
博客文章里是这样写的：
```
{% asset_img 16.png 图片名称 %}
```
找出原因是：应该是hexo-asset-image这个插件的bug,hexo版本3.0以上获取网站url的方式与3.0以下有些不同。

解决办法：

第一种方案：[hexo引用本地图片无法显示](https://blog.csdn.net/xjm850552586/article/details/84101345)

第二种方案：[hexo使用markdown图片无法显示问题](https://www.jianshu.com/p/3db6a61d3782)

我使用的是第二种方案：直接安装已经修改过得插件
```bash
npm install https://github.com/7ym0n/hexo-asset-image --save
```

> 踩坑4：icarus主题在首页只显示摘要

本主题里要显示摘要，只需在文章哪块要显示为摘要处添加：
```
<!-- more -->
```
此问题的参考：

[Hexo博客首页自动添加Read More标记-不在首页显示全部文章全部内容](https://blog.csdn.net/itguangzhi/article/details/79510044)

[Hexo之next主题设置首页不显示全文(只显示预览)](https://www.jianshu.com/p/393d067dba8d)

> 踩坑5：_config.yml文件里url 和 root 配置

_config.yml文件里url 和 root 配置是按提示
```
If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
```
这样配置的，但是部署到gitee pages服务器上后，不能显示。所以改为这样的配置
```
url: http://yoursite.com/child
root: /
```
首页可以显示，but点击每篇博客，进入详情页面时不能显示，看了一下url，是因为缺了/blog根目录。

<font color="gold">解决方案：</font>
```
例子:

若用户名为qiaofeng
那么 就可以获得一个免费的个人线上地址qiaofeng.gitee.io

若 新建项目的时候，项目名如果是blog
那么 访问地址就是https://qiaofeng.gitee.io/blog/

若项目名与用户名相同也叫qiaofeng
那么 可以直接访问二级域名访问 https://qiaofeng.gitee.io 而省略项目名
```
根据百度上搜到的方案，自己也把搭建博客园的gitee远程库改成了zhbosir，之前是blog。这样就解决了上面出现的问题。


此坑参考：

[入门hexo ! 搭配next、GiteePages，轻松免费开发高质量个人博客](https://blog.csdn.net/weixin_33672400/article/details/88665412)





参考：

[通过gitee和hexo搭建个人博客](https://www.cnblogs.com/somata/p/GiteeAndHexoBuildPersonalBlog.html)

[Hexo博客无法显示样式和图片的问题](https://blog.csdn.net/wu_xianqiang/article/details/90899395)

[hexo图片路径问题](https://segmentfault.com/q/1010000019625231/a-1020000019625326)

[hexo使用markdown图片无法显示问题](https://www.jianshu.com/p/3db6a61d3782)

[hexo引用本地图片无法显示](https://blog.csdn.net/xjm850552586/article/details/84101345)
