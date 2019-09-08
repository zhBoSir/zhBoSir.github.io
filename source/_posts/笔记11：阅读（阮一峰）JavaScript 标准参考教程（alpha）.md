---
title: 笔记11：阅读（阮一峰）JavaScript 标准参考教程（alpha）
date: 2019-08-19 22:47:10
---

**151.** script 元素   工作原理

浏览器加载 JavaScript 脚本，主要通过&lt;script&gt;元素完成。正常的网页加载流程是这样的。

浏览器一边下载 HTML 网页，一边开始解析。也就是说，不等到下载完，就开始解析。
解析过程中，浏览器发现&lt;script&gt;元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
如果&lt;script&gt;元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。
JavaScript 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。
加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后，再继续渲染。原因是 JavaScript 代码可以修改 DOM，所以必须把控制权让给它，否则会导致复杂的线程竞赛的问题。

如果外部脚本加载时间很长（一直无法完成下载），那么浏览器就会一直等待脚本下载完成，造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。

为了避免这种情况，较好的做法是将&lt;script&gt;标签都放在页面底部，而不是头部。这样即使遇到脚本失去响应，网页主体的渲染也已经完成了，用户至少可以看到内容，而不是面对一张空白的页面。如果某些脚本代码非常重要，一定要放在页面头部的话，最好直接将代码写入页面，而不是连接外部脚本文件，这样能缩短加载时间。

脚本文件都放在网页尾部加载，还有一个好处。因为在 DOM 结构生成之前就调用 DOM 节点，JavaScript 会报错，如果脚本都在网页尾部加载，就不存在这个问题，因为这时 DOM 肯定已经生成了。

一种解决方法是设定DOMContentLoaded事件的回调函数。
```
<head>
  <script>
    document.addEventListener(
      'DOMContentLoaded',
      function (event) {
        console.log(document.body.innerHTML);
      }
    );
  </script>
</head>
```

另一种解决方法是，使用&lt;script&gt;标签的onload属性。当&lt;script&gt;标签指定的外部脚本文件下载和解析完成，会触发一个load事件，可以把所需执行的代码，放在这个事件的回调函数里面。

**152.** defer 属性
为了解决脚本文件下载阻塞网页渲染的问题，一个方法是对&lt;script&gt;元素加入defer属性。它的作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本。
```
<script src="a.js" defer></script>
<script src="b.js" defer></script>
```
上面代码中，只有等到 DOM 加载完成后，才会执行a.js和b.js。

defer属性的运行流程如下。

浏览器开始解析 HTML 网页。
解析过程中，发现带有defer属性的&lt;script&gt;元素。
浏览器继续往下解析 HTML 网页，同时并行下载&lt;script&gt;元素加载的外部脚本。
浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本。
有了defer属性，浏览器下载脚本文件的时候，不会阻塞页面渲染。下载的脚本文件在DOMContentLoaded事件触发前执行（即刚刚读取完&lt;/html&gt;标签），而且可以保证执行顺序就是它们在页面上出现的顺序。

对于内置而不是加载外部脚本的script标签，以及动态生成的script标签，defer属性不起作用。另外，使用defer加载的外部脚本不应该使用document.write方法。

**153.** async 属性
解决“阻塞效应”的另一个方法是对&lt;script&gt;元素加入async属性。
```
<script src="a.js" async></script>
<script src="b.js" async></script>
```
async属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。

浏览器开始解析 HTML 网页。
解析过程中，发现带有async属性的script标签。
浏览器继续往下解析 HTML 网页，同时并行下载&lt;script&gt;标签中的外部脚本。
脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
脚本执行完毕，浏览器恢复解析 HTML 网页。
async属性可以保证脚本下载的同时，浏览器继续渲染。需要注意的是，一旦采用这个属性，就无法保证脚本的执行顺序。哪个脚本先下载结束，就先执行那个脚本。

**154.** 脚本的动态加载
&lt;script&gt;元素还可以动态生成，生成后再插入页面，从而实现脚本的动态加载。
```
['a.js', 'b.js'].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
});
```
这种方法的好处是，动态生成的script标签不会阻塞页面渲染，也就不会造成浏览器假死。但是问题在于，这种方法无法保证脚本的执行顺序，哪个脚本文件先下载完成，就先执行哪个。

**155.** example.js如果要采用 HTTPS 协议下载，必需写明。默认不写的都是采用http协议。
```
<script src="https://example.js"></script>
```
但是有时我们会希望，根据页面本身的协议来决定加载协议，这时可以采用下面的写法。
```
<script src="//example.js"></script>
```

