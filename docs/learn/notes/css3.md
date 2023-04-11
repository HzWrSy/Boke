# <h1>CSS3学习笔记</h1>
![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8ef97c356ce478387aa069accc542cc~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp)
## 一、CSS3新特性
<div>选择器</div>
<div>盒模型</div>
<div>背景和边框: border-radius, box-shadow ,border-image</div>
<div>文字特效:text-shadow ,text-overflow ,word-wrap ,word-break</div>
<div>2D/3D转换: 移动, 缩放 ,转动, 拉长或拉伸(transform)</div>
<div>动画：@keyframes</div>
<div>多列布局：olumn-count（分割列数）column-gap（列与列间隙）column-rule（列边框样式，同border）column-width（列宽度）</div>
<div>用户界面：resize:both（由用户去调整大小）box-sizing、outline-offset</div>

## 二、具体特效
###  1、background
<div>background-image：背景图片，不同的背景图像用逗号隔开，所有的图片中显示在最顶端的为第一张；</div>
<div>background-size：背景图像相对于父元素的宽度和高度的百分比的大小；</div>
<div>background-origin：背景图像的位置区域；（content-box | padding-box | border-box）</div>
<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/448131e4cf57406b8178e0b5e0417553~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp">
<div>background-clip：背景剪裁，从指定位置开始绘制，同background-origin</div>

### 2、边框
<div>box-shadow: h-shadow v-shadow blur spread color inset（同text-shadow的使用）</div>
<table><thead><tr><th>值</th><th>说明</th></tr></thead><tbody><tr><td>h-shadow</td><td>必需，水平阴影的位置，允许负值</td></tr><tr><td>v-shadow</td><td>必需，垂直阴影的位置，允许负值</td></tr><tr><td>blur</td><td>可选，模糊距离</td></tr><tr><td>spread</td><td>可选，阴影的大小</td></tr><tr><td>color</td><td>可选，阴影的颜色。</td></tr><tr><td>inset</td><td>可选，从外层的阴影（开始时）改变阴影内侧阴影</td></tr></tbody></table>
<div>border-radius</div>
<ul>
<li>四个值: 第一个值为左上角，第二个值为右上角，第三个值为右下角，第四个值为左下角。</li>
<li>三个值: 第一个值为左上角, 第二个值为右上角和左下角，第三个值为右下角</li>
<li>两个值: 第一个值为左上角与右下角，第二个值为右上角与左下角</li>
<li>一个值： 四个圆角值相同</li>
</ul>

### 3、文字特效
---
 - text-overflow：文本溢出属性，指定应向用户如何显示溢出内容（clip剪切 | ellipsis省略号）
 - word-wrap：自动换行（break-word）
 - word-break：单词拆分换行（keep-all整个单词换行 | break-all单词被拆分）
---

### 4、渐变
---
- 线性渐变（linear-gradient）- 向下/向上/向左/向右/对角方向
- 径向渐变（radial-gradient）- 由它们的中心定义
``` css
/*direction为方向，如to right */
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
/*angle为水平线和渐变线之间的角度，如90deg*/
background-image: linear-gradient(angle, color-stop1, color-stop2);
/*重复渐变repeating-linear-gradient*/
background-image: repeating-linear-gradient(red, yellow 10%, green 20%);

/*shape为形状，circle | ellipse（椭圆形，默认）*/
background-image: radial-gradient(shape size at position, start-color, ..., last-color);
/*重复渐变repeating-radial-gradient*/
background-image: repeating-radial-gradient(red, yellow 10%, green 15%);
```
---

### 5、转换

####  2D 转换
---
- translate()：根据左(X轴)和顶部(Y轴)位置给定的参数，从当前元素位置移动
- rotate()：给定度数顺时针旋转，负值是允许的，这样是元素逆时针旋转
- scale()：增加或减少的大小，取决于宽度（X轴）和高度（Y轴）的参数
- skew()：分别表示X轴和Y轴倾斜的角度
---

####  3D 转换
---
- ranslate3d(x,y,z)：3D 转化
- scale3d(x,y,z)：3D 缩放转换
- rotate3d(x,y,z,angle)：3D 旋转
- perspective(n)：3D 转换元素的透视视图

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78c6c19d88f64bae96b21ae3393aefba~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)
---

### 6、过渡
#### 元素从一种样式逐渐改变为另一种的效果
``` css
div {
    width: 100px;
    height: 100px;
    background: red;
    transition: width 2s;
    -webkit-transition: width 2s;
}
div:hover {
    width: 300px;
}
```
> <div style="color: #ffc2fc;">要添加多个样式的变换效果，添加的属性由逗号分隔</div>

### 7、动画
> @keyframes 规则内指定一个 CSS 样式和动画将逐步从目前的样式更改为新的样式。

``` css
@keyframes myfirst {
    from {background: red;}
    to {background: yellow;}
}
@-webkit-keyframes myfirst{
    from {background: red;}
    to {background: yellow;}
}

div {
    animation: myfirst 5s;
    -webkit-animation: myfirst 5s;
}

/*可以改变任意多的样式任意多的次数,用百分比来规定变化发生的时间*/
@keyframes myfirst{
    0%   {background: red;}
    25%  {background: yellow;}
    50%  {background: blue;}
    100% {background: green;}
}
```

## 三、其他使用
---
### 1、盒模型
- width(宽) + padding(内边距) + border(边框) = 元素实际宽度
- height(高) + padding(内边距) + border(边框) = 元素实际高
![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a50f006498a34bb7a641051bdd43f317~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)
- box-sizing 属性可以设置 width 和 height 属性中是否包含了 padding(内边距) 和 border(边框)，默认为不包含。
- -box-sizing: border-box; padding(内边距) 和 border(边框) 也包含在 width 和 height 中
- box-sizing: content-box；padding(内边距) 和 border(边框) 不包含在 width 和 height 中
### 2、弹性盒子
一种当页面需要适应不同的屏幕大小以及设备类型时确保元素拥有恰当的行为的布局方式。引入弹性盒布局模型的目的是提供一种更加有效的方式来对一个容器中的子元素进行排列、对齐和分配空白空间。

弹性盒子由弹性容器(Flex container)和弹性子元素(Flex item)组成，设置 display=flex | inline-flex将其定义为弹性容器。

<a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2015%2F07%2Fflex-grammar.html" target="_blank" title="https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" ref="nofollow noopener noreferrer">Flex 布局</a>

### 3、多媒体查询
---
根据设置自适应显示，媒体查询可用于检测很多事情，例如：
- viewport(视窗) 的宽度与高度
- 设备的宽度与高度
- 朝向 (智能手机横屏，竖屏) 。
- 分辨率
``` css
@media screen and (max-width: 480px) {
    body {
        background-color: lightgreen;
    }
}
```
---






