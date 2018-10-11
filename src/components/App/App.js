import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import Canvas from '../Canvas/Canvas';

import './App.sass';

class App extends Component {
  constructor(props) {
    super(props);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onButtonDownloadClick = this.onButtonDownloadClick.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onChangeUpperText = this.onChangeUpperText.bind(this);
    this.onChangeLowerText = this.onChangeLowerText.bind(this);

    const randomMemeIndex = Math.floor(Math.random() * (props.memes.length - 1));
    // initally set state
    this.state = { 
      currentMemeIndex: randomMemeIndex,
      upperText: 'upper text',
      lowerText: 'lower text',
      loadedImageHeight: 0,
      loadedImageWidth: 0
    };
  }

  static inputTimeout = 300;

  onImageLoad(event) {
    const imageElement = event.target;
    this.setState({
      loadedImageHeight: imageElement.height,
      loadedImageWidth: imageElement.width,
    });
  }

  onButtonClick() {
    // subsequent set state.. beware, this is asynchronous and will cause a new render cycle
    this.setState({ currentMemeIndex: Math.floor(Math.random() * (this.props.memes.length - 1)) });
  }

  onButtonDownloadClick() {
    const {
      loadedImageHeight,
      loadedImageWidth
    } = this.state;

    const imageElement = document.getElementsByTagName('img')[0];
    const uppertext = document.getElementsByTagName('canvas')[0];
    const lowerText = document.getElementsByTagName('canvas')[1];

    // create another canvas to combine the others
    let targetCanvas = document.createElement("canvas");
    targetCanvas.width = loadedImageWidth;
    targetCanvas.height = loadedImageHeight;
    let tctx = targetCanvas.getContext('2d');

    // make sure bg is white!
    tctx.beginPath();
    tctx.rect(0, 0, loadedImageWidth, loadedImageHeight);
    tctx.fillStyle = "white";
    tctx.fill();

    // draw layers
    tctx.drawImage(imageElement, 0, 0, loadedImageWidth, loadedImageHeight);   
    tctx.drawImage(uppertext, 0, 0, loadedImageWidth, loadedImageHeight);     
    tctx.drawImage(lowerText, 0, 0, loadedImageWidth, loadedImageHeight);

    // add watermark   
    const text = `I'm the watermark`;
    tctx.font = "10px verdana";
    const textWidth = tctx.measureText(text).width;
    tctx.globalAlpha = .50;
    tctx.fillStyle = 'white';
    tctx.lineWidth = 1;
    tctx.strokeStyle = '#000';
    tctx.strokeText(text, loadedImageWidth-textWidth-10+2, loadedImageHeight-10+2);
    tctx.fillText(text, loadedImageWidth-textWidth-10+2, loadedImageHeight-10+2);

    // metadata can only be done on server..
    // http://stackoverflow.com/questions/18297120/html5-resize-image-and-keep-exif-in-resized-image
    const output = targetCanvas.toDataURL('image/jpeg');

    const link = document.createElement('a');
    link.download = `react_meme_${this.generateName()}`;
    link.href = output;
    // firefox..
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // TODO: put into lib
  generateName = () => {
    let i, n;
    n = [];
    i = 0;
    while (i < 10) {
      n.push(Math.floor(Math.random() * 16).toString(16));
      i++;
    }
    return n.join('');
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
  
  // readability helpers
  getMemeUrl = meme => Object.values(meme)[0];
  getMemeTitle = meme => Object.keys(meme)[0];

  render() {
    const { memes } = this.props;
    const {
      currentMemeIndex, 
      upperText, 
      lowerText, 
      loadedImageHeight,
      loadedImageWidth
    } = this.state;
    
    let options = [];
    let defaultSelectValue = this.getMemeUrl(memes[currentMemeIndex]);
    
    // build options
    memes.forEach((meme, index) => {
      const url = this.getMemeUrl(meme);
      const title = this.getMemeTitle(meme);
      if (index === currentMemeIndex) {
        defaultSelectValue = url;
      }
      options.push(
        <option value={url} key={'option' + index}>{title}</option>
      );
    });

    return (
      <div className="workshop-app grid-container" >
        <select onChange={this.onImageChange} value={defaultSelectValue}>
          {options}
        </select>
        
        <DebounceInput
          minLength={0}
          debounceTimeout={this.inputTimeout}
          value={upperText} onChange={this.onChangeUpperText}
        />
        <DebounceInput
          minLength={0}
          debounceTimeout={this.inputTimeout}
          value={lowerText} onChange={this.onChangeLowerText}
        />
        
        <button onClick={this.onButtonClick} type="button" className="button button">
          Random Image
        </button>

        <button onClick={this.onButtonDownloadClick} type="button" className="success button">
          Download Image
        </button>

        <p className="title">{this.getMemeTitle(memes[currentMemeIndex])}</p>
        <div className="imageWrapper">
          <img src={this.getMemeUrl(memes[currentMemeIndex])} alt="" crossOrigin="Anonymous" onLoad={this.onImageLoad} />
          <Canvas text={upperText} context={"upper"} width={loadedImageWidth} height={loadedImageHeight} />
          <Canvas text={lowerText} context={"lower"} width={loadedImageWidth} height={loadedImageHeight} />
        </div>
      </div>
    );
  }
}

export default App;
