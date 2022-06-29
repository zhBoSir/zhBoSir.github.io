---
title:  serverless学习与使用
date: 2022-05-22 13:12:02
categories:
  - Node
tags: 
  - serverless
---

serverless（即无服务），是后端的一种架构或者思想。

> ### 后端架构演进过程

从<code>物理时代</code>演进到<code>虚拟时代</code>

<!-- more -->

{% asset_img 1.png 物理机时代 %}

一个物理机可以分割成多个虚拟机

设备统一由云厂商管理，开发者不需要买硬件、不需要关心硬件、不需要关心服务器与运维，只需在云平台购买虚拟机，只需关心代码的业务逻辑。

{% asset_img 2.png 云厂商 %}

serverless特点：无运维、事件驱动、按量付费、弹性伸缩

> 组成

由Faas（函数即服务，可以认为是处理业务逻辑的计算服务。例如阿里云的函数计算、aws lambda、华为云的函数工作流、腾讯云的云函数）与 Baas（后端即服务，可以认为是搭配Faas使用的部分。例如：数据库硬盘挂载服务、API网关）结合，例子：用户通过http请求，要从数据库中取数据，那么此时计算平台所要做的事情就是执行数据库的查询命令和一些业务逻辑，而冲刺之外需要由API网关和云数据库等来作为支持。这样一看，执行业务逻辑就是Faas平台要做的，而API网关和云数据库所对应的就是Baas部分

> serverless的开发工具

Serverless Framework（国外）

Serverless Devs（国内）

其他相关：

{% asset_img 3.png serverful %}

{% asset_img 4.png 无服务架构 %}



