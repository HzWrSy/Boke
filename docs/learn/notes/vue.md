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

## Composition API和React Hook的区别
从`React Hook`的实现角度看，`React Hook`是根据`useState`调用的顺序来确定下一次重渲染时的`state`是来源于哪个`useState`，所以出现了以下限制

1. 不能在循环、条件、嵌套函数中调用`Hook`
2. 必须确保总是在你的`React`函数的顶层调用`Hook`
3.  `useEffect`、`useMemo`等函数必须手动确定依赖关系

而`Composition`` API`是基于Vue的响应式系统实现的，与`React Hook`的相比

1. `Composition API`声明在`setup`函数内，一次组件实例化只调用一次`setup`，而`React Hook`每次重渲染都需要调用`Hook`，使得`React`的`GC`比`Vue`更有压力，性能也相对于Vue来说也较慢
2. `Compositon API`的调用不需要顾虑调用顺序，也可以在循环、条件、嵌套函数中使用
3. 响应式系统自动实现了依赖收集，进而组件的部分的性能优化由Vue内部自己完成，而`React Hook`需要手动传入依赖，而且必须必须保证依赖的顺序，让`useEffect`、`useMemo`等函数正确的捕获依赖变量，否则会由于依赖不正确使得组件性能下降

虽然`Compositon API`看起来比`React Hook`好用，但是其设计思想也是借鉴了`React Hook`

## ref函数
我们知道，在`vue3.0`引入了`composition API`,`setup`函数是其核心函数

在`setup`函数中，可以使用`ref`函数，用于创建一个响应式数据，当数据发生改变时，`Vue`会自动更新`UI` 例如：使用`ref`函数定义一个变量`count`

```js
import { ref } from 'vue';

function useChangeCount() {
    let count = ref(0);
    function change_count() {
        count.value += 1;
    }
    return { count, change_count }
}
export default useChangeCount;
```
然后在组件中引入该模块：import useChangeCount from "./composition_tiny_js/count" 并且在组件的`setup`中使用，并通过`return`的形式将外界需要用到的变量和函数暴露出去
```js
setup() {
  let { count, change_count } = useChangeCount();
  return { count, change_count };
}
```
这样上面暴露的count变量,change_count方法就可以在外界使用了

```js
<template>
    <div>
      <h1>{{ count }}</h1>
      <button @click="change_count">点我</button>
    </div>
</template>
```
需要注意的是：
1. 在`setup`中定义的变量或方法，都必须通过`return` {xxx,xxx}暴露出去，外界才能使用
2. `ref`函数仅能监听基本类型的变化，不能监听复杂类型的变化（比如对象、数组）

## reactive函数
`reactive`的用法与`ref`的用法相似，也是将数据变成响应式数据，当数据发生变化时UI也会自动更新。不同的是`ref`用于基本数据类型，而`reactive`是用于复杂数据类型，比如对象和数组 例如：定义一个对象类型的变量`user`
```js
<template>
  <div>
    <p>{{ user }}</p>
    <button @click="increase">click me! one year later</button>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "reactive",
  setup() {
    const user = reactive({ name: "Alice", age: 12 });
    function increase() {
      ++user.age
    }
    return { user, increase };
  },
};
</script>
```
如上，当点击按钮时，让数据`user.age`加1，当Vue发现数据发生变化，`UI`会自动更新 那我们验证了，确实`reactive`函数可以将一个复杂数据类型变成响应式数据。我们不妨将`reactive`函数执行的结果打印出来看下，看看它返回值是什么

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5de72cba5874ed9be908cfe56db36b0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)我们发现，`reactive`执行结果是将传递的对象包装成了`proxy`对象

接下来我们测试一下，如果传递基本数据类型呢？
```js
<template>
  <div>
    <p>{{ userAge }}</p>
    <button @click="increase">click me! one year later</button>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "reactive",
  setup() {
    let userAge = reactive(12);
    function increase() {
      console.log(userAge);
      ++userAge;
    }
    return { userAge, increase };
  },
};
</script>
```
## setup函数的注意点
我们知道`setup`函数是组合`API`的核心入口函数，使用时需要注意几点：

1. `setup`函数的执行时机是在`beforeCreate`和`created`之间
2. 由于`setup`执行时机是在`created`之间，所以组件才刚刚被创建，而`data`和`methods`还没初始化好，所以无法在setup中使用data和methods
3. ` setup`中`this`指向`undefined`
4. `setup`只能是同步的，不能是异步的

## 递归监听和非递归监听

