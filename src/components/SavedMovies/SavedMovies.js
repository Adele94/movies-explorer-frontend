import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import { useEffect, useState } from 'react';
import Preloader from '../Movies/Preloader/Preloader'

function SavedMovies(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundMovies, setFoundMovies] = useState(props.savedMovies);
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
    if (searchQuery) {
      if (onlyShortMovies) {
        const shortMovies = props.savedMovies.filter(item => item.duration <= 40)
        setFoundMovies(searhMovies(shortMovies, searchQuery));
      }
      else {
        setFoundMovies(searhMovies(props.savedMovies, searchQuery));
      }
    }
    else {
      if (onlyShortMovies) {
        const shortMovies = props.savedMovies.filter(item => item.duration <= 40)
        setFoundMovies(shortMovies);
      }
      else {
        setFoundMovies(props.savedMovies);
      }
    }
    setIsSubmitted(true);
  };
  useEffect(() => {
    setFoundMovies(props.savedMovies)
  }, [props.savedMovies])

  return (
    <div className="saved-movies">
      <SearchForm
        searchQuery={searchQuery}
        onSearchMovies={handleSearchMovies}
        onCheckboxClick={handleCheckboxClick}
        onSearchFormChange={handleChangeSearchQuery}
      />
      {searchQuery && isSubmitted && foundMovies.length===0 ? <p className="main__text">Ничего не найдено</p> : ''}
      {props.isLoading ?
      <Preloader /> :
      <MoviesCardList
        cards={props.cards}
        savedMovies={foundMovies}
        onCardSave={props.onCardSave}
        onCardDelete={props.onCardDelete}
        onCardClick={props.onCardClick}
      />
}
    </div>
  );
}

export default SavedMovies;