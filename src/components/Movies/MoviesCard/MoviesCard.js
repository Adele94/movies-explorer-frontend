import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  let location = useLocation();

  const hour = Math.floor(parseInt(props.duration)/60);
  const min = parseInt(props.duration)%60;

  const getTime = (hour===0) ? (min.toString() + "м") : (hour.toString() + "ч " + min.toString() + "м");
  
  const isSaved = props.savedMovies.some(i => i.movieId === props.cardItem.id);
  const cardSaveButtonClassName = (
      `${isSaved ? 'moviesCard__saved' : 'moviesCard__save'}`
  );
  
  const buttonText = (isSaved ? '' : 'Сохранить');

  function handleSaveClick() {
    if(!isSaved){
      props.onCardSave(props.cardItem)
    }
    else{
      props.onCardDelete(props.cardItem);
    }
  }

  function handleDeleteClick() {
    console.log("фильм удален");
    props.onCardDelete(props.cardItem);
  }

  function handleClick() {
    props.onCardClick(props.cardItem);
  }

  return (
    <div className="moviesCard">
    <img className="moviesCard__image" onClick={handleClick}  src={props.src} alt={props.name} />
    {location.pathname === '/movies'? (
      <button type="button" onClick={handleSaveClick} className={cardSaveButtonClassName}>{buttonText}</button>
    ) : (
      <button type="button" onClick={handleDeleteClick} className='moviesCard__delete'></button>
    )}
    <div className="moviesCard__info">
      <h2 className="moviesCard__text">{props.name}</h2>
      <p className="moviesCard__duration">{getTime}</p>
    </div>
  </div>
  );
}

export default MoviesCard;