import React from 'react';
import styles from './Promo.module.scss'

const Promo = () => {
  return (
    <section className={styles.promo}>
      <div className={styles.promo__left}>
        <h1 className={styles.promo__title}>Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className={styles.promo__subtitle}>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a href='#about' className={styles.promo__more}>Узнать больше</a>
      </div>
      <div className={styles.promo__logo}></div>
    </section>
  );
};

export default Promo;
