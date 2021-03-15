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

## Provider

额外构建一个组件来做这种脏活，然后让这个组件成为组件树的根节点，那么它的子组件都可以获取到 context 了。

我们把这个组件叫 Provider，因为它提供（provide）了 store：

![image](https://ae01.alicdn.com/kf/U831d23661a52446ba6358b67a785ab3bT.jpg)

Provider 做的事情也很简单，它就是一个容器组件，会把嵌套的内容原封不动作为自己的子组件渲染出来。它还会把外界传给它的 props.store 放到 context，这样子组件 connect 的时候都可以获取到。

## 总结

React.js 除了状态提升以外并没有更好的办法帮我们解决组件之间共享状态的问题，而使用 context 全局变量让程序不可预测。通过 Redux 的章节，我们知道 store 里面的内容是不可以随意修改的，而是通过 dispatch 才能变更里面的 state。所以我们尝试把 store 和 context 结合起来使用，可以兼顾组件之间共享状态问题和共享状态可能被任意修改的问题。

第一个版本的 store 和 context 结合有诸多缺陷，有大量的重复逻辑和对 context 的依赖性过强。我们尝试通过构建一个高阶组件 connect 函数的方式，把所有的重复逻辑和对 context 的依赖放在里面 connect 函数里面，而其他组件保持 Pure（Dumb） 的状态，让 connect 跟 context 打交道，然后通过 props 把参数传给普通的组件。

而每个组件需要的数据和需要触发的 action 都不一样，所以调整 connect，让它可以接受两个参数 mapStateToProps 和 mapDispatchToProps，分别用于告诉 connect 这个组件需要什么数据和需要触发什么 action。

最后为了把所有关于 context 的代码完全从我们业务逻辑里面清除掉，我们构建了一个 Provider 组件。Provider 作为所有组件树的根节点，外界可以通过 props 给它提供 store，它会把 store 放到自己的 context 里面，好让子组件 connect 的时候都能够获取到。

> react-redux.js 这个文件里面的两个内容：connect 函数和 Provider 容器组件。

> 引用 http://huziketang.com/books/react/lesson41