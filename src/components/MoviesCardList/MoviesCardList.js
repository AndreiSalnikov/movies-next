import {useEffect, useState} from 'react';
import styles from './MoviesCardList.module.scss'
import MoviesCard from "../MoviesCard/MoviesCard";
import {LAPTOP_WIDTH, SLICE_FILTERED, TABLET_WIDTH, THREE_MORE, TIMEOUT, TWO_MORE} from "@/utils/constants"
import {useRouter} from "next/router";

const MoviesCardList = ({
                          isSearchButtonPressed,
                          setSavedMovies,
                          savedMovies,
                          trigger,
                          setIsMoreClicked,
                          isMoreClicked,
                          setDisplayedMovies,
                          filteredMovies,
                          displayedMovies
                        }) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useRouter();

  useEffect(() => {
    let timeout = null;
    const updateCurrentArray = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (windowWidth >= LAPTOP_WIDTH) {
          if (isMoreClicked) {
            setDisplayedMovies(displayedMovies => [...displayedMovies, ...filteredMovies.slice(displayedMovies.length, displayedMovies.length + THREE_MORE)]);
            setIsMoreClicked(false)
          } else {
            if (location.pathname === '/saved-movies') {
              if (isSearchButtonPressed) {
                setDisplayedMovies(displayedMovies)
              } else {
                setDisplayedMovies(savedMovies)
              }
            } else {
              setDisplayedMovies(filteredMovies.slice(SLICE_FILTERED.start, SLICE_FILTERED.laptopMovies));
            }
          }
        } else if (windowWidth >= TABLET_WIDTH) {
          if (isMoreClicked) {
            setDisplayedMovies(displayedMovies => [...displayedMovies, ...filteredMovies.slice(displayedMovies.length, displayedMovies.length + TWO_MORE)]);
            setIsMoreClicked(false)
          } else {
            if (location.pathname === '/saved-movies') {
              if (isSearchButtonPressed) {
                setDisplayedMovies(displayedMovies)
              } else {
                setDisplayedMovies(savedMovies)
              }
            } else {
              setDisplayedMovies(filteredMovies.slice(SLICE_FILTERED.start, SLICE_FILTERED.tabletMovies));
            }

          }
        } else {
          if (isMoreClicked) {
            setDisplayedMovies(displayedMovies => [...displayedMovies, ...filteredMovies.slice(displayedMovies.length, displayedMovies.length + TWO_MORE)]);
            setIsMoreClicked(false)
          } else {
            if (location.pathname === '/saved-movies') {
              if (isSearchButtonPressed) {
                setDisplayedMovies(displayedMovies)
              } else {
                setDisplayedMovies(savedMovies)
              }
            } else {
              setDisplayedMovies(filteredMovies.slice(SLICE_FILTERED.start, SLICE_FILTERED.mobileMovies));
            }

          }
        }
      }, TIMEOUT)

    };
    updateCurrentArray();
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
      });
    };
  }, [windowWidth, trigger, savedMovies, isSearchButtonPressed]);

  return (
    <section className={styles.cards}>
      {displayedMovies.map((card) => (<MoviesCard
        setDisplayedMovies={setDisplayedMovies}
        setSavedMovies={setSavedMovies}
        savedMovies={savedMovies}

        key={card.id || card._id}
        card={card}
      />))}
    </section>
  );
};

export default MoviesCardList;
