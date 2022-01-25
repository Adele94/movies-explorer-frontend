import buttonImg from "../../../images/text__COLOR_invisible.svg"
import tumbImg from "../../../images/smalltumb.svg"

function SearchForm(props) {
  return (
    <section className="searchForm">
      <div className="searchForm__form">
      <input className="searchForm__input" placeholder="Фильм"></input>
      <button className="searchForm__button"><img className="searchForm__button-img" src={buttonImg}></img></button>
      </div>
      <div className="searchForm__filter">
      <label class="switch">
        <input className="searchForm__checkbox" type="checkbox" id="togBtn"/>
        <div class="searchForm_slider"></div>
      </label>
      <p className="searchForm__shortMovies">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;