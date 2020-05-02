import React, {useEffect, useState} from 'react';
import './Renderer.css';

const BLOCK_WIDTH = 12;
const BLOCK_HEIGHT = 12;
const sourceCanvas = document.createElement('canvas');
const renderedCanvas = document.createElement('canvas');

const drawRenderedImage = dotMatrix => {
  const divContainers = document.getElementsByClassName('rendered-image');

  if (!divContainers || !divContainers.length) return;
  if (!dotMatrix || !dotMatrix.length) return;

  renderedCanvas.width = divContainers[0].offsetWidth;
  renderedCanvas.height = divContainers[0].offsetHeight;

  if (!renderedCanvas.parentElement) {
    divContainers[0].appendChild(renderedCanvas);
  }

  const widthRatio = divContainers[0].offsetWidth / renderedCanvas.width;
  const heightRatio = divContainers[0].offsetHeight / renderedCanvas.height;
  const sourceContext = sourceCanvas.getContext('2d');
  const renderedContext = renderedCanvas.getContext('2d');

  dotMatrix.forEach(dot => {
    const {x, y} = dot;
    const pixel = sourceContext.getImageData(x, y, 1, 1).data;
    const colorStr = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3]})`;

    renderedContext.fillStyle = colorStr;
    renderedContext.fillRect(
      x * widthRatio,
      y * heightRatio,
      BLOCK_WIDTH * widthRatio,
      BLOCK_HEIGHT * heightRatio,
    );
  });
};

const image = new Image();

export default ({imageUrl, dotMatrix}) => {
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);

    image.onload = () => {
      setImageLoaded(true);
    };

    image.src = imageUrl;
  }, [imageUrl]);

  useEffect(() => {
    if (!imageLoaded) return;

    sourceCanvas.width = image.width;
    sourceCanvas.height = image.height;

    sourceCanvas
      .getContext('2d')
      .drawImage(image, 0, 0, image.width, image.height);

    setCanvasLoaded(true);
  }, [imageLoaded]);

  useEffect(() => {
    drawRenderedImage(dotMatrix);
  }, [dotMatrix, canvasLoaded]);

  return (
    <div className="renderer">
      <div className="rendered-image" />
    </div>
  );
};
