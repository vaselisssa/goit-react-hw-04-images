import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import 'react-toastify/dist/ReactToastify.css';
import { StyledApp } from './App.styled';
import SearchBar from 'components/SearchBar';
import Loader from 'components/Loader';
import fetchImages from 'services/api';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const fetchImagesByQuery = async () => {
      if (!query) {
        return;
      }
      try {
        setStatus('pending');
        const { hits, totalHits } = await fetchImages(query, page);
        if (!hits.length) {
          toast.info(
            'No results were found for your search, please try something else.'
          );
        }
        setImages(prevState => [...prevState, ...hits]);
        setTotal(totalHits);
        setStatus('resolved');
        setError('');
      } catch (error) {
        setError(error.message);
        setStatus('rejected');

        toast.error('Sorry something went wrong.');
      }
    };

    fetchImagesByQuery();
  }, [query, page]);

  const handleFormSubmit = query => {
    resetState();
    setQuery(query);
  };

  const resetState = () => {
    setQuery('');
    setImages([]);
    setPage(1);
    setStatus('idle');
    setError(null);
    setTotal(null);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    scroll.scrollToBottom({
      duration: 2000,
      delay: 10,
      smooth: 'linear',
    });
  };

  return (
    <StyledApp>
      <SearchBar onSubmit={handleFormSubmit} />
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
        images.length !== total &&
        status === 'resolved' && <Button onClick={loadMore} />}
    </StyledApp>
  );
};

export default App;