**156.** 浏览器的组成

浏览器的核心是两部分：渲染引擎和 JavaScript 解释器（又称 JavaScript 引擎）。

不同的浏览器有不同的渲染引擎。
```
Firefox：Gecko 引擎
Safari：WebKit 引擎
Chrome：Blink 引擎
IE: Trident 引擎
Edge: EdgeHTML 引擎
```
渲染引擎处理网页，通常分成四个阶段。

1. 解析代码：HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）。
2. 对象合成：将 DOM 和 CSSOM 合成一棵渲染树（render tree）。
3. 布局：计算出渲染树的布局（layout）。
4. 绘制：将渲染树绘制到屏幕。

以上四步并非严格按顺序执行，往往第一步还没完成，第二步和第三步就已经开始了。所以，会看到这种情况：网页的 HTML 代码还没下载完，但浏览器已经显示出内容了。

**157.** 使用window.requestAnimationFrame()，因为它可以把代码推迟到下一次重流时执行，而不是立即要求页面重流。

下面是一个window.requestAnimationFrame()对比效果的例子。
```
// 重绘代价高
function doubleHeight(element) {
  var currentHeight = element.clientHeight;
  element.style.height = (currentHeight * 2) + 'px';
}

all_my_elements.forEach(doubleHeight);

// 重绘代价低
function doubleHeight(element) {
  var currentHeight = element.clientHeight;

  window.requestAnimationFrame(function () {
    element.style.height = (currentHeight * 2) + 'px';
  });
}

all_my_elements.forEach(doubleHeight);
```
上面的第一段代码，每读一次 DOM，就写入新的值，会造成不停的重排和重流。第二段代码把所有的写操作，都累积在一起，从而 DOM 代码变动的代价就最小化了。

<hr/>

window.requestAnimationFrame()方法跟setTimeout类似，都是推迟某个函数的执行。不同之处在于，setTimeout必须指定推迟的时间，window.requestAnimationFrame()则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 16ms 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台 Tab 页时，requestAnimationFrame()会暂停执行。

<hr/>
下面是一个window.requestAnimationFrame()执行网页动画的例子。

```
var element = document.getElementById('animate');
element.style.position = 'absolute';

var start = null;

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  // 元素不断向左移，最大不超过200像素
  element.style.left = Math.min(progress / 10, 200) + 'px';
  // 如果距离第一次执行不超过 2000 毫秒，
  // 就继续执行动画
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```
上面代码定义了一个网页动画，持续时间是2秒，会让元素向右移动。

**158.** JavaScript 是一种解释型语言，也就是说，它不需要编译，由解释器实时运行。

**159.** 由于<code>window.open()</code>这个方法很容易被滥用，许多浏览器默认都不允许脚本自动新建窗口。只允许在用户点击链接或按钮时，脚本做出反应，弹出新窗口。因此，有必要检查一下打开新窗口是否成功。
```
var popup = window.open();
if (popup === null) {
  // 新建窗口失败
}
```

<code>window.close()</code>

window.close方法用于关闭当前窗口，一般只用来关闭window.open方法新建的窗口。

popup.close()
该方法只对顶层窗口有效，iframe框架之中的窗口使用该方法无效。

**160.** window.scrollBy()方法用于将网页滚动指定距离（单位像素）。它接受两个参数：水平向右滚动的像素，垂直向下滚动的像素。
```
window.scrollBy(0, window.innerHeight)
```
上面代码用于将网页向下滚动一屏。

**161.** iframe 元素

对于iframe嵌入的窗口，document.getElementById方法可以拿到该窗口的 DOM 节点，然后使用contentWindow属性获得iframe节点包含的window对象。
```
var frame = document.getElementById('theFrame');
var frameWindow = frame.contentWindow;
```
上面代码中，frame.contentWindow可以拿到子窗口的window对象。然后，在满足同源限制的情况下，可以读取子窗口内部的属性。
```
// 获取子窗口的标题
frameWindow.title
&lt;iframe&gt;元素的contentDocument属性，可以拿到子窗口的document对象。

var frame = document.getElementById('theFrame');
var frameDoc = frame.contentDocument;

// 等同于
var frameDoc = frame.contentWindow.document;
```
&lt;iframe&gt;元素遵守同源政策，只有当父窗口与子窗口在同一个域时，两者之间才可以用脚本通信，否则只有使用window.postMessage方法。

