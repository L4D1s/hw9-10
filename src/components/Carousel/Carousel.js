import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Carousel.module.css';

const images = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.png',
  '/images/4.jpg',
  '/images/5.jpg',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const autoPlayTimer = useRef(null);
  const inactivityTimer = useRef(null);

  const startAutoPlay = useCallback(() => {
    setIsAutoPlay(true);
    autoPlayTimer.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    setIsAutoPlay(false);
    clearInterval(autoPlayTimer.current);
  }, []);

  const resetInactivityTimer = useCallback(() => {
    clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      startAutoPlay();
    }, 5000);
  }, [startAutoPlay]);

  const handleUserInteraction = useCallback(() => {
    stopAutoPlay();
    resetInactivityTimer();
  }, [stopAutoPlay, resetInactivityTimer]);

  useEffect(() => {
    const savedMainImage = localStorage.getItem('mainImageIndex');
    if (savedMainImage !== null) {
      setMainImageIndex(parseInt(savedMainImage));
      setCurrentIndex(parseInt(savedMainImage));
    }
    resetInactivityTimer();
    return () => {
      clearTimeout(autoPlayTimer.current);
      clearTimeout(inactivityTimer.current);
    };
  }, [resetInactivityTimer]);

  const nextSlide = useCallback(() => {
    handleUserInteraction();
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [handleUserInteraction]);

  const prevSlide = useCallback(() => {
    handleUserInteraction();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [handleUserInteraction]);

  const goToSlide = useCallback((index) => {
    handleUserInteraction();
    setCurrentIndex(index);
  }, [handleUserInteraction]);

  const setAsMain = useCallback(() => {
    handleUserInteraction();
    setMainImageIndex(currentIndex);
    localStorage.setItem('mainImageIndex', currentIndex.toString());
  }, [currentIndex, handleUserInteraction]);

  return (
    <div 
      className={styles.carousel}
      onMouseMove={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      <h1 className={styles.title}>Карусель изображений</h1>
      
      <div className={styles.carouselContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          className={styles.button}
          onClick={prevSlide}
        >
          Назад
        </button>
        <button
          className={styles.button}
          onClick={nextSlide}
        >
          Вперед
        </button>
      </div>

      <div className={styles.indicators}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <button
        className={styles.setMainButton}
        onClick={setAsMain}
      >
        Сделать основным изображением
      </button>

      <div className={styles.autoPlayStatus}>
        {isAutoPlay ? 'Автопрокрутка включена' : 'Автопрокрутка выключена'}
      </div>
    </div>
  );
};

export default Carousel; 