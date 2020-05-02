import React, {useEffect, useState} from 'react';
import {range} from 'lodash';
import './DotSelector.css';

// const IMAGE_SRC = '/pine-tree.jpg';
// const IMAGE_SRC = '/chewbonga.jpg';
// const IMAGE_SRC = 'moscow.jpg';
// const IMAGE_SRC = 'rally.jpeg';
const IMAGE_SRC = 'pine-tree02.jpg';
// const IMAGE_SRC = 'me_switzerland1.png';

const image = new Image();

const generateRandomDotMatrix = ({maxX, maxY}) => {
  return range(5000).map(() => ({
    x: Math.random() * maxX,
    y: Math.random() * maxY,
  }));
};

export default ({dotMatrix, setDotMatrix, setImageUrl}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const onImageClick = e => {
    const {nativeEvent} = e;
    const {offsetX: x, offsetY: y} = nativeEvent;
    setDotMatrix([...dotMatrix, {x, y}]);
  };

  const randomizeDotMatrix = () => {
    setTimeout(randomizeDotMatrix, 100);
    setDotMatrix(
      generateRandomDotMatrix({maxX: image.width, maxY: image.height}),
    );
  };

  useEffect(() => {
    const imgContainers = document.getElementsByClassName('img-container');

    if (imageLoaded) return;
    if (!imgContainers || !imgContainers.length) return;

    image.onload = () => {
      imgContainers[0].appendChild(image);
      setImageUrl(image.currentSrc);
      setImageLoaded(true);
    };

    image.src = IMAGE_SRC;
  }, []);

  useEffect(() => {
    randomizeDotMatrix();
  }, [imageLoaded]);

  return (
    <div className="dot-selector">
      <div className="img-container" onClick={onImageClick} />
    </div>
  );
};