我们知道ref函数和reactive函数用于将一个普通数据变成一个响应式的数据。当数据发生改变时，界面也会立即更新。 其实还有一个规律，就是是深度监听数据的每一层，我们称之为递归监听
```js
import { reactive } from "vue";
export default {
  setup() {
   const alice =  { 
      name: "Alice", 
      age: 80,
      sex: 'female',
      child:{
        name:'Tom',
        sex: 'male',
        age:59,
        child:{
          name:'Frank',
          sex: 'male',
          age:30,
          child:{
            name:'Blue',
            sex: 'male',
            age:3
          }
        }
    }}
    const AliceFamily = reactive(alice );
    return { AliceFamily };
  },
};
```
如上例子`，vue`会通过`reactive`函数将我们传递的对象`alice`的每一层打包成一个`proxy`对象，深度监听对象的每一层的每一个数据，当任意一层的任意一个数据发生改变，`vue`都会检测到，并更新对应的`UI`
`ref`也是类似，因为ref的本质也是`reactive`
```scss
ref(12)  相当于  reactive({value:12})
```

递归监听的好处显而易见，可以监听到每一个数据的变化，但正因为要监听每一个数据，当数据非常复杂时，`vue`要讲每个数据都通过Proxy包装一次，数据量大的话这个过程是非常消耗性能的。所以为了解决这个问题，`vue3`提供了两个函数用于创建浅度监听数据，即`非递归监听` 。这两个函数是：
1.  `shallowRef`
2. ` shallowReactive`

使用过程中需要注意：
- 如果是通过`shallowRef`创建数据，那么`vue`监听的是`.value`的变化，而不是第一层的变化
- 另外vue3还提供了`triggerRef`函数，用于手动更新界面UI。但是没有提供`triggerReactive`，所以如果是`reactive`的数据，那是无法手动触发界面更新的。

那有人会想：在什么情况下用递归监听，什么情况下用非递归监听呢？
其实只要记住，非递归监听是为了解决监听数据量大的问题而出现的，所以只有当数据量非常大时，我们才考虑用`shallowRef`和`shallowReactive`，一般情况下都使用`ref`和`reactive`

## toRef函数和toRefs函数

我们知道`ref`可以用于创建一个响应式数据，而`toRef`也可以创建一个响应式数据，那他们之间有什么区别呢？

事实上，如果利用`ref`函数将某个对象中的属性变成响应式数据，修改响应式数据是不会影响到原始数据。
```js
import {ref} from 'vue';
export default {
  name:'App'
  setup(){
    let obj = {name : 'alice', age : 12};
    let newObj= ref(obj.name);
    function change(){
      newObj.value = 'Tom';
      console.log(obj,newObj)
    }
    return {newObj,change}
  }
}
```

上述代码，当`change`执行的时候，响应式数据发生改变，而原始数据`obj`并不会改变。

>原因在于，`ref`的本质是拷贝，与原始数据没有引用关系

需要注意ref(obj.name)相当于ref('alice')相当于reactive({value:'alice'}) 所以在修改数据时，是修改newObj.value=xxx

而如果使用`toRef`将某个对象中的属性变成响应式数据，修改响应式数据是会影响到原始数据的。但是需要注意，如果修改通过`toRef`创建的响应式数据，并不会触发`UI`界面的更新。

>所以，toRef的本质是引用，与原始数据有关联
```js
import {toRef} from 'vue';
export default {
  name:'App'
  setup(){
    let obj = {name : 'alice', age : 12};
    let newObj= toRef(obj, 'name');
    function change(){
      newObj.value = 'Tom';
      console.log(obj,newObj)
    }
    return {newObj,change}
  }
}
```
>上述代码，当change执行的时候，响应式数据发生改变，原始数据obj并不会改变，但是UI界面不会更新

_小结：_
`ref和toRef的区别`

`(1). ref本质是拷贝，修改响应式数据不会影响原始数据；toRef的本质是引用关系，修改响应式数据会影响原始数据`

`(2). ref数据发生改变，界面会自动更新；toRef当数据发生改变是，界面不会自动更新`

`(3). toRef传参与ref不同；toRef接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性`

所以如果想让响应式数据和以前的数据关联起来，并且想在更新响应式数据的时候不更新`UI`，那么就使用`toRef`

有的时候，我们希望将对象的多个属性都变成响应式数据，并且要求响应式数据和原始数据关联，并且更新响应式数据的时候不更新界面，就可以使用`toRefs`，用于批量设置多个数据为响应式数据。(toRef一次仅能设置一个数据)

`toRefs`接收一个对象作为参数，它会遍历对象身上的所有属性，然后挨个调用`toRef`执行

_例如_

```js
import {toRefs} from 'vue';
export default {
  name:'App'
  setup(){
    let obj = {name : 'alice', age : 12};
    let newObj= toRefs(obj);
    function change(){
      newObj.name.value = 'Tom';
      newObj.age.value = 18;
      console.log(obj,newObj)
    }
    return {newObj,change}
  }
}
```

