import React, { useRef } from "react";
import styles from './ScrollToElementExample.module.css';

const ScrollToElementExample = () => {
  const elementRef = useRef(null);

  const scrollToElement = () => {
    elementRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <button className={styles.scrollButton} onClick={scrollToElement}>
        Прокрутить вниз
      </button>

      <div className={styles.spacer}></div>

      <div ref={elementRef} className={styles.targetElement}>
        🎯 Целевой элемент
      </div>
    </div>
  );
}

export default ScrollToElementExample;
