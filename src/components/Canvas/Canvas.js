import React, { Component } from 'react';

import drawMemeText from '../../lib/canvasText';

class Canvas extends Component {

  constructor(props) {
    super(props);
    this.afterRender = this.afterRender.bind(this);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.afterRender();
  }
  componentDidUpdate() {
    this.afterRender();
  }

  afterRender() {
    const {
      text,
      context = 'upper',
      width,
      height
    } = this.props;
    if (text === '' || !height) {
      return;
    }
    const ctx = this.canvasRef.current.getContext('2d')
    
    if (context === 'upper') {
      drawMemeText(ctx, context, text, width, 50);
    } else {
      drawMemeText(ctx, context, text, width, height - 50);
    }
  }

  render() {
    const { 
      text,
      width,
      height
    } = this.props;

    if (text === '' || !height) {
      return null;
    }

    return (
      <canvas ref={this.canvasRef} width={width} height={height} />
    );
  }
}

export default Canvas;
