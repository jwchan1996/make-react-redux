import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from './react-redux'

class Header extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  render () {
    return (
      <h1 style={{ color: this.props.themeColor }}>React.js 小书</h1>
    )
  }
}

// Header 删掉了大部分关于 context 的代码，它除了 props 什么也不依赖，它是一个 Pure Component，然后通过 connect 取得数据。
// 我们不需要知道 connect 是怎么和 context 打交道的，只要传一个 mapStateToProps 告诉它应该怎么取数据就可以了。

const mapStateToProps = (state) => {
  return { 
    themeColor: state.themeColor
  }
}

// 此处 Header 是 Connect 组件，Connect 组件的 render 方法返回 Header 组件，Connect 会给 Header 组件传入 props
// 传入的 props 包括父组件的 context 以及外界传入的 props（指直接通过组件属性传入的 props）
Header = connect(mapStateToProps)(Header) 

export default Header