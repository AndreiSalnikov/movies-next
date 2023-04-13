import React from 'react';
import styles from './NavigateSlideBar.module.scss'
import {useRouter} from "next/router";
import Link from "next/link";

const NavigateSlideBar = ({isBurgerClicked, close}) => {
  const location = useRouter();
  return (
    <div className={isBurgerClicked ? `${styles.bar} ${styles.bar_active}` : `${styles.bar}`} onClick={close}>
      <button className={styles.bar__close}>
        <span className={styles.bar__line}></span>
        <span className={styles.bar__line}></span>
      </button>
      <nav className={styles.bar__links}>
        <Link
          className={location.pathname === '/' ? `${styles.bar__link} ${styles.bar__link_active}` : `${styles.bar__link}`}
          onClick={close}
          href='/'>Главная</Link>
        <Link
          className={location.pathname === '/movies' ? `${styles.bar__link} ${styles.bar__link_active}` : `${styles.bar__link}`}
          onClick={close}
          href='/movies'>Фильмы</Link>
        <Link
          className={location.pathname === '/saved-movies' ? `${styles.bar__link} ${styles.bar__link_active}` : `${styles.bar__link}`}
          onClick={close}
          href='/saved-movies'>Сохранённые фильмы</Link>
      </nav>
      <div className={styles.bar__account}>
        <Link href="/profile" className={styles.bar__profile}>
          Аккаунт
          <div className={styles.bar__man}></div>
        </Link>
      </div>
    </div>
  );
};

export default NavigateSlideBar;
