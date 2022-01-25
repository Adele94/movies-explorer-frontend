import pic1 from "../../images/picture1.png"
import pic2 from "../../images/picture2.png"
import pic3 from "../../images/picture3.png"
import pic4 from "../../images/picture4.png"
import pic5 from "../../images/picture5.png"
import pic6 from "../../images/picture6.png"
import pic7 from "../../images/picture7.png"
import pic8 from "../../images/picture8.png"
import pic9 from "../../images/picture9.png"
import pic10 from "../../images/picture10.png"
import pic11 from "../../images/picture11.png"
import pic12 from "../../images/picture12.png"
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader"

const initialCards = [
  {
    name: '33 слова о дизайне',
    link: pic1,
    duration: 77
  },
  {
    name: 'Киноальманах «100 лет дизайна»',
    link: pic2,
    duration: 55
  },
  {
    name: 'В погоне за Бенкси',
    link: pic3,
    duration: 148
  },
  {
    name: 'Баския: Взрыв реальности',
    link: pic4,
    duration: 77
  },
  {
    name: 'Бег это свобода',
    link: pic5,
    duration: 77
  },
  {
    name: 'Книготорговцы',
    link: pic6,
    duration: 77
  },
  {
    name: 'Когда я думаю о Германии ночью',
    link: pic7,
    duration: 77
  },
  {
    name: 'Gimme Danger: История Игги и The Stooges',
    link: pic8,
    duration: 77
  },
  {
    name: 'Дженис: Маленькая девочка грустит',
    link: pic9,
    duration: 77
  },
  {
    name: 'Соберись перед прыжком',
    link: pic10,
    duration: 77
  },
  {
    name: 'Пи Джей Харви: A dog called money',
    link: pic11,
    duration: 77
  },
  {
    name: 'По волнам: Искусство звука в кино',
    link: pic12,
    duration: 77
  }
];


function Movies(props) {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList  cards={initialCards}/>
    </div>
);
}

export default Movies;