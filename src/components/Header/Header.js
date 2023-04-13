import React, {useState} from 'react';
import styles from './Header.module.scss'
import Logo from "../Logo/Logo";
import NavigateSlideBar from "../NvigateSlideBar/NavigateSlideBar";
import {useRouter} from "next/router";
import Link from "next/link";
import {useAuth} from "@/hooks/useAuth";

const Header = () => {
  const location = useRouter();
  const [isBurgerClicked, setIsBurgerClicked] = useState(false)
  const router = useRouter()
  const {user} = useAuth();

  const handleClose = () => {
    setIsBurgerClicked(!isBurgerClicked)
  }

  return (
    <>
      <header className={location.pathname === '/' ? styles.header : `${styles.header} ${styles.header__profile}`}>
        <Logo/>
        {user &&
          <div className={styles.header__menu}>
            <Link href={'/movies'}
                  className={router.pathname === '/movies' ? `${styles.header__movies} ${styles.header__movies_active}` : `${styles.header__movies}`}>Фильмы</Link>
            <Link href={'/saved-movies'}
                  className={router.pathname === '/saved-movies' ? `${styles.header__movies} ${styles.header__movies_active}` : `${styles.header__movies}`}>Сохранённые
              фильмы</Link>
          </div>
        }
        <nav className={styles.header__authorization}>
          {user ?
            <div className={styles.header__account}>
              <Link className={styles.header__link} href="/profile">
                Аккаунт
                <div className={styles.header__man}></div>
              </Link>
            </div>
            :
            <>
              <Link className={styles.header__registration} href="/signup">Регистрация</Link>
              <Link className={styles.header__login} href="/signin">Войти</Link>
            </>
          }
        </nav>
        {user &&
          <button className={styles.header__burger} onClick={() => setIsBurgerClicked(!isBurgerClicked)}>
            <span
              className={isBurgerClicked ? `${styles.header__line} ${styles.header__line_active}` : `${styles.header__line}`}></span>
            <span
              className={isBurgerClicked ? `${styles.header__line} ${styles.header__line_active}` : `${styles.header__line}`}></span>
            <span
              className={isBurgerClicked ? `${styles.header__line} ${styles.header__line_active}` : `${styles.header__line}`}></span>
          </button>
        }
        <NavigateSlideBar isBurgerClicked={isBurgerClicked} close={handleClose}/>
      </header>
      {/*<Outlet/>*/}
    </>
  );
};

export default Header;
