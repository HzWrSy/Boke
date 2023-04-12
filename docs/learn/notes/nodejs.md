![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07cfbc9237f64c00a930b74ba3c93027~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp)
# Nodejs学习笔记 

## 一.什么是nodejs

nodejs 是一个基于v8引擎的运行时环境

### 1.使用node管理工具 

node版本管理工具：n(不支持windows)，nvm-windows

- nvm list :  查看电脑上有哪些node 版本
- nvm install 14.13.1 安装指定版本
- nvm install lts 安装lts
- nvm list available
- nvm  use 版本号 ：切换到 对对应的版本进行使用
- nvm uninstall 版本号 : 卸载对应的版本

### 2.Node中的REPL
- REPL是Read-Eval-Print Loop的简称，翻译为："读取-求值-输出 循环"
- 是一个加简单的、交互式编程环境在node环境下执行代码

## 二.JS模块化和Node模块化
```js
// 清空控制台
console.clear()

// 打印函数的调用栈
console.trance()
```
### 1.commonJs
>node实现commonjs就是对象的引用赋值(浅层拷贝)

```js
// 导出
exports.name = name

// 引入
const { name } = require('./路径')
```
>导出的本质上是：Module.export导出，一旦是 Module.expor导出，expor导出将不起作用
Node内部帮我们做了一件事：Module.export = export
module.export 和export 以及require指向的都是同一块地址空间，但是当用module.export = {}进行对象的导出时，内存中会重新开辟一块内存进行导出，exports将失去效果。

### require的核心模块

#### 1.没有后缀名的文件的查找顺序：
1. 直接找文件X
2.   查找X.js
3.   查找X.json
4.   查找X.node

#### 2.没有找到对应的文件

查找目录下的index文件

1. 直接找文件X/index.js
2.   查找X/index.js
3.   查找X/index.json
4.   查找Xindex.node

node中的commonjs和加载过程同步
```js
require('./index.js')

console.log('main的代码被执行了') //先执行index.js 的文件再执行mian.js 中的代码
```

## 四、npm包管理
**Script:**

npm start和npm run start的区别是什么？

- 它们是等价的；
- 对于常用的 start、 test、stop、restart可以省略掉run直接通过 npm start等方式运行；

**semver版本规范**

**semver版本规范是X.Y.Z：**

- X主版本号（major）：当你做了不兼容的 API 修改（可能不兼容之前的版本）；
- Y次版本号（minor）：当你做了向下兼容的功能性新增（新功能增加，但是兼容之前的版本）；
- Z修订号（patch）：当你做了向下兼容的问题修正（没有新功能，修复了之前版本的bug）；

>我们这里解释一下 ^和~的区别：

>^x.y.z：表示x是保持不变的，y和z永远安装最新的版本；

>~x.y.z：表示x和y保持不变的，z永远安装最新的版本；

## 五、创建自己的脚手架工具

### 1.通过自定义命令xyl执行入口文件index.js

创建好相应的项目，里面有`·index.js`入口文件

```js
#!/usr/bin/env node
console.log('xyl cli')
```

执行`npm init -y `初始化一个`package.json`文件,在里面配置

```js
"bin": {
    "xyl": "index.js"
  },
// xyl为命令
// index.js 事要执行的文件
```
这步不能省，执行npm link 命令，将我们的命令进行一个链接

再在终端种输入`xyl`,执行独对应的index文件

**2. 通过自定义的命令xyl --version查看版本号**
在项目中先下载`commander`
>npm install commander

```js
#!/usr/bin/env node
const program = require('commander')
// 查看版本号，通过require请求道package.json对象拿到version
program.version(require('./package.json').version)


// 通过process进程的参数解析我们输入的命令
program.parse(process.args)
```
执行xyl --version命令即显示版本号，xyl -- help命令默认

**3.其他选项**
