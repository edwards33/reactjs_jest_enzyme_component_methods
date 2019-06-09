import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    on: false,
    input: '',
    mainColor: 'blue',
    lifeCycle: ''
  }

  handleStrings(str){
    return str.length !== 0
  }

  componentDidMount(){
    this.setState({ lifeCycle: 'componentDidMount' })
  }
  
  componentWillReceiveProps(){
    this.setState({ lifeCycle: 'componentWillReceiveProps' })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Title</h1>
          <h2 className={this.state.mainColor}>Test Event Handlers</h2>
        </header>
        <p className="App-int">Some text</p>
        <p className='button-state'>{this.state.on ? 'YES' : 'NO'}</p>
        <button onClick={() => this.setState({on: true})}>Set Yes or No</button>
        <h3>{this.state.input}</h3>
        <input onChange={(e) => this.setState({input: e.currentTarget.value})} type = 'text'/>
        <p className='lifeCycle'>{this.state.lifeCycle}</p>
      </div>
    )
  }
}

export class Link extends Component {
  render(){
    return <a href={this.props.address}>Click</a>
  }
}

export class LinkOpt extends Component {
  render(){
    return this.props.hide ? null : <a href={this.props.address}>Click</a>
  }
}

export default App;
