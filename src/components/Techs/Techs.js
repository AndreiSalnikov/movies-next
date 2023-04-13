import React from 'react';
import styles from './Techs.module.scss'

const Techs = () => {
  return (
    <section className={styles.techs}>
      <h2 className={styles.techs__subtitle}>Технологии</h2>
      <strong className={styles.techs__title}>7 технологий</strong>
      <p className={styles.techs__paragraph}>На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.</p>
      <ul className={styles.techs__list}>
        <li className={styles.techs__icon}><a className={styles.techs__link} href="https://ru.wikipedia.org/wiki/HTML"
                                              target="_blank" rel="noreferrer">HTML</a></li>
        <li className={styles.techs__icon}><a className={styles.techs__link} href="https://sass-scss.ru/"
                                              target="_blank" rel="noreferrer">SCSS</a></li>
        <li className={styles.techs__icon}><a className={styles.techs__link}
                                              href="https://ru.wikipedia.org/wiki/JavaScript" target="_blank"
                                              rel="noreferrer">JS</a></li>
        <li className={styles.techs__icon}><a className={styles.techs__link} href="https://ru.wikipedia.org/wiki/React"
                                              target="_blank" rel="noreferrer">React</a></li>
        <li className={styles.techs__icon}><a className={styles.techs__link} href="https://ru.wikipedia.org/wiki/Git"
                                              target="_blank" rel="noreferrer">Git</a></li>
        <li className={styles.techs__icon}><a className={styles.techs__link} href="https://expressjs.com/ru/"
                                              target="_blank" rel="noreferrer">Express.js</a></li>
        <li className={styles.techs__icon}><a className={styles.techs__link}
                                              href="https://ru.wikipedia.org/wiki/MongoDB" target="_blank"
                                              rel="noreferrer">mongoDB</a></li>
      </ul>
    </section>
  );
};

export default Techs;
