import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from './Preloader/Preloader'
import { useState } from 'react';
import { LocalStorageMovies } from '../../utils/LocalStorageMovies'

function Movies(props) {
  const [searchQuery, setSearchQuery] = LocalStorageMovies("searchQuery", "");
  const [movies] = LocalStorageMovies("movies", "");
  const [foundMovies, setFoundMovies] = useState(searhMovies(movies, searchQuery));
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleCheckboxClick(isChecked) {
    handleSearchMovies(searchQuery, isChecked);
  }

  function handleChangeSearchQuery(value) {
    setSearchQuery(value);
    setIsSubmitted(false);
  }

  function searhMovies(movies, searchQuery) {
    let searchItems = [];
    if (searchQuery) {
      movies.filter((item) => {
        if (item.nameRU.toLowerCase().includes(searchQuery.toLowerCase())) {
          searchItems.push(item);
        }
      });
    }
    return searchItems;
  }

  function handleSearchMovies(searchQuery, onlyShortMovies) {
    if (onlyShortMovies) {
      const shortMovies = movies.filter(item => item.duration <= 40)
      setFoundMovies(searhMovies(shortMovies, searchQuery));
    }
    else {
      setFoundMovies(searhMovies(movies, searchQuery));
    }
    setIsSubmitted(true);
  };

  return (
    <div className="movies">
      <SearchForm
        searchQuery={searchQuery}
        onSearchMovies={handleSearchMovies}
        onCheckboxClick={handleCheckboxClick}
        onSearchFormChange={handleChangeSearchQuery}
      />
      {searchQuery && isSubmitted && foundMovies.length===0 ? <p className="main__text">Ничего не найдено.</p> : ''}
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