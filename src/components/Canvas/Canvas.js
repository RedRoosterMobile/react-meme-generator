import React, { Component } from 'react';

import drawMemeText from '../../lib/canvasText';
class Canvas extends Component {

  constructor(props) {
    super(props);
    this.renderJsx = this.renderJsx.bind(this);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.renderJsx();
  }
  componentDidUpdate() {
    this.renderJsx();
  }

  renderJsx() {
    const { 
      text,
      context = 'upper',
      width,
      height
    } = this.props;
    if (text == '' || !height) {
      return;
    }
    const ctx = this.canvasRef.current.getContext('2d')
    
    if (context === 'upper')
      drawMemeText(ctx, context, text, width, 50);
    else
      drawMemeText(ctx, context, text, width, height - 50)
  }

  render() {
    const { 
      text,
      context = 'upper',
      width,
      height
    } = this.props;

    if (text == '' || !height) {
      return null;
    }

    return (
      <canvas ref={this.canvasRef} width={width} height={height} />
    );
  }
}

export default Canvas;
