![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/13/16b51305d9427161~tplv-t2oaga2asx-zoom-crop-mark:1512:1512:1512:851.awebp)
# Vue3学习笔记
## 前言
> 个人总结的vue笔记
<p>内容如下</p>

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/711eb27b57fb406bb37e8cc9dbaecb56~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## Vue2和Vue3的区别 

1. 重构响应式系统，使用`Proxy`替换`Object.defineProperty`，`Proxy`优势：

- 可直接监听数组类型的数据变化
- 监听的目标为对象本身，不需要像`Object.defineProperty`一样遍历每个属性，有一定的性能提升
- 可拦截的东西更多，提供了`apply`、`ownKeys`、`has`等13种拦截器方法


2. 新增`Composition API`，更好的逻辑复用和代码组织
3. 重构 `Virtual DOM`


- 模板编译时的优化，将一些静态节点编译成常量
-  `slot`优化，将`slot`编译为`lazy`函数，将`slot`的渲染的决定权交给子组件
- 模板中内联事件的提取并重用（原本每次渲染都重新生成内联函数）


4. 代码结构调整，更便于`Tree shaking`，使得体积更小
5. 使用`Typescript`替换`Flow`

## Vue3为什么引入composition API

首先我们使用Vue2.x的形式来实现一个简单功能

需求: