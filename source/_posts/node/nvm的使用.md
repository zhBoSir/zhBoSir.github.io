---
title: nvm的使用
date: 2022-03-27 15:48:02
categories:
  - Node
tags: 
  - nvm
---

> ## 踩坑：

按照百度安装nvm的流程，nvm安装成功了，也用nvm install [node版本号]安装成功了node，但是在命令窗口输入node -v 一直显示找不到node

找了很久，得到的解决办法：

都是<code>电脑管理员权限</code>的问题导致的

第一步：要用管理员权限安装<code>nvm-setup.exe</code>

第二步：要在用管理员权限打开的命令窗口运行nvm命令

<font color="skyblue">怎么打开管理员权限的命令窗口：</font>

1.点击电脑左下方搜索按钮

2.在里面输入cmd，找到程序

3.鼠标右键用管理员打开

> ## 命令：

+ <code>nvm version</code> ：显示nvm版本。version可简化为v。

+ <code>nvm arch</code> ：显示node是运行在32位还是64位。

+ <code>nvm uninstall <version></code> ：卸载指定版本node。

+ <code>nvm use [version] [arch]</code> ：使用制定版本node。可指定32/64位。

+ <code>nvm root [path]</code> ：设置存储不同版本node的目录。如果未设置，默认使用当前目录。

+ <code>nvm node_mirror [url]</code> ：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。

+ <code>nvm npm_mirror [url]</code> ：设置npm镜像。默认是https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。

+ <code>nvm install <version> [arch]</code> ：安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过远程服务器的SSL。

+ <code>nvm list [available]</code> ：显示已安装的列表。可选参数available，显示可安装的所有版本。list可简化为ls。

### 参考：

[NVM安装nodejs的方法](https://www.cnblogs.com/hjson/p/10276532.html)

[强力解决使用node版本管理工具 NVM 出现的问题（找不到 node，或者找不到 npm）](https://www.cnblogs.com/CoderMonkie/p/resolve-no_npm-problem-in-nvm.html)

[一步步带你看nvm管理node版本后环境变量配置详情](https://blog.csdn.net/qq_35094120/article/details/119236849)



