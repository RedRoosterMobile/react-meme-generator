/*
usage:

drawMemeText(ctx, 'upper', text, width, 50);
drawMemeText(ctx, 'lower', text, width, height - 50);

*/

var drawMemeText, drawText, wrap;

drawMemeText = function(ctx, type, text, width, y) {
  var size, strs, val;
  // clean image before drawing
  ctx.clearRect(0, 0, width, 9999);
  text = text.toUpperCase();
  //Determine the font size
  if (text.length < 24) {
    val = Math.max(0, text.length - 12);
    size = 70 + val * -3;
    drawText(ctx, size, text, width / 2, y);
  } else if (text.length < 29) {
    drawText(ctx, 40, text, width / 2, y);
  } else {
    strs = wrap(text, 27);
    strs.forEach(function(str, i) {
      drawText(ctx, 40, str, width / 2, type === 'lower' ? y - ((strs.length - 1) * 40) + i * 40 : y + i * 40);
    });
  }
};

drawText = function(ctx, size, text, x, y) {
  //Set the text styles
  // make sure the fallback-font is there
  // https://www.google.com/fonts#UsePlace:use/Collection:Anton
  ctx.font = '900 ' + size + 'px Anton, Impact, sans-serif';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 3.5; // 3 for no rendering errors
  ctx.strokeStyle = 'black';
  // http://www.html5canvastutorials.com/tutorials/html5-canvas-text-stroke/
  // order on purpose!
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
};

wrap = function(text, num) {
  var cache, i, output, split, strr;
  output = [];
  split = text.split(' ');
  strr = [];
  i = 0;
  cache = split.length;
  while (i < cache) {
    if ((strr + split[i]).length < num) {
      strr.push(split[i]);
    } else {
      output.push(strr.join(' '));
      strr.length = 0;
      strr.push(split[i]);
    }
    i++;
  }
  //Push the final line
  output.push(strr.join(' '));
  return output;
};

export default drawMemeText;
