---
title: 笔记7：阅读（阮一峰）JavaScript 标准参考教程（alpha）
date: 2019-06-29 23:52:39
categories:
  - JavaScript
tags: 
---

**91.**
- 如果<code>构造函数</code>内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象。
```
var Vehicle = function () {
  this.price = 1000;
  return 1000;
};

(new Vehicle()) === 1000
// false
```
- 另一方面，如果对<code>普通函数（内部没有this关键字的函数）</code>使用new命令，则会返回一个空对象。
```
function getMessage() {
  return 'this is a message';
}

var msg = new getMessage();

msg // {}
typeof msg // "object"
```
上面代码中，getMessage是一个普通函数，返回一个字符串。对它使用new命令，会得到一个空对象。这是因为new命令总是返回一个对象，要么是实例对象，要么是return语句指定的对象。

**92.**构造函数作为模板，可以生成实例对象。但是，有时拿不到构造函数，只能拿到一个现有的对象。我们希望以这个现有的对象作为模板，生成新的实例对象，这时就可以使用<code>Object.create()</code>方法。
```
var person1 = {
  name: '张三',
  age: 38,
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
};

var person2 = Object.create(person1);

person2.name // 张三
person2.greeting() // Hi! I'm 张三.
```

**93.**
全局环境使用this，它指的就是顶层对象window。
```
this === window // true

function f() {
  console.log(this === window);
}
f() // true
```
上面代码说明，不管是不是在函数内部，只要是在全局环境下运行，this就是指顶层对象window。

**94.**
如果对象的方法里面包含this，this的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变this的指向。

**95.**
如果this所在的方法不在对象的第一层，这时this只是指向当前一层的对象，而不会继承更上面的层。
```
var a = {
  p: 'Hello',
  b: {
    m: function() {
      console.log(this.p);
    }
  }
};
```
a.b.m() // undefined
上面代码中，a.b.m方法在a对象的第二层，该方法内部的this不是指向a，而是指向a.b，因为实际执行的是下面的代码。
```
var b = {
  m: function() {
   console.log(this.p);
  }
};

var a = {
  p: 'Hello',
  b: b
};
```
(a.b).m() // 等同于 b.m()
如果要达到预期效果，只有写成下面这样。
```
var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};
```
如果这时将嵌套对象内部的方法赋值给一个变量，this依然会指向全局对象。
```
var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};

var hello = a.b.m;
hello() // undefined
```
上面代码中，m是多层对象内部的一个方法。为求简便，将其赋值给hello变量，结果调用时，this指向了顶层对象。为了避免这个问题，可以只将m所在的对象赋值给hello，这样调用时，this的指向就不会变。
```
var hello = a.b;
hello.m() // Hello
```

**96.**
找出数组最大元素

JavaScript 不提供找出数组最大元素的函数。结合使用apply方法和Math.max方法，就可以返回数组的最大元素。
```
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a) // 15
```

**97.**<code>转换类似数组的对象</code>

另外，利用数组对象的slice方法，可以将一个类似数组的对象（比如arguments对象）转为真正的数组。
```
Array.prototype.slice.apply({0: 1, length: 1}) // [1]
Array.prototype.slice.apply({0: 1}) // []
Array.prototype.slice.apply({0: 1, length: 2}) // [1, undefined]
Array.prototype.slice.apply({length: 1}) // [undefined]
```
上面代码的apply方法的参数都是对象，但是返回结果都是数组，这就起到了将对象转成数组的目的。从上面代码可以看到，这个方法起作用的前提是，被处理的对象必须有length属性，以及相对应的数字键。

**98.**<code>原型链 </code>

所有对象都有自己的原型对象（prototype）。

如果一层层地上溯，所有对象的原型最终都可以上溯到Object.prototype，即Object构造函数的prototype属性。也就是说，所有对象都继承了Object.prototype的属性。这就是所有对象都有valueOf和toString方法的原因，因为这是从Object.prototype继承的。

那么，Object.prototype对象有没有它的原型呢？回答是Object.prototype的原型是null。null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null。
```
Object.getPrototypeOf(Object.prototype)
// null
```
Object.getPrototypeOf方法返回参数对象的原型。

**99.** 
<code>instanceof</code>运算符返回一个布尔值，表示对象是否为某个构造函数的实例。
```
var v = new Vehicle();
v instanceof Vehicle // true
```
instanceof运算符的<code>左边是实例对象，右边是构造函数。</code>它会检查右边构建函数的原型对象（prototype），是否在左边对象的原型链上。因此，下面两种写法是等价的。
```
v instanceof Vehicle
// 等同于
Vehicle.prototype.isPrototypeOf(v)
```
<code>instanceof运算符只能用于对象</code>，不适用原始类型的值。
```
var s = 'hello';
s instanceof String // false
```
利用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题。
```
function Fubar (foo, bar) {
  if (this instanceof Fubar) {
    this._foo = foo;
    this._bar = bar;
  } else {
    return new Fubar(foo, bar);
  }
}
```
上面代码使用instanceof运算符，在函数体内部判断this关键字是否为构造函数Fubar的实例。如果不是，就表明忘了加new命令。

