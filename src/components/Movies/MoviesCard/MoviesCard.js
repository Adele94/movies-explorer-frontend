
function MoviesCard(props) {

  const hour = Math.floor(parseInt(props.duration)/60);
  const min = parseInt(props.duration)%60;

  const getTime = (hour===0) ? (min.toString() + "м") : (hour.toString() + "ч " + min.toString() + "м");
  

  return (
    <div className="moviesCard">
    <img className="moviesCard__image"  src={props.src} alt={props.name} />
    <button className="moviesCard__save" type="button">Сохранить</button>
    <div className="moviesCard__info">
      <h2 className="moviesCard__text">{props.name}</h2>
      <p className="moviesCard__duration">{getTime}</p>
    </div>
  </div>
  );
}

export default MoviesCard;