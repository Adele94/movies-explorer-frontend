import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies(props) {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList cards={props.initialCards} savedCards={props.savedCards}/>
    </div>
);
}

export default SavedMovies;