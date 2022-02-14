import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from './Preloader/Preloader'

function Movies(props) {
  return (
    <div className="movies">
      <SearchForm 
        onSearchMovies={props.onSearchMovies} 
        onCheckboxClick={props.onCheckboxClick}
       />
      {props.isLoading ?
      <Preloader /> :
      <MoviesCardList
        cards={props.cards}
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