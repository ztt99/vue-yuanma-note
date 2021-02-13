### Runtime Only VS Runtime Compiler
- Runtime Only : 需要借助webpack的vue-loader,在编译的时候进行运行。代码提及较小
- Runtime Compiler : 我们如果没有对代码做预编译，但又使用了Vue的template属性并传入一个字符串，则需要在客户端编译模板,对性能还有一定的损耗。

- 传入的options，el/template/render最终都会转换为render函数

### 数据映射到DOM

- 实现vm.data 

1. data = vm._data = options.data
2. 遍历data,在vm上注册key，返回vm._data[key] ---> proxy函数

- $mount

1. entry-runtime-with-compiler在这个文件中对mount进行扩展。
2. 判断不存在render函数时template的处理
3. 将dom转为字符串赋值给template,转化为render函数,挂载到options上
4. 调用原来的/runtime/index中的mount方法，lifecycle中创建渲染watcher 
5. 调用vm._render调用vm._update


- renderMixin

1. 在Vue实例上挂载_render方法
2. 内部调用options上的render，传入vm.$createElement===render(h){}中的h，返回vnode

- vm.$createElement

1. 调用_createElement  返回vnode
2. 传入的vnode属性数据不可以是响应式
3. 自己传入的render函数。简单数据类型：返回text类型的vnode。复杂数据类型：返回一个vnode的数组









