
import MoviesCard from '../MoviesCard/MoviesCard'
import { useLocation } from 'react-router-dom';
import moviesApi from "../../../utils/MoviesApi";
import React, {useState} from 'react';

function MoviesCardList(props) {
  let location = useLocation();
  const cards = props.cards;
  const savedCards = props.savedMovies;
  const [cardsCount, setCardsCount] = useState(0);
  const windowWidth = window.innerWidth;
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(true);

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

  React.useEffect(() => {
    if (cardsCount >= cards.length) {
      setIsMoreButtonVisible(false);
    }
    else {
      setIsMoreButtonVisible(true);
    }
    if(cardsCount === 0)
    {
      setIsMoreButtonVisible(false);
    }
  }, [cardsCount, cards]);

  return (
    <section className="moviesCardsSection">
    <div className="moviesCardList"> 
     {location.pathname === '/movies'? (
        cards.slice(0, cardsCount).map((item) => (
            <MoviesCard 
            savedMovies = {props.savedMovies}
            key={item._id} 
            cardItem={item}  
            onCardSave={props.onCardSave} 
            onCardDelete={props.onCardDelete} 
            onCardClick={props.onCardClick} 
            src={moviesApi.url+item.image.url} 
            name={item.nameRU} 
            duration={item.duration}/>
      ))
      ) : (
        savedCards.map((item) => (
          <MoviesCard 
          savedMovies = {props.savedMovies}
          key={item._id} 
          cardItem={item} 
          onCardDelete={props.onCardDelete} 
          onCardClick={props.onCardClick} 
          src={item.thumbnail} name={item.nameRU} 
          duration={item.duration} />
        ))
      )}
      </div>
      <div className="moviesCardsBottom">
      {location.pathname === '/movies' && isMoreButtonVisible ? (
      <div className="moreButtonSection">
        <button type='button' className="moreButton" onClick={handleMoreButtonClick}> Ещё </button>
      </div>
      ): (
        <div className="save-devider" />
      )} 
    </div>
  </section>
    );
}

export default MoviesCardList;