import React from 'react';
import styles from './MoviesSearch.module.scss'
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {useFormValidation} from "@/hooks/useFormValidation";
import {moviesApi} from "@/utils/MoviesApi";
import {SHORT_MOVIE_DURATION} from "@/utils/constants"
import {useRouter} from "next/router";

const MoviesSearch = ({
                        trigger,
                        setTrigger,
                        setDisplayedMovies,
                        savedMovies,
                        searchWord,
                        setIsCheckboxChecked,
                        isCheckboxChecked,
                        setIsMoreClicked,
                        setIsSearchButtonPressed,
                        setIsLoading,
                        setError,
                        setFilteredMovies
                      }) => {
  const location = useRouter()
  const {
    register,
    handleSubmit,
    errors,
    validateSearch,
  } = useFormValidation(
    {search: searchWord},
  );


  const onSubmitSavedMovies = async (data, e) => {
    e.preventDefault();
    setError(false)
    try {
      setIsSearchButtonPressed(true);
      setIsLoading(true)
      // await Promise.resolve();
      const filteredArr = savedMovies.filter(movie => {
        const nameRU = movie.nameRU.toLowerCase();
        const nameEN = movie.nameEN.toLowerCase();
        const search = data.search.toLowerCase();

        return (!isCheckboxChecked || movie.duration <= SHORT_MOVIE_DURATION) &&
          (nameRU.includes(search) || nameEN.includes(search));
      });
      setDisplayedMovies(filteredArr)

      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      setError(true)
      console.error(err);
    }
  }

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsMoreClicked(false)
    setIsSearchButtonPressed(true);
    setError(false)
    try {
      setIsLoading(true)
      await Promise.resolve();
      if (localStorage.getItem("movies")) {
        const movies = JSON.parse(localStorage.getItem("movies"))
        const filteredArr = movies.filter(movie => {
          const nameRU = movie.nameRU.toLowerCase();
          const nameEN = movie.nameEN.toLowerCase();
          const search = data.search.toLowerCase();

          return (!isCheckboxChecked || movie.duration <= SHORT_MOVIE_DURATION) &&
            (nameRU.includes(search) || nameEN.includes(search));
        });

        setFilteredMovies(filteredArr)
        localStorage.setItem('filteredFilms', JSON.stringify(filteredArr));
        localStorage.setItem('searchWord', JSON.stringify(data.search));
        localStorage.setItem('checkbox', isCheckboxChecked);
        setTrigger(!trigger)

        setIsLoading(false)
      } else {
        const movies = await moviesApi.getMovies();
        localStorage.setItem('movies', JSON.stringify(movies));

        const filteredArr = movies.filter(movie => {
          const nameRU = movie.nameRU.toLowerCase();
          const nameEN = movie.nameEN.toLowerCase();
          const search = data.search.toLowerCase();

          return (!isCheckboxChecked || movie.duration <= SHORT_MOVIE_DURATION) &&
            (nameRU.includes(search) || nameEN.includes(search));
        });

        setFilteredMovies(filteredArr)
        localStorage.setItem('filteredFilms', JSON.stringify(filteredArr));
        localStorage.setItem('searchWord', JSON.stringify(data.search));
        localStorage.setItem('checkbox', isCheckboxChecked);
        setIsLoading(false)

      }


    } catch (err) {
      setIsLoading(false)
      setError(true)
      console.error(err);
      return [];
    }
  };


  return (
    <>
      <form className={styles.search}
            onSubmit={location.pathname === '/saved-movies' ? handleSubmit(onSubmitSavedMovies) : handleSubmit(onSubmit)}>
        <input
          {...register('search', validateSearch)}
          className={styles.search__input} placeholder={'Фильм'}/>
        <button className={styles.search__button}></button>
      </form>
      <span className={
        errors.search ?
          `${styles.search__error} ${styles.search__error_active}` :
          `${styles.search__error}`

      }>{errors?.search?.message || ""}</span>
      <div className={styles.search__checkbox}>
        <FilterCheckbox setIsCheckboxChecked={setIsCheckboxChecked} isCheckboxChecked={isCheckboxChecked}/>
        <p className={styles.search__paragraph}>Короткометражки</p>
      </div>
    </>
  );
};

/*export async function getServerSideProps() {
  const movies = await moviesApi.getMovies();
  localStorage.setItem('movies', JSON.stringify(movies));

  return {
    props: {
      movies: movies
    }
  }

}*/

export default MoviesSearch;
