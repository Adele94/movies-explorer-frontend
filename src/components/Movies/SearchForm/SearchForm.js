import React, {useState} from 'react';
import buttonImg from "../../../images/text__COLOR_invisible.svg"

function SearchForm(props) {
const [searchQuery, setSearchQuery] = useState('');
const checkBox = document.getElementById("searchForm-checkbox");

function handleSearchFormChange(event){
  setSearchQuery(event.target.value);
 }

function handleSubmit(e) {
  e.preventDefault();
  props.onSearchMovies(searchQuery, checkBox.checked);
}

function handleCheckboxClick() {
  if (checkBox.checked === true) {
    props.onCheckboxClick(true);
    } 
  else {
    props.onCheckboxClick(false);
  }
}  
return (
    <section className="searchForm">
      <form className="searchForm__form" onSubmit={handleSubmit}>
        <input className="searchForm__input" placeholder="Фильм" onChange={handleSearchFormChange}  value={searchQuery || ''} ></input>
        <button className="searchForm__button"><img className="searchForm__button-img" src={buttonImg} alt="Кнопка поиска"></img></button>
      </form>
      <div className="searchForm__filter">
      <label className="searchForm__switch">
        <input className="searchForm__checkbox" id="searchForm-checkbox" type="checkbox" onClick={handleCheckboxClick}/>
        <div className="searchForm__slider"></div>
      </label>
      <p className="searchForm__shortMovies">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;