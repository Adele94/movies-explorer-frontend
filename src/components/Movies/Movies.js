import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from './Preloader/Preloader'
import { useEffect, useState } from 'react';
import { LocalStorageMovies } from '../../utils/LocalStorageMovies'

function Movies(props) {
  const [searchQuery, setSearchQuery] = LocalStorageMovies("searchQuery", "");
  const [isCheckbox, setIsCheckbox] = LocalStorageMovies("checkbox", "");
  const [isSubmitted, setIsSubmitted] = LocalStorageMovies("isSubmitted", "");
  const [foundMovies, setFoundMovies] = LocalStorageMovies("foundMovies", []);
  const [movies] = LocalStorageMovies("movies", "");
  const [isLoading, setIsLoading] = useState(props.isLoading);

  function handleCheckboxClick(isChecked) {
    setIsCheckbox(isChecked);
  }

  function handleChangeSearchQuery(value) {
    setSearchQuery(value);
    setIsSubmitted(false);
    setIsLoading(false);
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

  function searhMovies(movies, searchQuery) {
    let searchItems = [];
    let searchShortItems = [];
    if (searchQuery && isSubmitted) {
      setIsLoading(true);
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

  useEffect(() => {
    setIsLoading(props.isLoading);
  }, [props.isLoading])

  useEffect(() => {
    if(foundMovies){
      setIsLoading(false);
    }
  }, [foundMovies])

  return (
    <div className="movies">
      <SearchForm
        searchQuery={searchQuery}
        onSearchMovies={handleSearchMovies}
        onCheckboxClick={handleCheckboxClick}
        onSearchFormChange={handleChangeSearchQuery}
        isCheckbox={isCheckbox}
      />
      {props.errorMessage && <p className="main__text">??????-???? ?????????? ???? ??????...</p>}
      {searchQuery && isSubmitted && foundMovies.length === 0 ? <p className="main__text">???????????? ???? ??????????????.</p> : ''}
      {isLoading ?
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