&lt;iframe&gt;窗口内部，使用window.parent引用父窗口。如果当前页面没有父窗口，则window.parent属性返回自身。因此，可以通过window.parent是否等于window.self，判断当前窗口是否为iframe窗口。
```
if (window.parent !== window.self) {
  // 当前窗口是子窗口
}
```

**162.** Screen 对象

Screen.orientation：返回一个对象，表示屏幕的方向。该对象的type属性是一个字符串，表示屏幕的具体方向，landscape-primary表示横放，landscape-secondary表示颠倒的横放，portrait-primary表示竖放，portrait-secondary。

下面的例子保证屏幕分辨率大于 1024 x 768。
```
if (window.screen.width >= 1024 && window.screen.height >= 768) {
  // 分辨率不低于 1024x768
}
```

下面是根据屏幕的宽度，将用户导向不同网页的代码。
```
if ((screen.width <= 800) && (screen.height <= 600)) {
  window.location.replace('small.html');
} else {
  window.location.replace('wide.html');
}
```

**163.**
## Cookie概述
Cookie 是服务器保存在浏览器的一小段文本信息，每个 Cookie 的大小一般不能超过4KB。浏览器每次向服务器发出请求，就会自动附上这段信息。

Cookie 主要用来分辨两个请求是否来自同一个浏览器，以及用来保存一些状态信息。它的常用场合有以下一些。

对话（session）管理：保存登录、购物车等需要记录的信息。
个性化：保存用户的偏好，比如网页的字体大小、背景色等等。
追踪：记录和分析用户行为。
有些开发者使用 Cookie 作为客户端储存。这样做虽然可行，但是并不推荐，因为 Cookie 的设计目标并不是这个，它的容量很小（4KB），缺乏数据操作接口，而且会影响性能。客户端储存应该使用 Web storage API 和 IndexedDB。

Cookie 包含以下几方面的信息。

- Cookie 的名字
- Cookie 的值（真正的数据写在这里面）
- 到期时间
- 所属域名（默认是当前域名）
- 生效的路径（默认是当前网址）

## HTTP 请求：Cookie 的发送
浏览器向服务器发送 HTTP 请求时，每个请求都会带上相应的 Cookie。也就是说，把服务器早前保存在浏览器的这段信息，再发回服务器。这时要使用 HTTP 头信息的Cookie字段。
```
Cookie: foo=bar
```
上面代码会向服务器发送名为foo的 Cookie，值为bar。

Cookie字段可以包含多个 Cookie，使用分号（;）分隔。
下面是一个例子。
```
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

document.cookie属性是可写的，可以通过它为当前网站添加 Cookie。
```
document.cookie = 'fontSize=14';
```
写入的时候，Cookie 的值必须写成key=value的形式。注意，等号两边不能有空格。另外，写入 Cookie 的时候，必须对分号、逗号和空格进行转义（它们都不允许作为 Cookie 的值），这可以用encodeURIComponent方法达到。

但是，document.cookie一次只能写入一个 Cookie，而且写入并不是覆盖，而是添加。
```
document.cookie = 'test1=hello';
document.cookie = 'test2=world';
document.cookie
// test1=hello;test2=world
```

document.cookie写入 Cookie 的例子如下。
```
document.cookie = 'fontSize=14; '
  + 'expires=' + someDate.toGMTString() + '; '
  + 'path=/subdirectory; '
  + 'domain=*.example.com';
```
Cookie 的属性一旦设置完成，就没有办法读取这些属性的值。

删除一个现存 Cookie 的唯一方法，是设置它的expires属性为一个过去的日期。
```
document.cookie = 'fontSize=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
```
上面代码中，名为fontSize的 Cookie 的值为空，过期时间设为1970年1月1月零点，就等同于删除了这个 Cookie。

**164.** 

通过 JavaScript 的异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。后来，AJAX 这个词就成为 JavaScript 脚本发起 HTTP 通信的代名词，也就是说，只要用脚本发起通信，就可以叫做 AJAX 通信。

AJAX 包括以下几个步骤。

- 创建 XMLHttpRequest 实例
- 发出 HTTP 请求
- 接收服务器传回的数据
- 更新网页数据

下面是XMLHttpRequest对象简单用法的完整例子。
```
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
  // 通信成功时，状态值为4
  if (xhr.readyState === 4){
    if (xhr.status === 200){
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }
};

xhr.onerror = function (e) {
  console.error(xhr.statusText);
};

xhr.open('GET', '/endpoint', true);
xhr.send(null);
```