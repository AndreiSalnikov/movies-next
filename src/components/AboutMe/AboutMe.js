import React from 'react';
import style from './AboutMe.module.scss'
// import aboutMeImage from '../../images/aboutMe/aboutMeImage.jpg'
import Image from 'next/image'

const AboutMe = () => {
  return (
    <section className={style.about}>
      <h2 className={style.about__title}>Студент</h2>
      <article className={style.about__story}>
        <div className={style.about__text}>
          <strong className={style.about__name}>Андрей</strong>
          <p className={style.about__paragraph}>Фронтенд-разработчик, 25 лет</p>
          <p className={style.about__paragraph}>Я родился республике Мордовия, в 7 лет переехал с семьёй в
            Санкт-Петербург, закончил факультет морского приборостроения в СПбГМТУ.
            Люблю кодить, слушать музыку и играть на гитаре.
          </p>
          <a target="_blank" href='https://github.com/AndreiSalnikov' rel="noreferrer"
             className={style.about__link}>Github</a>
        </div>
        <Image className={style.about__img} width={270} height={327} src="/images/aboutMe/aboutMeImage.jpg"
               alt='фотограция автора'/>
      </article>
    </section>
  );
};

export default AboutMe;
