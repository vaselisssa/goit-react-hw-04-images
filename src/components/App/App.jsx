import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import 'react-toastify/dist/ReactToastify.css';
import { StyledApp } from './App.styled';
import SearchBar from 'components/SearchBar';
import Loader from 'components/Loader';
import fetchImages from 'services/api';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
export default class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    status: 'idle',
    error: null,
  };

  totalHits = null;

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImagesByQuery(query, page);
    }
  }

  handleFormSubmit = query => {
    this.resetState();
    this.setState({ query });
  };

  fetchImagesByQuery = async (query, page) => {
    this.setState({ status: 'pending' });
    if (!query) {
      return;
    }
    try {
      const { hits, totalHits } = await fetchImages(query, page);
      this.totalHits = totalHits;
      if (!hits.length) {
        toast.info(
          'No results were found for your search, please try something else.'
        );
      }
      this.setState(({ images }) => ({
        images: [...images, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error: error.message, status: 'rejected' });
      toast.error('Sorry something went wrong.');
    }
  };

  resetState = () => {
    this.setState({
      query: '',
      images: [],
      page: 1,
      status: 'idle',
      error: null,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    scroll.scrollToBottom({
      duration: 2000,
      delay: 10,
      smooth: 'linear',
    });
  };

  render() {
    const { images, status, error } = this.state;

    return (
      <StyledApp>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          theme="colored"
        />
        {status === 'idle' && null}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <h1 style={{ color: '#b90505', textAlign: 'center' }}>
            {error}. Please refresh the page and try again.
          </h1>
        )}
        {status === 'resolved' && <ImageGallery images={images} />}
        {images.length > 0 &&
          images.length !== this.totalHits &&
          status === 'resolved' && <Button onClick={this.loadMore} />}
      </StyledApp>
    );
  }
}
