import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies(props) {
  return (
    <div className="saved-movies">
      <SearchForm onSearchMovies={props.onSearchMovies}  />
      <MoviesCardList 
       cards={props.cards}
       searchMovies={props.searchMovies} 
       shortMovies={props.shortMovies }  
       savedMovies={props.savedMovies} 
       onCardSave={props.onCardSave} 
       onCardDelete={props.onCardDelete}
       onCardClick={props.onCardClick} 
       movies={props.movies} 
       savedCards={props.savedCards}
       />
    </div>
);
}

export default SavedMovies;