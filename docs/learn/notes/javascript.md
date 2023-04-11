# JavaScript学习笔记
![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/725fae99b0e745b8827d1e58daf7aea6~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp)

## JavaScript简介

- JavaScript 最开始是专门为浏览器设计的一门语言，但是现在也被用于很多其他的环境。

- 如今，JavaScript 已经成为了与 HTML/CSS 完全集成的，使用最广泛的浏览器语言。

- 有很多其他的语言可以被“编译”成 JavaScript，这些语言还提供了更多的功能。建议最好了解一下这些语言，至少在掌握了 JavaScript 之后大致的了解一下。



## 常用JavaScript方法整理
主要整理日常工作中常用的一些通用Js代码，以方便能够记录与使用。
## 1.截取指定字节数的字符串
```js
/**
 * 截取指定字节的字符串
 * @param str 要截取的字符穿
 * @param len 要截取的长度，根据字节计算
 * @param suffix 截取前len个后，其余的字符的替换字符，一般用“…”
 * @returns {*}
 */
function cutString(str,len,suffix){
   if(!str) return "";
   if(len <= 0) return "";
   if(!suffix) suffix = "";
   var templen = 0;
   for(var i = 0;i < str.length;i++){
      if(str.charCodeAt(i) > 255){
         templen += 2;
      }else{
         templen++
      }
      if(templen == len){
         return str.substring(0, i+1) + suffix;
      }else if(templen > len){
         return str.substring(0, i) + suffix;
      }
   }
   return str;
}
```
## 2.判断是否微信
```js
/**
 * 判断微信浏览器
 * @returns {Boolean}
 */
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
```
## 3.获取时间格式的几个举例
```js
function getTimeFormat(time){
   var date = new Date(parseInt(time) * 1000);
   var month,day,hour,min;
   parseInt(date.getMonth())+1<10?month = '0'+(parseInt(date.getMonth())+1):month = parseInt(date.getMonth())+1;
   date.getDate()<10?day = '0'+date.getDate():day = date.getDate();
   date.getHours()<10?hour = '0'+date.getHours():hour = date.getHours();
   date.getMinutes()<10?min = '0'+date.getMinutes():min = date.getMinutes();
   return [month, day].join('-')+'  '+hour+':'+min
}

function getTimeFormatYMD(time) {
    var date = new Date(parseInt(time) * 1000);
    var year, month,day;
    year = date.getFullYear();
    parseInt(date.getMonth())+1<10?month = '0'+(parseInt(date.getMonth())+1):month = parseInt(date.getMonth())+1;
    date.getDate()<10?day = '0'+date.getDate():day = date.getDate();
    return [year, month, day].join('-')
}

function getTimeFormatAll(time) {
   var date = new Date(parseInt(time) * 1000);
   var year, month,day,hour,min, second;
   year = date.getFullYear();
   parseInt(date.getMonth())+1<10?month = '0'+(parseInt(date.getMonth())+1):month = parseInt(date.getMonth())+1;
   date.getDate()<10?day = '0'+date.getDate():day = date.getDate();
   date.getHours()<10?hour = '0'+date.getHours():hour = date.getHours();
   date.getMinutes()<10?min = '0'+date.getMinutes():min = date.getMinutes();
   date.getSeconds()<10?second = '0'+date.getSeconds():second = date.getSeconds();

   return [year, month, day].join('-')+'  '+hour+':'+min+':'+second
}
```
## 4.JS格式化现在距${endTime}的剩余时间
> formatRemainTime("2021-8-21 00:00:00"); // 9天 12小时 2分钟 8秒
```js
/**
 * JS格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
function formatRemainTime(endTime) {
    var startDate = new Date(); //开始时间
    var endDate = new Date(endTime); //结束时间
    var t = endDate.getTime() - startDate.getTime(); //时间差
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
}
```
## 5.JS格式化${startTime}距现在的已过时间
>formatPassTime("2018-5-17 10:19:00"); // 1小时前
````js
/**
 * JS格式化${startTime}距现在的已过时间
 * @param  {Date} startTime
 * @return {String}
 */
