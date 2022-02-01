
import MoviesCard from '../MoviesCard/MoviesCard'
import { useLocation } from 'react-router-dom';
import moviesApi from "../../../utils/MoviesApi";
import React from 'react';

function MoviesCardList(props) {
  let location = useLocation();
  const cards = props.cards;
  const [cardsCount, setCardsCount] = React.useState(0);
  const windowWidth = window.innerWidth;

  React.useEffect(() => {
      if (windowWidth > 768) {
        setCardsCount(12);
      } else if (windowWidth > 480 && windowWidth < 768) {
        setCardsCount(8);
      } else {
        setCardsCount(5);
      }
    }, [windowWidth]);

  const handleMoreButtonClick = () => {
    if (windowWidth > 1020) {
      setCardsCount(cardsCount + 3);
    } else {
      setCardsCount(cardsCount + 2);
    }
  };

  return (
      <section className="moviesCardList">
      {location.pathname === '/movies'? (
        cards.slice(0, cardsCount).map((item) => (
            <MoviesCard cardItem={item} onCardSave={props.onCardSave} onCardClick={props.onCardClick} src={moviesApi.url+item.image.url} name={item.nameRU} duration={item.duration} isSaved={false} />
      ))
      ) : (
        cards.map((item) => (
          <MoviesCard cardItem={item} onCardSave={props.onCardSave} onCardClick={props.onCardClick} src={moviesApi.url+item.image.url} name={item.nameRU} duration={item.duration} isSaved={false}  />
        ))
      )}
      <div className="moreButtonSection">
        <button type='button' className="moreButton" onClick={handleMoreButtonClick}> Ещё </button>
      </div>
    </section>
    );
}

export default MoviesCardList;