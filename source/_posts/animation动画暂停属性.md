---
title: animation-play-state 属性
date: 2019-12-02 23:07:00
---

<code>animation-play-state</code>属性规定动画正在运行还是暂停。

<font color="lightblue">注释：您可以在 JavaScript 中使用该属性，这样就能在播放过程中暂停动画。</font>

animation-play-state: paused | running(默认值)。

### Demo:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        .box {
            width: 200px;
            height: 200px;
            background-color: gold;
            border-radius: 50%;
            font-size: 88px;
            color: pink;
            text-align: center;
            line-height: 200px;
            border: 1px solid #000;
            animation: rotateAnima 3s linear 0s infinite;
        }

        @keyframes rotateAnima {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        .box:hover {
            animation-play-state: paused;
            -webkit-animation-play-state: paused;
        }
    </style>
</head>  
<body>
  <div class="box">5</div>
</body>

</html>

```

