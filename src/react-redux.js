import React, { Component } from 'react'
import PropTypes from 'prop-types'

// const mapStateToProps = (state) => {
//   return {
//     themeColor: state.themeColor,
//     themeName: state.themeName,
//     fullName: `${state.firstName} ${state.lastName}`
//     ...
//   }
// }

export const connect = (mapStateToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    constructor () {
      super()
      this.state = { allProps: {} }
    }

    componentWillMount () {
      const { store } = this.context
      // 调用 _updateProps 进行初始化
      this._updateProps()
      // store.subscribe 监听数据变化
      store.subscribe(() => this._updateProps())
    }

    _updateProps () {
      // 为了解决 context 强耦合性以及组件可复用性的问题，引入高阶组件
      // 高阶组件和 context 打交道，把里面数据取出来通过 props 传给 Dumb 组件（指的是呆呆组件）。
      const { store } = this.context
      let stateProps = mapStateToProps(store.getState(), this.props) // 额外传入 props，让获取数据更加灵活方便
      this.setState({
        allProps: { // 整合普通的 props 和从 state 生成的 props
          ...stateProps,
          ...this.props
        }
      })
    }

    render () {
      // 被包装的组件，props 
      return <WrappedComponent {...this.state.allProps} />
    }
  }
  return Connect
}

// connect 现在是接受一个参数 mapStateToProps，然后返回一个函数，这个返回的函数才是高阶组件。
// 它会接受一个组件作为参数，然后用 Connect 把组件包装以后再返回。
// connect 的用法是：

// const mapStateToProps = (state) => {
//   return {
//     themeColor: state.themeColor
//   }
// }
// Header = connect(mapStateToProps)(Header)

// 有些朋友可能会问为什么不直接 const connect = (mapStateToProps, WrappedComponent)，而是要额外返回一个函数。
// 这是因为 React-redux 就是这么设计的，而个人观点认为这是一个 React-redux 设计上的缺陷。