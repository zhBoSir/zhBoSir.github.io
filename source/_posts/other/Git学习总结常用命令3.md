---
title: Git学习总结常用命令3
date: 2022-1-14 23:01:35
categories:
  - Git
tags:
  - Git
---

## 1. 创建分支
```bash
git branch 分支名
```

## 2. 使用命令解决冲突

当使用git merge 合并分支出现冲突时

a.使用vim打开冲突的文件，编辑冲突的文件到正确的文件

b.git add . 提交下

c.git commit -m '注释'


## 3. 查看远程分支
```bash
git remote -v
```

<!-- more -->

## 4. 给本地库添加远程仓库关联
```bash
git remote add origin 远程仓库地址  // origin是远程仓库的别名
```
远程仓库有两种地址形式：一种是<code>http</code>形式的；一种是<code>SSH</code>形式的。

上面是给http形式仓库地址添加origin别名，下面是SSH别名形式
```bash
git remote add origin_ssh [ssh远程仓库地址]

// 然后就可以 git push origin_ssh master推送代码了
```

## 5. 把本地代码推送到远程仓库中

```bash
git push origin master   // origin是远程仓库地址的别名；master是分支名
```

## 6. 拉取远程仓库的代码

```bash
git pull origin master  // origin是远程仓库地址的别名；master是分支名
```

## 7. git pull = git fetch + git merge
```bash
git fetch [远程库地址别名] [远程分支名]

git merge [远程库地址别名/远程分支名]
```

## 8. 跨团队协作的步骤

a. 其他团队先<code>fork</code>一份项目

b. 然后可以在fork的这个项目上git add 、git commit 、git push

c. 然后在fork的这个项目上，在类似github上发起<code>pull request</code>

d. 主团队在github上就能看到pull request ，只要审核，并且<code>merge pull request</code>

e. 最后主团队只要git pull origin master 拉取下代码就可以了。

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







