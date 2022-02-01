import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";


function Movies(props) {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList onCardSave={props.onCardSave} cards={props.cards} savedCards={props.savedCards}/>
    </div>
);
}

export default Movies;