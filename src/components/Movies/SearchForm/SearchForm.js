import buttonImg from "../../../images/text__COLOR_invisible.svg"

function SearchForm(props) {
  return (
    <section className="searchForm">
      <form className="searchForm__form">
      <input className="searchForm__input" placeholder="Фильм"></input>
      <button className="searchForm__button"><img className="searchForm__button-img" src={buttonImg} alt="Кнопка поиска"></img></button>
      </form>
      <div className="searchForm__filter">
      <label className="searchForm__switch">
        <input className="searchForm__checkbox" type="checkbox"/>
        <div className="searchForm__slider"></div>
      </label>
      <p className="searchForm__shortMovies">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;