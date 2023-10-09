import { useState } from 'react';
import { StyledImageGalleryItem } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

const ImageGalleryItem = ({ src, alt, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <StyledImageGalleryItem onClick={toggleModal}>
      <img src={src} alt={alt} loading="lazy" />
      {showModal && (
        <Modal src={largeImageURL} alt={alt} closeModal={toggleModal} />
      )}
    </StyledImageGalleryItem>
  );
};

export default ImageGalleryItem;
