import React, { Component } from 'react';
import './App.sass';

class App extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);

    // initally set state
    this.state = { currentMemeIndex: 0 };
  }

  afterRender() {
    console.log('just rendered the jsx');
  }

  // homework: watch these, when happens what? I will ask you next time!

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.afterRender();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    this.afterRender();
  }

  onButtonClick() {
    // subsequent set state.. beware, this is asynchronous and will cause a new render cycle
    this.setState({ currentMemeIndex: Math.floor(Math.random() * 10) });
  }

  render() {
    const { memes } = this.props;
    const { currentMemeIndex } = this.state;

    return (
      <div className="workshop-app">
        <img src={memes[currentMemeIndex]} />
        <button className="whatever" onClick={this.onButtonClick}>
          Press Me!
        </button>
        <p className="title">Homework Title goes here: {currentMemeIndex}</p>
      </div>
    );
  }
}

export default App;
