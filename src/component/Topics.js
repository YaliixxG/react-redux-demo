import React, { Component } from "react"
import {
  Route,
  Link,
} from "react-router-dom"
import Topic from'./Topic'
// const Topic = props => {
//   const match = props.match
//   return <h1>{match.params.topicId}</h1>
// }
export default class Topics extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const match =this.props.match
    return (
      <div>
        <h1>Topics</h1>
        <ul>
          <li>
            <Link to={`${match.url}/rendering`}>渲染1</Link>
          </li>
          <li>
            <Link to={`${match.url}/component`}>渲染2</Link>
          </li>
          <li>
            <Link to={`${match.url}/zzzz`}>渲染3</Link>
          </li>
        </ul>
        {/* topicId是相当于把这个地址斜杠后的部分当成参数来进行传递 */}
        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route exact path={match.url} render={() => <h3>请选择对应渲染</h3>} />
      </div>
    )
  }
}
