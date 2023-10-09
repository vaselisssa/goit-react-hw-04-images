import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { StyledImageGallery } from './ImageGallery.styled';

const ImageGallery = ({ images }) => {
  return (
    <StyledImageGallery>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
        />
      ))}
    </StyledImageGallery>
  );
};

export default ImageGallery;
