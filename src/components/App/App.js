import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import React, { Fragment, useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedMovies from '../SavedMovies/SavedMovies';
import moviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useLocation } from 'react-router-dom';

function App() {
  const [cards, setCards] = useState([]); // фильмы показанные на странице movies
  const [savedCards, setSavedCards] = useState([]);  // фильмы показанные на странице saved-movies
  const [movies, setMovies] = useState([]); //все фильмы с beat-films
  const [searchMovies, setSearchMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [searchSavedMovies, setSearchSavedMovies] = useState([]);
  const [shortSavedMovies, setShortSavedMovies] = useState([]);
  const [isHeaderNavigationOpen, setIsHeaderNavigationOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();
  let location = useLocation();

  function handleHeaderNavigationClick() {
    setIsHeaderNavigationOpen(true);
  }

  function closeHeaderNavigation() {
    setIsHeaderNavigationOpen(false)
  }

  function handleCardSave(card) {
    card.isSaved = !card.isSaved;
    MainApi.addSavedMovie(card)
      .then((newCard) => {
        setSavedCards([newCard, ...savedCards]);
      })
    return card.isSaved;
  }

  function handleCardDelete(card) {
    card.isSaved = !card.isSaved;
    MainApi.deleteSavedMovie(card)
      .then((res) => {
        setSavedCards(savedCards.filter(item => item._id !== card._id));
      })
    return card.isSaved;
  }

  function handleCardClick(card) {
    window.open(card.trailerLink, '_blank');
  }

  useEffect(() => {
    moviesApi.getInitialCards()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  useEffect(() => {
    handleTokenCheck();
    if (loggedIn) {
      MainApi.getProfile().then(currentUser => {
        setCurrentUser(currentUser);
        MainApi.getSavedMovies()
          .then((res) => {
            let usersSavedMovies = [];
            res.forEach(savedMovie => {
              if (savedMovie.owner === currentUser._id) {
                usersSavedMovies.push(savedMovie);
              }
            })
            setSavedCards(usersSavedMovies);
          })
          .catch((err) => {
            console.log(err);
          })
      })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);


  useEffect(() => {
    if (loggedIn === true) {
      navigate("/movies");
    }
  }, [loggedIn]);

  function handleCheckboxClick(isChecked) {
    if (location.pathname === '/movies'){
      if(!isChecked){
        setCards(searchMovies);
      }
      else{
        setCards(shortMovies)
      }
    }
    else {
      let SearchSavedMovies = [];
      let ShortSavedMovies = [];

      savedCards.filter((item) => {
          SearchSavedMovies.push(item);
          setSearchSavedMovies(SearchSavedMovies);
          if (item.duration <= 40){
          ShortSavedMovies.push(item);
          setShortSavedMovies(ShortSavedMovies)
          }
      })
      if (!isChecked) {
        setSavedCards(searchSavedMovies);
      }
      else {
        setSavedCards(shortSavedMovies);
      }
    }
  }

  function searchAllMovies(searchQuery, isChecked) {
    setSearchMovies([]);
    setShortMovies([]);
    setSearchSavedMovies([]);
    setShortSavedMovies([]);
    if (location.pathname === '/movies') {
      if (searchQuery) {
        movies.filter((item) => {
          const searchItem = item.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
          if (searchItem) {
            setSearchMovies(oldArray =>[...oldArray, item]);
            if (item.duration <= 40){
            setShortMovies(oldArray => [...oldArray, item]);
            }
          }
        })
        if (!isChecked) {
          setCards(searchMovies);
        }
        else {
          setCards(shortMovies);
        }
      }
      else{
        setSearchMovies([]);
        setShortMovies([]);
        setCards([]);
      }
    }
    else {
      savedCards.filter((item) => {
        const searchItem = item.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
        if (searchItem) {
          setSearchSavedMovies(oldArray =>[...oldArray, item])
          if (item.duration <= 40){
          setShortSavedMovies(oldArray =>[...oldArray, item])
          }
        }
      })
      if (!isChecked) {
        setSavedCards(searchSavedMovies);
      }
      else {
        setSavedCards(shortSavedMovies);
      }
    }
  }

  function handleRegister({ name, email, password }) {
    MainApi.register({ name, email, password })
      .then(() => {
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleLogin({ email, password }) {
    MainApi.authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          MainApi.getProfile().then(res => {
            setCurrentUser(res);
          });
          setLoggedIn(true);
          navigate('/movies')
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleEditProfile({ name, email }) {
    MainApi.updateProfile({ name, email })
      .then((res) => {
        setCurrentUser(res.data)
      }
      )
      .catch((err) => {
        console.log(err);
      })
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setCurrentUser('');
    setCards([]);
    setSavedCards([]);
    setLoggedIn(false);
  }

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      // проверяем токен пользователя
      MainApi.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Fragment>
          <Routes>
            <Route path="/" element={<Header loggedIn={loggedIn} />} exact />
            <Route path="/movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} onHeaderNavigation={handleHeaderNavigationClick} isOpen={isHeaderNavigationOpen} onClose={closeHeaderNavigation} />
              </ProtectedRoute>
            } />
            <Route path="/saved-movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} onHeaderNavigation={handleHeaderNavigationClick} isOpen={isHeaderNavigationOpen} onClose={closeHeaderNavigation} />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} onHeaderNavigation={handleHeaderNavigationClick} isOpen={isHeaderNavigationOpen} onClose={closeHeaderNavigation} />
              </ProtectedRoute>
            } />
          </Routes>
        </Fragment>
        <Fragment>
          <Routes>
            <Route path="/" element={<Main loggedIn={loggedIn} />} exact />
            <Route exact path="/movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  cards={cards}
                  savedMovies={savedCards}
                  onSearchMovies={searchAllMovies}
                  onCheckboxClick={handleCheckboxClick}
                  onCardSave={handleCardSave}
                  onCardDelete={handleCardDelete}
                  onCardClick={handleCardClick}
                />
              </ProtectedRoute>
            } />
            <Route exact path="/saved-movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  cards={cards}
                  savedMovies={savedCards}
                  onCheckboxClick={handleCheckboxClick}
                  onSearchMovies={searchAllMovies}
                  onCardDelete={handleCardDelete}
                  onCardClick={handleCardClick} />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile onEditProfile={handleEditProfile} onSignOut={handleSignOut} />
              </ProtectedRoute>
            } />
            <Route path="/signup" element={<Register onRegister={handleRegister} />} />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Fragment>
        <Fragment>
          <Routes>
            <Route path="/" element={<Footer />} exact />
            <Route path="/movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/saved-movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Footer />
              </ProtectedRoute>
            } />
          </Routes>
        </Fragment>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
