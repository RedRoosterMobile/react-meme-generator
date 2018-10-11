import React, { Component } from 'react';

import { DebounceInput } from 'react-debounce-input';

import './App.sass';

class App extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onChangeUpperText = this.onChangeUpperText.bind(this);
    this.onChangeLowerText = this.onChangeLowerText.bind(this);

    const randomMemeIndex = Math.floor(Math.random() * (props.memes.length - 1));
    // initally set state
    this.state = { 
      currentMemeIndex: randomMemeIndex,
      upperText: 'upperText',
      lowerText: 'lowerText'
    };
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
    this.setState({ currentMemeIndex: Math.floor(Math.random() * (this.props.memes.length - 1)) });
  }

  onImageChange(event) {
    const newIndex = this.props.memes.map((meme) => this.getMemeUrl(meme)).indexOf(event.target.value);
    this.setState({
      currentMemeIndex: newIndex
    });
  }

  onChangeUpperText(event) {
    this.setState({
      upperText: event.target.value
    });
  }

  onChangeLowerText(event) {
    this.setState({
      lowerText: event.target.value
    });
  }
  
  // helpers
  getMemeUrl = meme => Object.values(meme)[0];
  getMemeTitle = meme => Object.keys(meme)[0];

  render() {
    const { memes } = this.props;
    const { currentMemeIndex, upperText, lowerText } = this.state;

    let options = [];
    let defaultValue = this.getMemeUrl(memes[currentMemeIndex]);
    // build options
    memes.forEach((meme,index) => {
      const url = this.getMemeUrl(meme);
      const title = this.getMemeTitle(meme);
      if (index === currentMemeIndex)
        defaultValue = url;
      const newOption = <option value={url} key={'option' + index}>{title}</option>
      options.push(newOption);
    });

    return (
      <div className="workshop-app">
        <select onChange={this.onImageChange} value={defaultValue}>
          {options}
        </select>
        
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          value={upperText} onChange={this.onChangeUpperText}
        />
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          value={lowerText} onChange={this.onChangeLowerText}
        />
        
        <button className="whatever" onClick={this.onButtonClick}>
          Random Image
        </button>
        <p className="title">{this.getMemeTitle(memes[currentMemeIndex])} {currentMemeIndex}</p>
        <div className="imageWrapper">
          <img src={this.getMemeUrl(memes[currentMemeIndex])} alt="" />
        </div>
      </div>
    );
  }
}

export default App;
