
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(props) {

  return (
    <section className="moviesCardList">
    {props.cards.map((item) => (
          <MoviesCard src={item.link} name={item.name} duration={item.duration} />
    ))}
    <div className="moreButtonSection">
      <button
        type='button'
        className="moreButton">
        Ещё
      </button>
    </div>
  </section>
  );
}

export default MoviesCardList;