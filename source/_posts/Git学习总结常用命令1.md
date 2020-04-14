---
title: Git学习总结常用命令1
date: 2019-05-12 00:29:39

---

**常用的一些命令**

>vim编辑器===============================
- <code>mkdir</code>  创建文件夹  如：mkdir demo
- <code>ls</code> 列出当前文件夹下所有子文件 （但不包含隐藏的文件）
- <code>ls</code> -la 列出当前文件夹下所有子文件 ,包含隐藏的文件
- <code>ll</code> 查看当前文件夹下文件
- <code>vim</code> 文件名，打开文件，没有这个文件的话就创建这个文件。打开文件后，按“I”按钮，可以进入编辑状态。如：vim a.txt 然后就可以在命令行中编辑a.txt文件了
- <code>退出vim编辑模式</code>的操作：先按esc按钮推出插入状态，然后输入冒号:进入输入命令状态，输入wq，就保存并退出了。
- <code>git bash退出vim编辑模式的操作：</code>vim 文件名，打开文件，然后按<code>i</code>开始输入，输入完成后按<code>esc</code>退出编辑模式，然后按<code>shift+:</code>后输入<code>wq</code>即可。
- <code>cat 文件名</code> 用cat命令可以显示文件里面的内容

>提交和撤销===============================
- <code>git add 文件名</code> 把文件添加到暂存区，将工作区的新建/修改添加到暂存区 如：git add a.txt
- <code>git rm --cached 文件名</code> 把添加到暂存区的文件撤销回来。 如: git rm --cached a.txt
- <code>git status</code> 查看工作区（即写代码的地方）、暂存区的状态
- <code>git commit</code> 将暂存区的内容提交到本地库

>git配置用户名和邮箱===============================
- <code>git config user.name 用户名</code> 设置用户名
- <code>git config user.email 邮箱</code> 设置邮箱
- <code>git config --global user.name 用户名</code> 全局设置用户名
- <code>git config --global user.email 邮箱</code> 全局设置邮箱
- <code>git log</code> 查看所有的提交记录
- <code>git log --pretty=oneline 或 git log --oneline</code> 把所有的提交记录按每一条每一行显示出来
- <code>多屏显示控制方式</code> 1.空格向下翻页  2.b向上翻页 3.q退出 如：有时候显示的内容比较多，一页没有显示完，可以通过这3个方式来操作。
- <code>git reflog</code> 把提交记录按精简的方式展示出来。

>回滚到某一分支===============================
- <code>HEAD</code> git命令窗口里面的HEAD代表的是指针的意思。HEAD在哪里就指向哪条数据。
- <code>git reset --hard 某个提交记录的哈希值</code> 把git回退或者前进到具体的某个版本上。如：git reset --hard b8b2de0

>删除文件、比较文件===============================
- 从本地库删除文件的操作，第一步：<code>rm 文件名</code>，表示删除了工作区的文件；第二步：git add . ，删除了暂存区的这个文件；第三步： git commit -m '注释'，删除了本地库的这个文件。
- <code>git diff [文件名]</code>将工作区中的文件和暂存区的文件比较。
- <code>git diff [本地库中历史版本] [文件名]</code>将工作区中的文件和本地库历史记录的文件比较。
- <code>git diff</code>不带文件名的话是比较多个文件。

>分支===============================
- <code>git branch</code> 列出当前分支清单
- <code>git branch -a</code> 查看远程分支和本地分支
- <code>git branch -v</code> 查看各个分支最后一个提交信息
- <code>git branch [分支名]</code> 新建分支
- <code>git checkout [分支名]</code> 切换到具体的分支
- <code>合并分支的操作步骤：</code>
- 第一步：<code>git checkout [要合并其他分支上内容的分支]</code>切换到接受修改的分支上，比如：在dev分支上修改了内容，想把内容合并到master分支，目前在dev分支上，就需要先切换到master分支上。
- 第二步：<code>git merge [有新内容的分支名]</code> 执行merge命令。如：要把dev分支上的内容合并到master分支上，那么就是git merge dev

>切换分支
- <code>git checkout -b [本地创建分支名] origin/[远程分支名]</code>把分支切换到远程仓库新建的分支上，并在本地创建和远程分支对应的本地分支名

>新建分支、删除分支
- <code>git push --set-upstream origin [分支名]</code>新建远程分支 (也可以是把本地分支关联到这个远程分支上)
- <code>git branch -d [分支名]</code>删除分支
- <code>git push origin -d [分支名]</code>删除远程分支

>冲突===============================
- git merge合并的时候出现冲突时，看一下是哪个文件冲突了。然后用<code>vim 文件名</code>打开文件，把文件里面的由于冲突产生的特殊标记删除掉，Head表示的是当前分支的内容，然后把冲突的地方不需要的代码删除掉。再用<code>git add .</code>后再用<code>git commit </code>提交即可【注意这一步commit的时候是不能带文件名的】。

>远程分支=====================
- <code>git remote -v</code>查看远程分支
- <code>git remote add 远程分支别名 远程分支地址</code> 例如：git remote add origin https://github.com/zhBoSir/gittest.git

- <code>git push 远程分支别名 远程分支的名字 </code> 例：git push origin master
- <code><font color="red">有时候用github和别人一起开发项目，自己建的git库，别人clone后push代码没有权限，应该怎么操作？（团队内部协作）</font></code>
  - 第一步:点击GitHub仓库的【settings】
  - 第二步：点击【collaborators】即合作者的意思
  - 第三步：在【add collaborators输入框】里输入被邀请人的GitHub账号。
  - 第四步：点击【copy invite link】把里面的链接发送给被邀请的人。
  - 第五步：被邀请人只要接受邀请就有提交代码的权限了。
- <code>git pull [远程分支别名] [远程分支的名字]</code>拉取远程分支的内容。
- <code>git pull [远程分支别名] [远程分支的名字] = git fetch [远程分支别名] [远程分支的名字] + git merge</code>
  - 第一步：git fetch 是把远程分支的内容抓取过来，抓取过来后，本地文件并没有改变。
  - 第二步：git merge [远程分支别名/远程分支的名字] 是把远程分支上的内容合并到本地仓库上。
  
><font color="red">Github上怎么给别人提交代码？（跨团队协作）</font>
- 第一步：<code>fork</code>别人的远程仓库；
- 第二步：把fork的仓库<code>clone</code>到本地；
- 第三步：在clone下来的项目上修改代码然后；<code>push</code>到自己fork的自己的仓库；
- 第四步：给对方发送<code>pull request</code> 
点击<code>new request</code>再点击<code>create new request</code>
- 第五步：对方接受到pull request后会在pull request的地方显示一个数字，审核后<code>merge</code>一下即可（merge pull request）。

> 暂存

stash命令可以很好的解决这样的问题。当你不想提交当前完成了一半的代码，但是却不得不修改一个紧急Bug，那么使用<code>Git stash</code>就可以将你当前未提交到本地(和服务器)的代码推入到git的栈中，这时候你的工作区间和上一次提交的内容是完全一样的，所以你可以放心的修 Bug，等到修完Bug，提交到服务器上后，再使用<code>git stash apply</code>将以前一半的工作应用回来。

当你多次使用'git stash'命令后，你的栈里将充满了未提交的代码，这时候你会对将哪个版本应用回来有些困惑，<code>git stash list</code>命令可以将当前的Git栈信息打印出来，你只需要将找到对应的版本号，例如使用<code>git stash apply stash@{1}</code>就可以将你指定版本号为stash@{1}的工作取出来，当你将所有的栈都应用回来的时候，可以使用<code>git stash clear</code>来将栈清空

