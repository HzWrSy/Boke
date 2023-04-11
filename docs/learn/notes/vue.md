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

1. 当点击商品列表项时删除该项

2. 当点击添加按钮时，会根据表单中数据添加一行到商品列表中

代码如下:
```js
<template>
    <div class="wrap">
        <section>
            <h6>商品列表</h6>
            <table>
                <thead>
                    <td>序号</td>
                    <td>名称</td>
                    <td>单价</td>
                    <td>折扣</td>
                    <td>折后价</td>
                </thead>
                <tbody>
                    <tr
                        v-for="(fruit, index) in fruits"
                    :key="fruit.id"
                    @click="remove_item(index)"
                    >
                    <td>{{ fruit.id }}</td>
                    <td>{{ fruit.fruit_name }}</td>
                    <td>{{ fruit.price }}</td>
                    <td>{{ fruit.discount }}</td>
                    <td>{{ (fruit.price * fruit.discount).toFixed(2) }}元/斤</td>
                </tr>
            </tbody>
        </table>
        <br />
    </section>
    <section>
        <h6>如果想添加一个商品，请输入：</h6>
        <form>
            商品序号：<input type="text" v-model="f.id" /><br />
            商品名称：<input type="text" v-model="f.fruit_name" /><br />
            单价价格：<input type="text" v-model="f.price" /><br />
            打折折扣：<input type="text" v-model="f.discount" /><br />
            <button @click="add_item">添加</button>
    </form>
</section>
</div>
</template>

<script>
    export default {
    name: "App",
    data: function () {
    return {
    fruits: [
{ id: 1, fruit_name: "apple", price: 10, discount: 0.8 },
{ id: 2, fruit_name: "banana", price: 3, discount: 0.7 },
{ id: 3, fruit_name: "orange", price: 5, discount: 0.5 },
{ id: 4, fruit_name: "durain", price: 50, discount: 0.8 },
    ],
    f: {
    id: 5,
    fruit_name: "",
    price: "",
    discount: "",
},
};
},
    methods: {
    remove_item(index) {
    this.fruits = this.fruits.filter((item, key) => index !== key);
},
    add_item(e) {
    e.preventDefault();
    let temp = Object.assign({}, this.f);
    this.fruits.push(temp);
    this.f.id = this.fruits.length + 1;
    this.f.fruit_name = "";
    this.f.price = "";
    this.f.discount = "";
},
},
};
</script>
```
简单加点样式
```js
.wrap{
  width: 600px;
  margin: 10px auto;
  display: flex;
  justify-content:space-around;
  background-color:rgb(253, 247, 247);
  border-radius:4px;
}
.wrap table thead{
  background-color: deepskyblue;
  font-weight: bold;
  font-size: 0.9em;
}
.wrap table tr:nth-of-type(2n+1){
  background-color:pink;
}
.wrap form{
  font-size: 0.9em;
}
.wrap button{
  margin-top: 10px;
  width: 100%;
  color: rgb(224, 43, 31);
  font-weight: 700;
}
```
![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f4b56a1d72d496aa40ab4e478e8409e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

上述例子中，我们可以看到，使用`2.x`的`option API`，每当实现一个功能，都会在`data`中添加一些数据，同时在`methods`中添加业务逻辑。这里还好只有两个简单的功能，但实际工作中，当添加很多很多功能时，要找到某个功能对应数据和业务逻辑就变得非常困难，并且业务逻辑不一定就在`methods`中，还可能分散在`computed`、`watch`等选配项中。所以`vue3.0`中引入了`composition API`，专门用于解决功能、数据和业务逻辑分散的问题，使项目更益于模块化开发以及后期维护

## Vue3更优雅的使用v-model
我们知道，在`Vue2.0`中如何实现双向数据绑定一种是`v-model`，另一种是`.sync`。通常一个组件只能用于一个`v-model`，但是有的组件需要有多个可以双向响应的数据，所以就出现了`.sync`
在`Vue3.0`中为了实现统一，实现了让一个组件可以拥有多个`v-model`，同时删除掉了`.sync`。在`vue3.0`中，`v-model`后面需要跟一个`modelValue`，即要双向绑定的属性名，`Vue3.0`就是通过给不同的`v-model`指定不同的`modelValue`来实现多个`v-model`
