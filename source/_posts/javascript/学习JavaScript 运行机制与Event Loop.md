---
title: 学习JavaScript 运行机制与Event Loop
date: 2019-11-15 14:20:36
categories:
  - JavaScript
tags: 
---

<code>为什么JavaScript不能有多个线程呢,这样能提高效率啊。？</code>

JavaScript的<font size="4"><code>单线程</code></font>，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？所以，为了避免复杂性，从一诞生，JavaScript就是单线程。

<font color="skyblue">理论1：</font>

JavaScript语言的设计者意识到，这时主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。

于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

<code>
（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。
</code>

<font color="skyblue">理论2：</font>

事件和回调函数

"任务队列"是一个事件的队列（也可以理解成消息的队列），IO设备完成一项任务，就在"任务队列"中添加一个事件，表示相关的异步任务可以进入"执行栈"了。主线程读取"任务队列"，就是读取里面有哪些事件。

"任务队列"中的事件，除了IO设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要指定过回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。

所谓"回调函数"（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。

"任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动进入主线程。但是，由于存在后文提到的"定时器"功能，主线程首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程。

<font color="gold">主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。</font><br/>

<font color="skyblue">理论3：</font>

setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。

<font color="skyblue">理论4：</font>

需要注意的是，setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在setTimeout()指定的时间执行。

<hr>

> <font color="gold" size="4">JavaScript为什么是单线程呢？</font>

JavaScript作为脚本语言，最初被设计<code>用于浏览器</code>。如果JavaScript同时有两个线程，一个线程中执行在某个DOM节点上添加内容，另一个线程执行删除这个节点，这时浏览器会……

<hr>

HTML5的新特性<code>Web Worker</code>，可以创建多线程呀～

是的，为了解决不可避免的耗时操作(多重循环、复杂的运算)，HTML5提出了Web Worker，它会在当前的js执行主线程中开辟出一个额外的线程来运行js文件，这个新的线程和js主线程之间不会互相影响，同时提供了数据交换的接口：postMessage和onMessage。

但是因为它创建的子线程完全受控于主线程，且位于外部文件中，无法访问DOM。所以它并没有改变js单线程的本质。

<font size="3">一切javascript版的"多线程"都是用单线程模拟出来的</font>

<hr>

单线程就意味着，所有的任务都需要排队。

<hr>

<font size="4"><code>setTimeout(fn,0)</code></font>的含义是，指定某个任务在主线程最早可得的空闲时间执行，意思就是不用再等多少秒了，只要主线程执行栈内的同步任务全部执行完成，栈为空就马上执行。

对于<font size="4"><code>setInterval(fn,ms)</code></font>来说，我们已经知道不是每过ms秒会执行一次fn，而是每过ms秒，会有fn进入Event Queue。一旦setInterval的回调函数fn执行时间超过了延迟时间ms，那么就完全看不出来有时间间隔了。

<hr>

除了广义的同步任务和异步任务，我们对任务有更精细的定义：

+ macro-task(宏任务)：包括整体代码script块，setTimeout，setInterval
+ micro-task(微任务)：Promise，process.nextTick

代码说明：
```js
setTimeout(function() {
    console.log('setTimeout');
})

new Promise(function(resolve) {
    console.log('promise');
}).then(function() {
    console.log('then');
})

console.log('console');
```
+ 这段代码作为宏任务，进入主线程。
+ 先遇到setTimeout，那么将其回调函数注册后分发到宏任务Event Queue。(注册过程与上同，下文不再描述)
+ 接下来遇到了Promise，new Promise立即执行，then函数分发到微任务Event Queue。
+ 遇到console.log()，立即执行。
+ 好啦，整体代码script作为第一个宏任务执行结束，看看有哪些微任务？我们发现了then在微任务Event Queue里面，执行。
+ ok，第一轮事件循环结束了，我们开始第二轮循环，当然要从宏任务Event Queue开始。我们发现了宏任务Event Queue中setTimeout对应的回调函数，立即执行。
+ 结束。


参考：

[JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)