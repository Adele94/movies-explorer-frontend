import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies(props) {
  return (
    <div className="movies">
      <SearchForm 
        onSearchMovies={props.onSearchMovies} 
       />
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

export default Movies;