function formatPassTime(startTime) {
    var currentTime = Date.parse(new Date()),
        time = currentTime - new Date(startTime),
        day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12);
    if (year) return year + "年前";
    if (month) return month + "个月前";
    if (day) return day + "天前";
    if (hour) return hour + "小时前";
    if (min) return min + "分钟前";
    else return '刚刚';
}
````
## 6.对象克隆、深拷贝
```js
/**
 * 对象克隆&深拷贝
 * @param obj
 * @returns {{}}
 */
function cloneObj(obj) {
    var newO = {};

    if (obj instanceof Array) {
        newO = [];
    }
    for (var key in obj) {
        var val = obj[key];
        newO[key] = typeof val === 'object' ? arguments.callee(val) : val;
    }
    return newO;
};
```
>克隆拷贝增强版
```js
/**
 * 对象克隆&深拷贝
 * @param obj
 * @returns {{}}
 */
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
```
>测试用例：
```js
var origin = {
    a: "text",
    b: null,
    c: undefined,
    e: {
        f: [1, 2]
    }
}
```
## 7.身份证号码验证
```js
/**
 * 验证身份证号
 * @param el 号码输入input
 * @returns {boolean}
 */
function checkCardNo(el){
    var txtval = el.value;
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(txtval)
}
```
## 8.获取字符串长度
```js
/**
 * 获取字符串字节长度
 * @param {String}
 * @returns {Boolean}
 */
function checkLength(v){         
    var realLength = 0;
    var len = v.length;
    for (var i = 0; i < len; i++) {
       var charCode = v.charCodeAt(i);
       if (charCode >= 0 && charCode <= 128)
           realLength += 1;
       else
           realLength += 2;
   }
   return realLength;
}
```
## 9.URL有效性校验方法
```js
/**
 * URL有效性校验
 * @param str_url
 * @returns {boolean}
 */
function isURL(str_url) {// 验证url
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //           
    ftp的user@
          + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
            + "|" // 允许IP和DOMAIN（域名）
            + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
            + "[a-z]{2,6})" // first level domain- .com or .museum
            + "(:[0-9]{1,4})?" // 端口- :80
            + "((/?)|" // a slash isn't required if there is no file name
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    return re.test(str_url);
}

// 建议的正则
  functionisURL(str){
      return!!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
  }
```

## 10.自定义jsonp方法
```js
/**
 * 自定义封装jsonp方法
 * @param options
 */
jsonp = function(options) {
    options = options || {};
    if (!options.url || !options.callback) {
        throw new Error("参数不合法");
    }

    //创建 script 标签并加入到页面中
    var callbackName = ('jsonp_' + Math.random()).replace(".", "");
    var oHead = document.getElementsByTagName('head')[0];
    options.data[options.callback] = callbackName;
    var params = formatParams(options.data);
    var oS = document.createElement('script');
    oHead.appendChild(oS);

    //创建jsonp回调函数
    window[callbackName] = function (json) {
        oHead.removeChild(oS);
        clearTimeout(oS.timer);
        window[callbackName] = null;
        options.success && options.success(json);
    };

    //发送请求
    oS.src = options.url + '?' + params;

    //超时处理
    if (options.time) {
        oS.timer = setTimeout(function () {
            window[callbackName] = null;
            oHead.removeChild(oS);
            options.fail && options.fail({ message: "超时" });
        }, time);
    }
};
/**
 * 格式化参数
 * @param data
 * @returns {string}
 */
formatParams = function(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    return arr.join('&');
}
```

## 11.cookie操作
```js
//写cookies
setCookie = function(name,value,time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec*1);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//cookie操作辅助函数
getsec = function(str){
    var str1=str.substring(1,str.length)*1;
    var str2=str.substring(0,1);
    if (str2=="s"){
        return str1*1000;
    }else if (str2=="h"){
        return str1*60*60*1000;
    }else if (str2=="d"){
        return str1*24*60*60*1000;
    }
}
//读取cookies
getCookie = function(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//删除cookies
delCookie = function(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if(cval != null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
```
## 12.Rem移动端适配
```js
var rem = {
	baseRem: 40, // 基准字号，按照iphone6应该为20，此处扩大2倍，便于计算
	baseWidth: 750, // 基准尺寸宽，此处是按照ihpone6的尺寸
	rootEle: document.getElementsByTagName("html")[0],
	initHandle: function () {
		this.setRemHandle();
		this.resizeHandle();
	},
	setRemHandle: function () {
		var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
		this.rootEle.style.fontSize = clientWidth * this.baseRem / this.baseWidth + "px";
	},
	resizeHandle: function () {
		var that = this;
		window.addEventListener("resize", function () {
			setTimeout(function () {
				that.setRemHandle();
			}, 300);
		});
	}
};
rem.initHandle();
```