## 如何通过ref属性获取元素
在`vue2.x`中，可以通过给元素添加`ref='xxx`'属性，然后在代码中通过this.$refs.xxx获取到对应的元素

然而在`vue3`中时没有`$refs`这个东西的，因此`vue3`中通过`ref`属性获取元素就不能按照`vue2`的方式来获取

`vue3`需要借助生命周期方法，原因很简单，在`setup`执行时，`template`中的元素还没挂载到页面上，所以必须在`mounted`之后才能获取到元素。

```js
<template>
  <div ref='box'>I am DIV</div>
</template>
<script>
import {ref,onMounted}
export default{
  setup(){
    let box = ref(null);
    onMounted(()=>{
      console.log(box.value)
    });
    return {box}
  }
}
</script>
```

如上代码，`vue3`中，所有生命周期方法都抽离出去了，需要用时直接`import` 。这里导入了一个`onMounted`

当界面挂载出来的时候，就会自动执行`onMounted`的回调函数，里头就可以获取到dom元素

_小结_

1. 在compositionAPI中如何使用生命周期函数？

`需要用到哪个生命周期函数，就将对应函数的import进来，接着在setup中调用即可`

2. vue3如何通过ref属性获取界面上的元素?

`在template中的写法跟vue2一样，给元素添加个ref='xxx'`

`在setup中，先创建一个响应式数据，并且要把响应式数据暴露出去`

`当元素被创建出来的适合，就会给对应的响应数据赋值`

`当响应式数据被赋值之后，就可以利用生命周期方法，在生命周期方法中获取对应的响应式数据，即DOM元素`

## Vue3中全局API改为应用程序实例调用
`vue3`中存在一些具有破坏性的变更，比如`Global API`改为应用程序实例调用
`Vue2`中很多全局`API`会改变`vue`的行为，全局的`API`会导致一些问题：

1. `Vue2`没有`app`的概念，`new Vue()`得到的根实例作为`app`，这样所有创建的根实例`app`都是共享相同的全局配置，这在测试时会污染其他测试用例，导致测试困难
2. 全局配置也导致没有办法在单页面创建不同全局配置的多个`app`实例

所以，`Vue3`使用`createApp`函数返回应用程序实例`app`，并由这个`app`实例暴露一系列的全局`API`
比如，`Vue2`中`Vue.component`变更为如下形式

```js
import { createApp, h } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)
    .component('comp', { render: () => h('div', 'i am comp!!!') })
    .mount('#app')
```
可以看到，`Vue2`中通过`Vue`的构造函数调用`component`创建全局组件，现在变成有应用实例`app`调用的形式
类似的变更(`Vue.component`变更为`app.component`)还有：

`1. Vue.directive变更为app.directive`

`2. Vue.mixin变更为app.mixin`

`3. Vue.use变更为app.use`

`4. Vue.config变更为app.config`

`5. Vue.config.ignoredElements变更为app.config.ignoredElements`

注意：`Vue.config.productionTip`和`Vue.filter`在`Vue3`中被移除

## Vue3中生命周期函数的变化
我们知道，在每个组件在被创建时，要经过一系列的初始化过程，比如，需要设置数据监听、编译模板、实例挂载并在数据变化时触发`DOM`更新等。
在`Vue2`中提供了生命周期钩子函数，如 `beforeCreate` 、`created` 、`beforeMount` 、`mounted` 、`beforeUpdate`、`updated`、`beforeDestory`、`destoryed`等，用于在组件不同阶段执行一些我们想要的执行的操作
到了`Vue3`，有所变化

`1. beforeCreate ---->setup`

`2. created  ---->setup`

`3. beforeMount  ---->onBeforeMount`

`4. mounted  ---->onMounted`

`5. beforeUpdate ---->onBeforeUpdate`

`6. updated ---->onUpdated`

`7. beforeDestory ---->onBeforeUnmount`

`8. destoryed ---->onUnmounted`

可以看到，`setup` 函数代替了` beforeCreate` 和`created` 两个生命周期函数，因此我们认为`setup`的执行时间在`beforeCreate` 和` created` 之间

为了更好的`Tree-shaking`，`Vue3`的生命周期函数都是从 vue 中导入，再进行直接调用

```js
//从 vue 中引入 多个生命周期函数
import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated, 
  onBeforeUnmount, unMounted} from 'vue'
export default {
  name: 'App',
  setup() {
    onBeforeMount(() => {
      // 在挂载前执行
    })
    onMounted(() => {
      // 在挂载后执行
    })
    onBeforeUpdate(() => {
      // 在更新前前执行
    })
    onUpdated(() => {
      // 在更新后执行
    })
    onBeforeUnmount(() => {
      // 在组件销毁前执行
    })
    unMounted(() => {
      // 在组件销毁后执行
    })
    return {}
  }
  
}
```
以上就个人的一些学习笔记，不一定都正确！

