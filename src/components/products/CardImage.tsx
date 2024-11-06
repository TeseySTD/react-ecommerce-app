import React, { CSSProperties, useState } from 'react';
import { Style } from 'util';

export const notFoundImage =
  'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=';

function CardImage(props: {name: string; images: string[], style?:CSSProperties }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handler for the error event, switches to the next image in the array
  const handleImageError = () => {
    console.log('Image error');
    if (currentImageIndex < props.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1); // Go to the next image
    } else {
      setCurrentImageIndex(-1); // Set to use the notFoundImageUrl
    }
  };

  // Determine the current image URL to display
  const currentImageUrl =
    currentImageIndex === -1 ? notFoundImage : props.images[currentImageIndex];

  return (
    <img
      src={currentImageUrl}
      onError={handleImageError}
      alt={props.name}
      style={props.style??{}}
    />
  );
}

export default CardImage;
