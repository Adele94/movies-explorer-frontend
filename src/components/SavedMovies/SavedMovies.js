import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies(props) {
  return (
    <div className="saved-movies">
      <SearchForm onSearchMovies={props.onSearchMovies} 
      onCheckboxClick={props.onCheckboxClick} />
      <MoviesCardList 
       cards={props.cards}
       savedMovies={props.savedMovies} 
       onCardSave={props.onCardSave} 
       onCardDelete={props.onCardDelete}
       onCardClick={props.onCardClick} 
       />
    </div>
);
}

export default SavedMovies;