import React,{Component} from 'react';

export default class Topic extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const match =this.props.match
        return <h1>{match.params.topicId}</h1>
    }
}