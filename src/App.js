import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import logo from "./logo.svg"
import "./App.css"
import Home from "./component/Home"
import About from "./component/About"
import Topics from "./component/Topics"

// const Home = () => {
//   return <h1>home</h1>
// }
// const About = () => {
//   return <h1>About</h1>
// }
// const Topics = props => {
//   // React获取浏览器参数 this.props.match,在控制台答应this.props 可以发现页面的url信息全部都包含在match字段中，
//   // this.props.match中有其中一下信息：
//   // history：包含了组件可以使用的各种路由系统的方法，常用的有 push 和 replace，两者都是跳转页面，但是 replace 不会引起页面的刷新，仅仅是改变 url。
//   // location：相当于URL 的对象形式表示，通过 search 字段可以获取到 url 中的 query 信息。（这里 state 的含义与 HTML5 history.pushState API 中的 state 对象一样。每个 URL 都会对应一个 state 对象，你可以在对象里存储数据，但这个数据却不会出现在 URL 中。实际上，数据被存在了 sessionStorage 中）（参考： 深入理解 react-router 路由系统）
//   // match：包含了具体的 url 信息，在 params 字段中可以获取到各个路由参数的值。
//   //举例：
//   //   // localhost:3000/app/knowledgeManagement/modify/STY20171011124209535/3/1507701970070/0/?s=1&f=7
//   // // localhost:3000/app/knowledgeManagement/modify/:studyNo/:stepId/:randomNum/:isDefault/?s=1&f=7

//   // // 获取 studyNo
//   // this.props.match.match.params.studyNo // STY20171011124209535

//   // // 获取 stepId
//   // this.props.match.match.params.stepId // 3

//   // // 获取 success
//   // const query = this.props.match.location.search // '?s=1&f=7'
//   // const arr = query.split('&') // ['?s=', 'f=7']
//   // const successCount = arr[0].substr(3) // '1'
//   // const failedCount = arr[1].substr(2) // '7'
//   const match = props.match
//   return (
//     <div>
//       <h1>Topics</h1>
//       <ul>
//         <li>
//           <Link to={`${match.url}/rendering`}>渲染1</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/component`}>渲染2</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/zzzz`}>渲染3</Link>
//         </li>
//       </ul>
//       {/* topicId是相当于把这个地址斜杠后的部分当成参数来进行传递 */}
//       <Route path={`${match.url}/:topicId`} component={Topic} />
//       <Route exact path={match.url} render={() => <h3>请选择对应渲染</h3>} />
//     </div>
//   )
// }
// const Topic = props => {
//   const match = props.match
//   return <h1>{match.params.topicId}</h1>
// }
//授权组件，在访问Protected组件时，需要查看它的登录状态，如果已经登录了则可以直接访问Protected组件，
// 如果没有登录，则必须跳去登录 Login组件
const Protected = () => {
  return <h1>Protected</h1>
}
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refer: false
    }
  }
  //定义登录方法
  login = () => {
    isLogin = true
    this.setState({
      refer: true
    })
  }

  render() {
    // 如果有来源路径则跳转至来源路径，没有的话则跳至首页
    const { from } = this.props.location.state || { from: { pathname: "/" } }
    if (this.state.refer) {
      return (
        <div>
          <Redirect to={from} />
        </div>
      )
    }
    return (
      <div>
        <h1>you need to login</h1>
        <button onClick={this.login}>Login</button>
      </div>
    )
  }
}

let isLogin = false //定义个变量来代表登录状态
//定义私有组件 ，Redirect跳转至哪里，state:{from:props.location} 是跳转至新的页面时，记录原来的地址，也就是从哪里来的地址
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <Router>
          {/* Link标签必须写在Router标签里面，并且Router标签里面只能有一个根标签结点 */}
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
              <li>
                <Link to="/protected">Protected</Link>
              </li>
            </ul>
            {/* Route主要是用于让路径与相对应的组件进行匹配，exact代表精确匹配 */}
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/protected" component={Protected} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
