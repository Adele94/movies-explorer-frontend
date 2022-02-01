import MoviesCard from '../MoviesCard/MoviesCard'
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
  let location = useLocation();
  
  return (
    <section className="moviesCardsSection">
     <div className="moviesCardList"> 
      {location.pathname === '/movies'? (
        props.cards.map((item) => (
            <MoviesCard cardItem={item} onCardSave={props.onCardSave} src={item.link} name={item.name} duration={item.duration} isSaved={false} />
      ))
      ) : (
        props.savedCards.map((item) => (
          <MoviesCard cardItem={item} onCardSave={props.onCardSave} src={item.link} name={item.name} duration={item.duration} isSaved={false} />
        ))
      )}
    </div>
    <div className="moviesCardsBottom">
      {location.pathname === '/movies' ? (
      <div className="moreButtonSection">
        <button type='button' className="moreButton"> Ещё </button>
      </div>
      ): (
        <div className="save-devider" />
      )} `
    </div>
  </section>
  );
}

export default MoviesCardList;