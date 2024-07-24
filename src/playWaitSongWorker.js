let canvas = null;

const drawVisualizer = ({ bufferLength, dataArray }) => {
  let barHeight;
  const barWidth = canvas.width / 2 / bufferLength;
  let firstX = 0;
  let secondX = bufferLength * barWidth;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 2.2;
    ctx.fillStyle = `rgb(255, 255, 255)`;
    ctx.fillRect(
      canvas.width / 2 - firstX,
      canvas.height - barHeight,
      barWidth,
      barHeight
    );
    firstX += barWidth;
    ctx.fillRect(secondX, canvas.height - barHeight, barWidth, barHeight);
    secondX += barWidth;
  }
};

onmessage = (e) => {
  const { bufferLength, dataArray, canvas: canvasMessage } = e.data;
  if (canvasMessage) {
    canvas = canvasMessage;
  } else {
    drawVisualizer({ bufferLength, dataArray });
  }
};
