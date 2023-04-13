import React from 'react';
import styles from './Portfolio.module.scss'

const Portfolio = () => {
  return (
    <section className={styles.portfolio}>
      <h3 className={styles.portfolio__title}>Портфолио</h3>
      <ul className={styles.portfolio__list}>
        <li className={styles.portfolio__line}>
          <a href='https://andreisalnikov.github.io/how-to-learn/' target="_blank" rel="noreferrer"
             className={styles.portfolio__link}>
            Статичный сайт
            <span className={styles.portfolio__arrow}>&#8599;</span>
          </a>
        </li>
        <li className={styles.portfolio__line}>
          <a href='https://andreisalnikov.github.io/russian-travel/' target="_blank" rel="noreferrer"
             className={styles.portfolio__link}>Адаптивный сайт
            <span className={styles.portfolio__arrow}>&#8599;</span>
          </a>
        </li>
        <li className={styles.portfolio__line}>
          <a href='https://andreisalnikov.github.io/react-mesto-auth/#/sign-in' target="_blank" rel="noreferrer"
             className={styles.portfolio__link}>
            Одностраничное приложение
            <span className={styles.portfolio__arrow}>&#8599;</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
