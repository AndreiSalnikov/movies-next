import React, {useEffect, useState} from 'react';
import styles from './index.module.scss'
import MoviesSearch from "../../components/MoviesSearch/MoviesSearch";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import {mainApi} from "@/utils/MainApi";
import {useAuth} from "@/hooks/useAuth";
import Preloader from "../../components/Preloader/Preloader";
import {withAuth} from "@/hoc/ProtectedRoute";


const SavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState([])
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [isSearchButtonPressed, setIsSearchButtonPressed] = useState(false);
  const [error, setError] = useState(false)
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const {isLoading, setIsLoading} = useAuth();
  const [filteredMovies, setFilteredMovies] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await mainApi.getServerInfo('/movies');
      setSavedMovies(data);
      setIsLoading(false)
    }
    fetchData().catch(err => console.error(err));
  }, [])

  return (
    <div className={styles.saved}>
      <MoviesSearch
        setDisplayedMovies={setDisplayedMovies}
        setFilteredMovies={setFilteredMovies}
        isCheckboxChecked={isCheckboxChecked}
        setIsCheckboxChecked={setIsCheckboxChecked}
        savedMovies={savedMovies}
        setError={setError}
        setIsLoading={setIsLoading}
        setIsSearchButtonPressed={setIsSearchButtonPressed}/>
      {isLoading && <Preloader/>}
      {!isLoading && <MoviesCardList
        isSearchButtonPressed={isSearchButtonPressed}
        filteredMovies={filteredMovies}
        setSavedMovies={setSavedMovies}
        savedMovies={savedMovies}
        displayedMovies={displayedMovies}
        setDisplayedMovies={setDisplayedMovies}/>
      }
      {
        isSearchButtonPressed && !isLoading && displayedMovies.length === 0 &&
        <p className={styles.saved__error}>Ничего не найдено</p>
      }
      {error &&
        <p className={styles.saved__error}>Во время запроса произошла ошибка. Возможно, проблема с соединением или
          сервер недоступен. Подождите немного
          и попробуйте ещё раз.</p>}
    </div>
  );
};

export default withAuth(SavedMovies);
