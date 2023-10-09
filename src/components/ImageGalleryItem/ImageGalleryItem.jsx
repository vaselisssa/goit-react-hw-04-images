import React, { Component } from 'react';
import { StyledImageGalleryItem } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { src, alt, largeImageURL } = this.props;
    return (
      <StyledImageGalleryItem onClick={this.toggleModal}>
        <img src={src} alt={alt} loading="lazy" />
        {showModal && (
          <Modal src={largeImageURL} alt={alt} closeModal={this.toggleModal} />
        )}
      </StyledImageGalleryItem>
    );
  }
}