## 13.动态加载JS
```js
function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if(typeof(callback) != "undefined"){
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
  }
  script.src = url;
  document.body.appendChild(script);
}
```
## 14.生成随机颜色值
```js
function getRandomColor () {
  const rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length == 1 ? '0' + color : color;
    rgb.push(color);
  }
  return '#' + rgb.join('');
}
```
## 15.事件绑定与解绑
```js
ElementClass.prototype.on = function (name, callback) {
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(callback)
}

ElementClass.prototype.off = function (name, callback) {
    var callbacks = this.callbacks[name]
    if (callbacks && callbacks instanceof Array) {
        var index = callbacks.indexOf(callback)
        if (index !== -1) callbacks.splice(index, 1)
    }
}

ElementClass.prototype.trigger = function (name, params) {
    var callbacks = this.callbacks[name]
    if (callbacks && callbacks instanceof Array) {
        callbacks.forEach((cb) => {
            cb(params)
        })
    }
}
```
## 16.移动端音频播放
```js
/**
  * 移动端H5播放音乐处理，兼容微信端
  * @param el 音乐Audio元素
  */
function playMusic(el) {
    var b = document.getElementById(el);

    var c = function c() {
        b.play();
        document.removeEventListener("touchstart", c, true);
    };

    b.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        c();
    }, false);
    document.addEventListener("YixinJSBridgeReady", function () {
        c();
    }, false);
    document.addEventListener("touchstart", c, true);
}
```
## 17.移动端视频适配
```js
<video class="video1" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true"  preload="auto" poster="poster图片地址" src="视频地址"></video>
```

## 18.Webpack+Vue-CLI实现自动全局注册组件
```js
// 需要 npm import --save lodash
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式，获取.vue结尾的文件
  /.vue$/
)


requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
```
## 19.JS Base64字符串编码与解码
```scss
base64Encode("test");    // dGVzdA==
base64Decode(test);     // test
```
```js
/**
 * BASE64加密
 * @param str
 * @returns {string}
 */
function base64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

/**
 * BASE64解密
 * @param str
 * @returns {string}
 */
function base64Decode(str) {
    return decodeURIComponent(escape(atob(str)));
}
```
## 20.JS检查输入的字符是否具有特殊字符
```ruby
checkQuote("dasd1!/,/.");    // true
checkQuote("52014sdsda");    // false
```
```js
/**
 * JS检查输入的字符是否具有特殊字符
 * @param str 字符串
 * @returns true 或 false; true表示包含特殊字符 主要用于注册信息的时候验证
 */
function checkQuote(str) {
    var items = new Array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")");
    items.push(":", ";", "'", "|", "\", "<", ">", "?", "/", "<<", ">>", "||", "//");
    items.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate");
    str = str.toLowerCase();
    for ( var i = 0; i < items.length; i++) {
        if (str.indexOf(items[i]) >= 0) {
            return true;
        }
    }
    return false;
}
```
## 21.JS将手机号格式化，中间部分以 * 号代替
```js
phoneToStar("16666666666");  // 166****6666
/**
 * JS将手机号格式化，中间部分以 * 号代替
 * @param phone
 * @returns {string | * | void}
 */
function phoneToStar( phone ) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}
```
## 22.JS时间个性化输出功能
```js
/**
 * JS时间个性化输出功能
 * 1、< 60s, 显示为“刚刚”
 * 2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
 * 3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
 * 4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
 * 5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
 * @param time
 * @returns {string}
 */
function timeFormat(time){
    var date = new Date(time),
        curDate = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 10,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        curYear = curDate.getFullYear(),
        curHour = curDate.getHours(),
        timeStr;

    if(year < curYear){
        timeStr = year +'年'+ month +'月'+ day +'日 '+ hour +':'+ minute;
    }else{
        var pastTime = curDate - date,
            pastH = pastTime/3600000;

        if(pastH > curHour){
            timeStr = month +'月'+ day +'日 '+ hour +':'+ minute;
        }else if(pastH >= 1){
            timeStr = '今天 ' + hour +':'+ minute +'分';
        }else{
            var pastM = curDate.getMinutes() - minute;
            if(pastM > 1){
                timeStr = pastM +'分钟前';
            }else{
                timeStr = '刚刚';
            }
        }
    }
    return timeStr;
}
```
```js
//可用于列表展示的时间显示
console.log(timeFormat(new Date()));	// 例：刚刚
```
## 23.函数去抖
```js
//调用
let n = 1;
function func () {
    n += 1;
    console.log('n', n);
}
window.onresize = debance(func, 1000);
```
```js
function debance(fn, delay) {
    let t = null;
    return function() {
        let that = this;
        let args = arguments;
        clearTimeout(t);
        t = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    }
}
```
## 24.函数节流
```js
//调用
let n = 1;
function func () {
    n += 1;
    console.log('n', n);
}
window.onresize = throttle(func, 1000);
```
```js
function throttle (fn, delay) {
    let preTime = Date.now();
    return function() {
        let that = this;
        let args = arguments;
        let nowTime = Date.now();
        if (preTime + delay < nowTime) {
            fn.apply(that, args);
            preTime = nowTime;
        }
    }
}
```






