---
title: Git学习总结常用命令4
date: 2022-1-10 21:42:35
categories:
  - Git
tags:
  - Git
---

## 1. 显示当前控制台命令窗口所在的目录
```bash
pwd
```

## 2. 新建一个文件。如：touch aa.js
```bash
touch 文件名
```

## 3. 删除一个文件。如：rm aa.js
```bash
rm 文件名
```

<!-- more -->

## 4. 新建一个文件夹。
```bash
mkdir 文件夹名
```
## 5. 删除一个文件夹。如：rm -r aa 删除aa文件夹

```bash
rm -r 文件夹名
```

## 6. <font color="red">rm -rf 文件夹名</font>: 切勿在Linux中尝试删除，因为会递归删除所有文件

## 7. 查看命令窗口中使用过的所有命令
```bash
history
```

## 8. 列出所有的远程分支

```bash
git branch -r
```
## 9. <code>git branch -d [branch-name]</code>: 删除分支
```bash
rm -r 文件夹名
```

## 10. 删除远程分支
```bash
git push origin --delete [branch-name]

git branch -dr [remote/branch]
```

<hr  color="pink" style="margin: 80px 0 15px;"/>
<div style="color: gold;font-weight: bold;text-align: center;font-size: 28px;">让眼睛休息一下</div>
<hr  color="pink" style="margin: 15px 0 80px;"/>

## 11. 合并指定分支到当前分支
```bash
git merge [branch]
```

## 12. （配置用户名和邮箱）项目级别/仓库级别：仅在当前本地库范围内有效

```bash
git config user.name zhangsan

git config user.email 12345678@qq.com
```

## 13. （配置用户名和邮箱）系统用户级别：登录当前操作系统

```bash
git config --global user.name zhangsan

git config --global user.email 12345678@qq.com
```

## <font color="skyblue">项目级别优先于系统用户级别</font>

## 14. 把git日志显示成一行，方便查看。

```bash
git log --pretty=oneline
```

## 15. 查看日志除了git log还有另外一种

```bash
git reflog
```

## 16. 回到具体那个索引号版本

```bash
git reset --hard 索引号    // 这里的索引号是git reflog出来的索引号
```

## 17. 日志太多，分屏显示，翻页的命令

```bash
空格     // 向下翻页
b键      // 向上翻页
```

## 18. 在命令控制台编辑文件

```bash
vim 文件名
```
退出vim编辑状态命令：
```bash
按esc键 + ：键 + 输入wq  + 回车键
```

## 19. 比较提交差异

```bash
git diff  // 比较当前与上一个版本的差异

git diff 文件名  // 比较某一个文件版本的差异
```

## 20. 紧急bug上线分支命名: <code>hot_fix</code>

<hr  color="pink" style="margin: 80px 0 15px;"/>
<div style="color: gold;font-weight: bold;text-align: center;font-size: 28px;">你离大神又近了一步</div>
<hr  color="pink" style="margin: 15px 0 80px;"/>







