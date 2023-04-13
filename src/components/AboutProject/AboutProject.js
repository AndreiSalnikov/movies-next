import React from 'react';
import styles from './AboutProject.module.scss'

const AboutProject = () => {
  return (
    <section id="about" className={styles.about}>
      <h2 className={styles.about__title}>О проекте</h2>
      <div className={styles.about__content}>
        <div>
          <h3 className={styles.about__subtitle}>Дипломный проект включал 5 этапов</h3>
          <p className={styles.about__text}>Составление плана, работу над бэкендом, вёрстку, добавление функциональности
            и финальные доработки.</p>
        </div>
        <div>
          <h3 className={styles.about__subtitle}>На выполнение диплома ушло 5 недель</h3>
          <p className={styles.about__text}>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.</p>
        </div>
      </div>
      <div>
        <div className={styles.about__time}>
          <p className={styles.about__weeks}>1 неделя</p>
          <p className={styles.about__weeks}>4 недели</p>
        </div>
        <div className={styles.about__webs}>
          <p className={styles.about__web}>Back-end</p>
          <p className={styles.about__web}>Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
