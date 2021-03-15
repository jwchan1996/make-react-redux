# make-react-redux

## example description

![image](https://ae01.alicdn.com/kf/U8a6a65bc19ef4d1da30743b5d7758227C.jpg)

## 结合 context 和 store

将 store 放到父组件 context 对象中，子组件通过 context 获取 store，调用 store.dispatch() 方法时会调用 store.subscribe() 方法传入的函数，从而在函数中获取更改后的 store.state，然后调用 this.setState() 更改组件对对应的 state，从而让组件重新渲染。

## connect 和 mapStateToProps

### 存在问题

- 有大量重复的逻辑
- 对 context 依赖性过强

### 解决问题

我们需要高阶组件帮助我们从 context 取数据，我们也需要写 Dumb 组件帮助我们提高组件的复用性。所以我们尽量多地写 Dumb 组件，然后用高阶组件把它们包装一层，高阶组件和 context 打交道，把里面数据取出来通过 props 传给 Dumb 组件。

![image](https://ae01.alicdn.com/kf/U82acf931211e4fa2a3794e7d7724dd22o.jpg)

我们把这个高阶组件起名字叫 connect，因为它把 Dumb 组件和 context 连接（connect）起来了。

## mapDispatchToProps

既然可以通过给 connect 函数传入 mapStateToProps 来告诉它如何获取、整合状态，我们也可以想到，可以给它传入另外一个参数来告诉它我们的组件需要如何触发 dispatch。我们把这个参数叫 mapDispatchToProps：

```js
const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    }
  }
}
```