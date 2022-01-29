import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedMovies from '../SavedMovies/SavedMovies';
import pic1 from "../../images/picture1.png";
import pic2 from "../../images/picture2.png";
import pic3 from "../../images/picture3.png";
import pic4 from "../../images/picture4.png";
import pic5 from "../../images/picture5.png";
import pic6 from "../../images/picture6.png";
import pic7 from "../../images/picture7.png";
import pic8 from "../../images/picture8.png";
import pic9 from "../../images/picture9.png";
import pic10 from "../../images/picture10.png";
import pic11 from "../../images/picture11.png";
import pic12 from "../../images/picture12.png";

function App() {

  const initialCards = [
    {
      name: '33 слова о дизайне',
      link: pic1,
      duration: 77,
      isSaved: false
    },
    {
      name: 'Киноальманах «100 лет дизайна»',
      link: pic2,
      duration: 55,
      isSaved: false
    },
    {
      name: 'В погоне за Бенкси',
      link: pic3,
      duration: 148,
      isSaved: false
    },
    {
      name: 'Баския: Взрыв реальности',
      link: pic4,
      duration: 77,
      isSaved: false
    },
    {
      name: 'Бег это свобода',
      link: pic5,
      duration: 77,
      isSaved: false
    },
    {
      name: 'Книготорговцы',
      link: pic6,
      duration: 77,
      isSaved: false
    },
    {
      name: 'Когда я думаю о Германии ночью',
      link: pic7,
      duration: 77,
      isSaved: false
    },
    {
      name: 'Gimme Danger: История Игги и The Stooges',
      link: pic8,
      duration: 77,
      isSaved: false
    },
    {
      name: 'Дженис: Маленькая девочка грустит',
      link: pic9,
      duration: 77,
      isSaved: false
    },
    {
      name: 'Соберись перед прыжком',
      link: pic10,
      duration: 77,
      isSaved: false
    },
    {
      name: 'Пи Джей Харви: A dog called money',
      link: pic11,
      duration: 77,
      isSaved: false
    },
    {
      name: 'По волнам: Искусство звука в кино',
      link: pic12,
      duration: 77,
      isSaved: false
    }
  ];

  const savedCards = [
  
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

  const [isHeaderNavigationOpen, setIsHeaderNavigationOpen] = useState(false);

  function handleHeaderNavigationClick() {
    setIsHeaderNavigationOpen(true);
  }

  function closeHeaderNavigation() {
    setIsHeaderNavigationOpen(false)
  }

  function handleCardSave(card) {
    card.isSaved = !card.isSaved;
    return  card.isSaved;
  }

  return (
    <div className="App">
    <Fragment>
      <Routes>  
        <Route path="/" element={<Header loggedIn={false}/>} exact/>
        <Route path="/movies" element={
          <ProtectedRoute loggedIn={true}>
            <Header loggedIn={true} onHeaderNavigation={handleHeaderNavigationClick} isOpen={isHeaderNavigationOpen} onClose={closeHeaderNavigation}/>
          </ProtectedRoute>
        }/>
        <Route path="/saved-movies" element={
          <ProtectedRoute loggedIn={true}>
            <Header loggedIn={true} onHeaderNavigation={handleHeaderNavigationClick} isOpen={isHeaderNavigationOpen} onClose={closeHeaderNavigation}/>
          </ProtectedRoute>
        }/>
        <Route path="/profile" element={
          <ProtectedRoute loggedIn={true}>
            <Header loggedIn={true} onHeaderNavigation={handleHeaderNavigationClick} isOpen={isHeaderNavigationOpen} onClose={closeHeaderNavigation}/>
          </ProtectedRoute>
        }/>
      </Routes>
      </Fragment>
    <Fragment>
      <Routes>  
        <Route path="/" element={<Main/>} exact/>
        <Route path="/movies"  element={
        <ProtectedRoute loggedIn={true}>
          <Movies cards={initialCards} savedCards={savedCards} onCardSave={handleCardSave}/>
        </ProtectedRoute>
         }/>
        <Route path="/saved-movies"  element={
        <ProtectedRoute loggedIn={true}>
          <SavedMovies cards={initialCards} savedCards={savedCards}/>
        </ProtectedRoute>
         }/>
        <Route path="/profile" element={
        <ProtectedRoute loggedIn={true}>
          <Profile />
        </ProtectedRoute>
         }/>
        <Route path="/signup" element={<Register />}/>
        <Route path="/signin" element={<Login />}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
      </Fragment>
      <Fragment>
      <Routes>  
        <Route path="/" element={<Footer/>} exact/>
        <Route path="/movies" element={
          <ProtectedRoute loggedIn={true}>
            <Footer />
          </ProtectedRoute>
        }/>
        <Route path="/saved-movies" element={
          <ProtectedRoute loggedIn={true}>
            <Footer />
          </ProtectedRoute>
        }/>
      </Routes>
      </Fragment>
    </div>
  );
}

export default App;
