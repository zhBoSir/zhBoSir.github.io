---
title: Git学习总结
date: 2019-05-12 00:29:39

---

**常用的一些命令**

<code>===============================</code>
- <code>mkdir</code>  创建文件夹  如：mkdir demo
- <code>ls</code> 列出当前文件夹下所有子文件 （但不包含隐藏的文件）
- <code>ls</code> -la 列出当前文件夹下所有子文件 ,包含隐藏的文件
- <code>ll</code> 查看当前文件夹下文件
- <code>vim</code> 文件名，打开文件，没有这个文件的话就创建这个文件。打开文件后，按“I”按钮，可以进入编辑状态。如：vim a.txt 然后就可以在命令行中编辑a.txt文件了
- <code>退出vim编辑模式</code>的操作：先按esc按钮推出插入状态，然后输入冒号:进入输入命令状态，输入wq，就保存并退出了。

<code>===============================</code>
- <code>git add 文件名</code> 把文件添加到暂存区，将工作区的新建/修改添加到暂存区 如：git add a.txt
- <code>git rm --cached 文件名</code> 把添加到暂存区的文件撤销回来。 如: git rm --cached a.txt
- <code>cat 文件名</code> 用cat命令可以显示文件里面的内容
- <code>git status</code> 查看工作区（即写代码的地方）、暂存区的状态
- <code>git commit</code> 将暂存区的内容提交到本地库

<code>===============================</code>
- <code>git config user.name 用户名</code> 设置用户名
- <code>git config user.email 邮箱</code> 设置邮箱
- <code>git config --global user.name 用户名</code> 全局设置用户名
- <code>git config --global user.email 邮箱</code> 全局设置邮箱
- <code>git log</code> 查看所有的提交记录
- <code>git log --pretty=oneline 或 git log --oneline</code> 把所有的提交记录按每一条每一行显示出来
- <code>多屏显示控制方式</code> 1.空格向下翻页  2.b向上翻页 3.q退出 如：有时候显示的内容比较多，一页没有显示完，可以通过这3个方式来操作。
- <code>git reflog</code> 把提交记录按精简的方式展示出来。

<code>===============================</code>
- <code>HEAD</code> git命令窗口里面的HEAD代表的是指针的意思。HEAD在哪里就指向哪条数据。
- <code>git reset --hard 某个提交记录的哈希值</code> 把git回退或者前进到具体的某个版本上。如：git reset --hard b8b2de0

<code>===============================</code>
- 从本地库删除文件的操作，第一步：<code>rm 文件名</code>，表示删除了工作区的文件；第二步：git add . ，删除了暂存区的这个文件；第三步： git commit -m '注释'，删除了本地库的这个文件。
- <code>git diff [文件名]</code>将工作区中的文件和暂存区的文件比较。
- <code>git diff [本地库中历史版本] [文件名]</code>将工作区中的文件和本地库历史记录的文件比较。
- <code>git diff</code>不带文件名的话是比较多个文件。

