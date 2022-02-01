import React from "react";
import buttonImg from "../../../images/text__COLOR_invisible.svg"

function SearchForm(props) {
  return (
    <section className="searchForm">
      <form className="searchForm__form" onSubmit={props.onSubmit}>
        <input className="searchForm__input" placeholder="Фильм" onChange={props.onChange} value={props.value}></input>
        <button className="searchForm__button"><img className="searchForm__button-img" src={buttonImg}></img></button>
      </form>
      <div className="searchForm__filter">
      <label class="searchForm__switch">
        <input className="searchForm__checkbox" type="checkbox"/>
        <div class="searchForm_slider"></div>
      </label>
      <p className="searchForm__shortMovies">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;