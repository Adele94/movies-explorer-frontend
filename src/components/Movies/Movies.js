import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";


function Movies(props) {
  return (
    <div className="movies">
      <SearchForm  onSubmit={props.onSubmit} onChange={props.onChange} value={props.value}/>
      <MoviesCardList onCardSave={props.onCardSave} onCardClick={props.onCardClick} cards={props.cards} movies={props.movies} savedCards={props.savedCards}/>
    </div>
);
}

export default Movies;