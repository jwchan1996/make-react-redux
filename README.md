# make-react-redux

## example description

![image](https://ae01.alicdn.com/kf/U8a6a65bc19ef4d1da30743b5d7758227C.jpg)

## 结合 context 和 store

将 store 放到父组件 context 对象中，子组件通过 context 获取 store，调用 store.dispatch() 方法时会调用 store.subscribe() 方法传入的函数，从而在函数中获取更改后的 store.state，然后调用 this.setState() 更改组件对对应的 state，从而让组件重新渲染。