**100.** 继承

Shape构造函数
```
function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};
```

让Rectangle构造函数继承Shape。
```
// 第一步，子类继承父类的实例
function Rectangle() {
  Shape.call(this); // 调用父类构造函数
}
// 另一种写法
function Rectangle() {
  this.base = Shape;
  this.base();
}

// 第二步，子类继承父类的原型
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
```

**101.**
<code>Object.getPrototypeOf</code>方法返回参数对象的原型。这是获取原型对象的标准方法。
```
var F = function () {};
var f = new F();
Object.getPrototypeOf(f) === F.prototype // true
```
下面是几种特殊对象的原型。
```
// 空对象的原型是 Object.prototype
Object.getPrototypeOf({}) === Object.prototype // true

// Object.prototype 的原型是 null
Object.getPrototypeOf(Object.prototype) === null // true

// 函数的原型是 Function.prototype
function f() {}
Object.getPrototypeOf(f) === Function.prototype // true
```

**102.**
<code>in运算符</code>返回一个布尔值，表示一个对象是否具有某个属性。它不区分该属性是对象自身的属性，还是继承的属性。
```
'length' in Date // true
'toString' in Date // true
in运算符常用于检查一个属性是否存在。
```
获得对象的所有可遍历属性（不管是自身的还是继承的），可以使用for...in循环。
```
var o1 = { p1: 123 };

var o2 = Object.create(o1, {
  p2: { value: "abc", enumerable: true }
});

for (p in o2) {
  console.info(p);
}
// p2
// p1
```
上面代码中，对象o2的p2属性是自身的，p1属性是继承的。这两个属性都会被for...in循环遍历。

为了在for...in循环中获得对象自身的属性，可以采用hasOwnProperty方法判断一下。
```
for ( var name in object ) {
  if ( object.hasOwnProperty(name) ) {
    /* loop code */
  }
}
```
获得对象的所有属性（不管是自身的还是继承的，也不管是否可枚举），可以使用下面的函数。
```
function inheritedPropertyNames(obj) {
  var props = {};
  while(obj) {
    Object.getOwnPropertyNames(obj).forEach(function(p) {
      props[p] = true;
    });
    obj = Object.getPrototypeOf(obj);
  }
  return Object.getOwnPropertyNames(props);
}
```
上面代码依次获取obj对象的每一级原型对象“自身”的属性，从而获取obj对象的“所有”属性，不管是否可遍历。

**103.** <code>任务队列和事件循环</code>
JavaScript 运行时，除了一个正在运行的主线程，引擎还提供一个任务队列（task queue），里面是各种需要当前程序处理的异步任务。

首先，主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务就重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，程序就结束执行。

异步任务的写法通常是回调函数。一旦异步任务重新进入主线程，就会执行对应的回调函数。如果一个异步任务没有回调函数，就不会进入任务队列，也就是说，不会重新进入主线程，因为没有用回调函数指定下一步的操作。

**104.** setTimeout有一个需要注意的地方，如果回调函数是对象的方法，那么setTimeout使得方法内部的this关键字指向全局环境，而不是定义时所在的那个对象。
```
var x = 1;

var obj = {
  x: 2,
  y: function () {
    console.log(this.x);
  }
};

setTimeout(obj.y, 1000) // 1
```
上面代码输出的是1，而不是2。因为当obj.y在1000毫秒后运行时，this所指向的已经不是obj了，而是全局环境。
为了防止出现这个问题，一种解决方法是将obj.y放入一个函数。
```
var x = 1;

var obj = {
  x: 2,
  y: function () {
    console.log(this.x);
  }
};

setTimeout(function () {
  obj.y();
}, 1000);
// 2
```
上面代码中，obj.y放在一个匿名函数之中，这使得obj.y在obj的作用域执行，而不是在全局作用域内执行，所以能够显示正确的值。

另一种解决方法是，使用bind方法，将obj.y这个方法绑定在obj上面。
```
var x = 1;

var obj = {
  x: 2,
  y: function () {
    console.log(this.x);
  }
};

setTimeout(obj.y.bind(obj), 1000)
// 2
```

**105.** setInterval例子
```
var hash = window.location.hash;
var hashWatcher = setInterval(function() {
  if (window.location.hash != hash) {
    updatePage();
  }
}, 1000);
```
setInterval指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的时间。因此实际上，两次执行之间的间隔会小于指定的时间。比如，setInterval指定每 100ms 执行一次，每次执行需要 5ms，那么第一次执行结束后95毫秒，第二次执行就会开始。如果某次执行耗时特别长，比如需要105毫秒，那么它结束后，下一次执行就会立即开始。

为了确保两次执行之间有固定的间隔，可以不用setInterval，而是每次执行结束后，使用setTimeout指定下一次执行的具体时间。
```
var i = 1;
var timer = setTimeout(function f() {
  // ...
  timer = setTimeout(f, 2000);
}, 2000);
```
上面代码可以确保，下一次执行总是在本次执行结束之后的2000毫秒开始。