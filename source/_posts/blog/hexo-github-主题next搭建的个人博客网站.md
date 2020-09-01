---
title: hexo-github-主题next搭建的个人博客网站
date: 2019-01-10 13:47:07
categories:
  - 博客
tags:
  - 博客
---


> ###### 搭建自己博客网站时的几篇文章参考：
##### [1. https://www.cnblogs.com/visugar/p/6821777.html](https://www.cnblogs.com/visugar/p/6821777.html)
 hexo从零开始到搭建完成
##### [2. https://www.jianshu.com/p/f054333ac9e6](https://www.jianshu.com/p/f054333ac9e6)
这个地址内容很可以，许多内容都是按照文中来的
##### [3. http://www.cnblogs.com/study-everyday/p/8902136.html](http://www.cnblogs.com/study-everyday/p/8902136.html)
换了电脑如何使用hexo继续写博客
##### [4. https://www.jianshu.com/p/0b1fccce74e0](https://www.jianshu.com/p/0b1fccce74e0)
利用Hexo在多台电脑上提交和更新github pages博客

##### 5.报没有hexo命令，试着npm istall hexo-cli -g

> ###### 相关文档：
> ###### Hexo生成博客的源码目录解释 :

文件名 | 说明
:------: | :------:
_config.yml | 配置文件
public	| 生成的静态文件，这个目录最终会发布到服务器
scaffolds | 一些通用的markdown模板
source	| 编写的markdown文件，_drafts草稿文件，_posts发布的文章
themes	| 博客的模板

> ###### 常用的命令

+ **hexo clean** (清理缓存)
+ **hexo g** (g即generate,生成静态网页)
+ **hexo s** (s即server,启动服务器，生成本地可以访问的url)
+ **hexo d** (d即deploy,上传部署命令,上传是只会上传public中生成的文件)
+ <code>hexo d -g</code> (把git分支的修改部署到github的master分支上)

6.博客<code>分类</code>与分<code>标签</code>

<1> 新建一个分类页面
```
hexo new page categories
```

<2> 打开categories/index.md，改为：
```
title: 分类
date: 2020-08-31 16:48:37
type: "categories"
comments: false
```

<3> 然后在每篇博客的头部添加
```
categories:
  - 博客
tags:
  - 博客
```

7.hexo让博客能插入图片

<1> 修改<code>_config.yml</code>配置文件<code>post_asset_folder</code>项为<code>true</code>。

<2> 建一个和博客名字一样的文件夹，把图片放到这个文件夹里。

<3> 在文章里使用：
```
{% asset_img 1.jpg 图片的信息 %}

{% asset_img foo.jpg 500 400 %}  // 可以控制图片的大小
```

参考：

[hexo搭建的博客如何给文章分类（next主题）](https://segmentfault.com/q/1010000009361385)

[Hexo的Next主题详细配置](https://www.jianshu.com/p/3a05351a37dc)

[Hexo发布博客引用自带图片的方法](https://www.jianshu.com/p/cf0628478a4e)

[Hexo官网](https://hexo.io/zh-cn/docs/)

[Next官网](http://theme-next.iissnan.com/)
