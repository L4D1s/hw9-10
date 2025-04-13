import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.logo}>
          🎮 Memory Game
        </NavLink>
        <div className={styles.navLinks}>
          <NavLink 
            to="/memory" 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Игра на память
          </NavLink>
          <NavLink 
            to="/scroll" 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Прокрутка
          </NavLink>
          <NavLink 
            to="/carousel" 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Карусель
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header; 