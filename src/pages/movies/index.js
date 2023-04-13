import { withAuth } from "@/hoc/ProtectedRoute";
import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';
import MoviesSearch from "../../components/MoviesSearch/MoviesSearch";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import {useAuth} from "@/hooks/useAuth";
import Preloader from "../../components/Preloader/Preloader";
import MoreButton from "../../components/MoreButton/MoreButton";
import {mainApi} from "@/utils/MainApi";

function Movies() {

  const [isSearchButtonPressed, setIsSearchButtonPressed] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(false)
  const {isLoading, setIsLoading} = useAuth();
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [isMoreClicked, setIsMoreClicked] = useState(false)
  const [trigger, setTrigger] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const [searchWord, setSearchWord] = useState('')
  const [savedMovies, setSavedMovies] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      const data = await mainApi.getServerInfo('/movies');
      setSavedMovies(data);
    }

    fetchData().catch(err => console.error(err))

    if (localStorage.getItem("filteredFilms")) {
      const movies = localStorage.getItem("filteredFilms");
      const checkbox = localStorage.getItem("checkbox");
      const word = localStorage.getItem("searchWord");
      word && setSearchWord(JSON.parse(word));
      movies && setFilteredMovies(JSON.parse(movies));
      checkbox && setIsCheckboxChecked(JSON.parse(checkbox));
      setIsSearchButtonPressed(true);
      setTrigger((prev) => !prev);
    }
  }, []);

  return (
    <main className={styles.movies}>
      <MoviesSearch
        trigger={trigger}
        setTrigger={setTrigger}
        setSearchWord={setSearchWord}
        searchWord={searchWord}
        isCheckboxChecked={isCheckboxChecked}
        setIsCheckboxChecked={setIsCheckboxChecked}
        setIsMoreClicked={setIsMoreClicked}
        setIsSearchButtonPressed={setIsSearchButtonPressed}
        setFilteredMovies={setFilteredMovies}
        filteredMovies={filteredMovies}
        setIsLoading={setIsLoading}
        setError={setError}
      />
      {isLoading && <Preloader/>}
      {isSearchButtonPressed && !isLoading &&
        <MoviesCardList
          savedMovies={savedMovies}
          trigger={trigger}
          setIsMoreClicked={setIsMoreClicked}
          isMoreClicked={isMoreClicked}
          setDisplayedMovies={setDisplayedMovies}
          filteredMovies={filteredMovies} displayedMovies={displayedMovies}/>
      }
      {
        filteredMovies.length === 0 && isSearchButtonPressed && !isLoading && displayedMovies.length === 0 &&
        <p className={styles.movies__error}>Ничего не найдено</p>
      }
      {error &&
        <p className={styles.movies__error}>Во время запроса произошла ошибка. Возможно, проблема с соединением или
          сервер недоступен. Подождите немного
          и попробуйте ещё раз.</p>}
      {filteredMovies.length > 3 && (displayedMovies.length < filteredMovies.length) && !isLoading &&
        <MoreButton trigger={trigger} setTrigger={setTrigger} setIsMoreClicked={setIsMoreClicked}
                    setDisplayedMovies={setDisplayedMovies}
                    displayedMovies={displayedMovies}
                    filteredMovies={filteredMovies}/>}
    </main>
  );
}

export default withAuth(Movies);
