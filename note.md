### Runtime Only VS Runtime Compiler
- Runtime Only : 需要借助webpack的vue-loader,在编译的时候进行运行。代码提及较小
- Runtime Compiler : 我们如果没有对代码做预编译，但又使用了Vue的template属性并传入一个字符串，则需要在客户端编译模板,对性能还有一定的损耗。

- 传入的options，el/template/render最终都会转换为render函数

### 数据映射到DOM

- 实现vm.data 

1. data = vm._data = options.data
2. 遍历data,在vm上注册key，返回vm._data[key] ---> proxy函数

#### $mount

1. entry-runtime-with-compiler在这个文件中对mount进行扩展。
2. 判断不存在render函数时template的处理
3. 将dom转为字符串赋值给template,转化为render函数,挂载到options上
4. 调用原来的/runtime/index中的mount方法，lifecycle中创建渲染watcher 
5. 调用vm._render调用vm._update


#### renderMixin

1. 在Vue实例上挂载_render方法
2. 内部调用options上的render，传入vm.$createElement===render(h){}中的h，返回vnode

#### vm.$createElement

1. 调用_createElement  返回vnode
2. 传入的vnode属性数据不可以是响应式
3. 自己传入的render函数。简单数据类型：返回text类型的vnode。复杂数据类型：返回一个vnode的数组

#### patch

1. 目录：platforms/web/runtime/index
2. 柯理化函数，将dom操作的方法和属性的方法传入，返回patch方法
3. 初次渲染
  - 将vnode传入，通过createElement创建真实dom
  - 将真是dom替换为vnode


### 组件化

1. 如果createElement中传入对象
2. createComponent --> extend
3. 返回一个Sub构造函数。内部调用Vue实例上的_init，函数内部merge了Vue.options，将Vue的一些方法挂载到Sub组件上，并将原型指向Vue.prototype。将Vue挂载到组件的super上
4. 创建vnode

### 组件patch

1. patch -> createElm -> createComponent -> 
2. 问题1 ：什么时候编译的app.vue
  createRender函数传入App，调用patch，createElm，createComponent，组件hook，init，createComponentInstanceForVnode,传入组件vnode，当前vm
  createComponentInstanceForVnode创建对象
  {
    _isComponent: true,
    _parentVnode: vnode, //组件占位
    parent //当前vm 
  }

  执行Ctor构造器，执行_init


  在_init中，执行initInternalComponent(vm,options)

  返回子组件实例

  child.$mount

  创建渲染watcher

  执行patch




3. 问题2 ：什么时候编译helloWord

4. 问题3 ：componentOptions在哪里

创建Vnode时传入的参数


### 组件patch

1. oldVnode:div#app  vnode:app.vue 通过vue-loader转为rnder函数
2. createElm -> createComponent ->  是组件 -> init -> child = vnode.componentInstance = createComponentInstanceForVnode = 当前vm实例 = >  
_isComponent: true,
_parentVnode: vnode,  //占位符vnode
parent: parent  //当前vm实例
=> new vnode.componentOptions.Ctor(options)
=> 在init中initInternalComponent传入vm,options
=> 将上一个vm赋值给当前属性的parent，当前_parentVnode赋值为上一个的占位符
=> 执行...
=> 创建渲染watcher
=> 再次patch
=> 不是组件
=> 执行createElm，内部调用createChildren，递归createElm
=> _render vm.$vnode = _parentVnode  //占位符vnode
=> _update vm._vnode = vnode //渲染vnode


### 配置合并

1. 外部场景调用合并配置

2. 组件场景的配置合并


### 生命周期

beforeCreate

获取vuex，router

created

lifecycle

beforeMount 先父后子

patch
  子组件的钩子函数
  invokeInsertHook
  执行insert钩子
  mounted  子组件优先父组件
deforeupdate

updated

如果这个watcher是渲染watcher，并且已经mounted过了，那么执行hook-updated

beforeDestroy
  先父后子
  先销毁父组件
  => 调用patch并将第二个参数传为null
  => 递归销毁子组件
destroyed
  先子后父

### 组件注册

全局注册

global-api

=> 将组件绑定到全局Vue.components上,创建当前组件的vm实例
=> create-element时创建组件vnode
=> 在创建elm时，去实例上的options中找components，如果实例上没有，那么找Vue.components上



局部注册

=> 在创建vnode时，在自身的components中寻找组件


执行render函数
=> createElement 
=> tag不是string -> App
=> 创建vnode vue-component-app
=> 执行patch  el此时为调用的$mount(#app) oldVnode //el-dom vnode //组件app
=> createElm 将vnode创建为dom  内部检测是否存在hook->init 存在，app组件生成渲染watcher
  -> vue-component-app 
  -> hook->init -> mount -> rernder -> 执行render -> createElement -> 不是普通标签 -> holloword -> 在对象中的componrnts中找到holloword -> 返回Ctor构造器

=> init -> render函数 -> createElemtn -> tag是字符串 -> 是全局的组件 -> 找到Ctor -> createComponent 创建vnode
=> patch




































