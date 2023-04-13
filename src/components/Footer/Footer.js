import React from 'react';
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <p className={styles.footer__title}>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className={styles.footer__nav}>
          <span>@ 2022</span>
          <div className={styles.footer__links}>
            <a href='https://practicum.yandex.ru/' target="_blank" rel="noreferrer"
               className={styles.footer__link}>Яндекс.Практикум</a>
            <a href='https://github.com/' target="_blank" rel="noreferrer" className={styles.footer__link}>Github</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
