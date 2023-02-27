import { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import imagesAPI from './services/image-api';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';

import './App.css';

export default function App() {
  const [findValue, setFindValue] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    const getImages = () => {
      imagesAPI
        .fetchImages(findValue, pageNumber)
        .then(res => {
          if (pageNumber === 1) {
            setImages(res);
          } else {
            setImages(prevImages => [...prevImages, ...res]);
          }
          setStatus('resolved');

          if (pageNumber !== 1) {
            console.log(document.documentElement.scrollHeight);
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        })

        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (findValue) {
      setStatus('pending');
      getImages();
    }
    if (pageNumber !== 1) {
      getImages();
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [findValue, pageNumber]);

  const handleFormSubmit = findValue => {
    setFindValue(findValue);
    setPageNumber(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPageNumber(pageNumber => pageNumber + 1);
  };

  const onOpenModal = url => {
    setLargeImageURL(url);
    modalToggle();
  };

  const modalToggle = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        status={status}
        error={error}
        images={images}
        onClick={onOpenModal}
        onLoadMore={onLoadMore}
      />
      {showModal && <Modal src={largeImageURL} onCloseModal={modalToggle} />}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}
