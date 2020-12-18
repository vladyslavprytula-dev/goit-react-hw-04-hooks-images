import React, { useEffect, useState, useRef } from 'react';
import Loader from 'react-loader-spinner';
import Container from './Container/Container';
import Seacrchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import MainLoader from './MainLoader/MainLoader';
import Modal from './Modal/Modal';
import Error from './Error/Error';
import picturesApi from '../services/pictures-api';
export default function App() {
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImgUrl, setLargeImgUrl] = useState('');
  const [alternative, setAlternative] = useState('');
  const [arePictureOver, setArePictureOver] = useState(false);
  const formSubmit = data => {
    if (data !== searchQuery) {
      setSearchQuery(data);
      setCurrentPage(1);
      setPictures([]);
      setError(null);
    }
  };
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchPictures();
  }, [searchQuery]);
  const shouldRenderLoadMoreBtn = (page, totalHits) => {
    const picturesLeft = totalHits - page * 12;
    setArePictureOver(picturesLeft <= 0);
  };
  const scrollDocument = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  const fetchPictures = () => {
    const options = {
      currentPage,
      searchQuery,
    };
    setIsLoading(true);
    picturesApi
      .fetchPictures(options)
      .then(({ hits, totalHits }) => {
        shouldRenderLoadMoreBtn(currentPage, totalHits);
        setPictures(prevState => [...prevState, ...hits]);
        setCurrentPage(prevState => prevState + 1);
        scrollDocument();
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  };
  const openModal = e => {
    const { alt } = e.currentTarget;
    setLargeImgUrl(e.currentTarget.dataset.source);
    setAlternative(alt);
  };

  const closeModal = () => {
    setLargeImgUrl('');
    setAlternative('');
  };
  const shouldRenderLoadMoreButton = !arePictureOver && !isLoading && pictures.length > 0;
  return (
    <Container>
      <Seacrchbar onSubmit={formSubmit} />
      {largeImgUrl && (
        <Modal largeImgUrl={largeImgUrl} alternative={alternative} onClose={closeModal} />
      )}
      <ImageGallery images={pictures} onClick={openModal} />
      {error && <Error text={error} />}
      {isLoading && (
        <MainLoader>
          <Loader type="ThreeDots" color="#2a829c" height={80} width={80} timeout={0} />
        </MainLoader>
      )}
      {shouldRenderLoadMoreButton && <Button onClick={fetchPictures} />}
    </Container>
  );
}
