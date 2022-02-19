import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from './Preloader/Preloader'
import { useEffect, useState } from 'react';
import { LocalStorageMovies } from '../../utils/LocalStorageMovies'

function Movies(props) {
  const [searchQuery, setSearchQuery] = LocalStorageMovies("searchQuery", "");
  const [isCheckbox, setIsCheckbox] = LocalStorageMovies("checkbox", "");
  const [movies] = LocalStorageMovies("movies", "");

  const [isSubmitted, setIsSubmitted] = LocalStorageMovies("isSubmitted", "");
  const [foundMovies, setFoundMovies] = useState(searhMovies(movies, searchQuery));

  function handleCheckboxClick(isChecked) {
    setIsCheckbox(isChecked);
  }

  function handleChangeSearchQuery(value) {
    setSearchQuery(value);
    setIsSubmitted(false);
  }

  useEffect(() => {
    if (isSubmitted) {
      if (isCheckbox) {
        const shortMovies = movies.filter(item => item.duration <= 40)
        setFoundMovies(searhMovies(shortMovies, searchQuery));
      }
      else {
        setFoundMovies(searhMovies(movies, searchQuery));
      }
    }
  }, [isCheckbox, isSubmitted])


  useEffect(() => {
    if (isSubmitted) {
      if (isCheckbox) {
        const shortMovies = movies.filter(item => item.duration <= 40)
        setFoundMovies(searhMovies(shortMovies, searchQuery));
      }
      else {
        setFoundMovies(searhMovies(movies, searchQuery));
      }
    }
  }, [isCheckbox, isSubmitted])

  function searhMovies(movies, searchQuery) {
    let searchItems = [];
    let searchShortItems = [];
    if (searchQuery && isSubmitted) {
      movies.filter((item) => {
        if (item.nameRU.toLowerCase().includes(searchQuery.toLowerCase())) {
          searchItems.push(item);
        }
      });
      if (isCheckbox) {
        searchItems.filter((item) => {
          if (item.duration <= 40) {
            searchShortItems.push(item);
          }
        });
        searchItems = searchShortItems;
      }
    }
    return searchItems;
  }

  function handleSearchMovies() {
    setIsSubmitted(true);
  }
/*
  useEffect(() => {
    setIsLoading(props.isLoading);
  }, [props.isLoading])
*/
  return (
    <div className="movies">
      <SearchForm
        searchQuery={searchQuery}
        onSearchMovies={handleSearchMovies}
        onCheckboxClick={handleCheckboxClick}
        onSearchFormChange={handleChangeSearchQuery}
        isCheckbox={isCheckbox}
      />
      {props.errorMessage && <p className="main__text">Что-то пошло не так...</p>}
      {searchQuery && isSubmitted && foundMovies.length === 0 ? <p className="main__text">Ничего не найдено.</p> : ''}
      {props.isLoading ?
        <Preloader /> :
        <MoviesCardList
          cards={foundMovies}
          savedMovies={props.savedMovies}
          onCardSave={props.onCardSave}
          onCardDelete={props.onCardDelete}
          onCardClick={props.onCardClick}
        />
      }
    </div>
  );
}

export default Movies;