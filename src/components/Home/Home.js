import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Домашнее задание #9</h1>
      
      <div className={styles.tasks}>
        <div className={styles.task}>
          <h2 className={styles.taskTitle}>
            <span>1️⃣</span>
            Задание 1: Прокрутка к элементу
          </h2>
          <p className={styles.taskDescription}>
            Реализовать прокрутку к элементу с помощью useRef. При нажатии на кнопку
            страница должна плавно прокрутиться к определенному элементу.
          </p>
          <Link to="/scroll" className={styles.navButton}>
            Перейти к заданию
          </Link>
        </div>

        <div className={styles.task}>
          <h2 className={styles.taskTitle}>
            <span>2️⃣</span>
            Задание 2: Игра на память
          </h2>
          <p className={styles.taskDescription}>
            Написать игру. Пользователю отображаются несколько карточек. На некоторых
            карточках повторяющиеся названия животных. Пользователь запоминает их и
            нажимает 'Начать', карточки отображаются обратной стороной (слова скрыты).
            Пользователю предлагается указать карточки с определенным животным.
            Пользователь кликает на карточки. Когда он закончит свой выбор и нажмет
            'Проверить', ему должны отобразиться результаты (все верно, или в его выборе
            были допущены ошибки).
          </p>
          <Link to="/memory" className={styles.navButton}>
            Перейти к заданию
          </Link>
        </div>
      </div>

      <h1 className={styles.title} style={{ marginTop: '4rem' }}>Домашнее задание #10</h1>
      
      <div className={styles.tasks}>
        <div className={styles.task}>
          <h2 className={styles.taskTitle}>
            <span>1️⃣</span>
            Задание 1: Карусель изображений
          </h2>
          <p className={styles.taskDescription}>
            Реализовать карусель с несколькими изображениями. Пользователь должен иметь
            возможность просматривать изображения, переключаясь между ними.
          </p>
          <Link to="/carousel" className={styles.navButton}>
            Перейти к заданию
          </Link>
        </div>

        <div className={styles.task}>
          <h2 className={styles.taskTitle}>
            <span>2️⃣</span>
            Задание 2: Выбор основного изображения
          </h2>
          <p className={styles.taskDescription}>
            Реализовать возможность выбрать основное изображение, при загрузке страницы
            или прокрутке к карусели, оно должно отображаться первым на карусели.
            Информацию хранить в локальном хранилище.
          </p>
          <Link to="/carousel" className={styles.navButton}>
            Перейти к заданию
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home; 