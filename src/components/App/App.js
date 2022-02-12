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
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [isHeaderNavigationOpen, setIsHeaderNavigationOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegSuccess, setRegSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
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
    if (true) {
      moviesApi.getInitialCards()
        .then((res) => {
          setMovies(res);
        })
        .catch((err) => {
          console.log(err);
        });
      MainApi.getSavedMovies()
      .then((res) => {
        setSavedCards(res);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, []);


  function searchAllMovies(searchQuery, isChecked) {
    const searchResult = [];
    const shortResult = [];
    if (searchQuery) {
      if(location.pathname === '/movies'){
      movies.filter((item) => {
        const searchItem = item.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
        if (searchItem) {
          searchResult.push(item);
          if (item.duration <= 40)
            shortResult.push(item);
        }
      })
       }
       else {
        savedCards.filter((item) => {
          const searchItem = item.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
          if (searchItem) {
            searchResult.push(item);
            if (item.duration <= 40)
              shortResult.push(item);
          }
        })
       }
      if (searchResult.length !== 0) {
        setSearchMovies(searchResult);
      }
      if (shortResult !== 0) {
        setShortMovies(shortResult);
      }
      if (isChecked) {
        setCards(shortResult);
      }
      else {
        setCards(searchResult);
      }
    }
    else {
      setCards([]);
    }
  }

  function handleRegister({ name, email, password }) {
    MainApi.register({ name, email, password })
      .then(() => {
        setRegSuccess(true);
        navigate('/signin');
      })
      .catch((err) => {
        setRegSuccess(false);
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
            setUserName(res.name);
          });
          setUserEmail(email);
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
    setUserEmail('');
    setUserName('');
    setCurrentUser('');
    setLoggedIn(false);
  }

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      // проверяем токен пользователя
      MainApi.checkToken(jwt)
        .then((res) => {
          setUserEmail(res.email)
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    handleTokenCheck();
    if (loggedIn) {
      MainApi.getProfile().then(res => {
        setCurrentUser(res);
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
                  searchMovies={searchMovies}
                  shortMovies={shortMovies}
                  savedMovies={savedCards}
                  onSearchMovies={searchAllMovies}
                  onCardSave={handleCardSave}
                  onCardDelete={handleCardDelete}
                  onCardClick={handleCardClick} />
              </ProtectedRoute>
            } />
            <Route exact path="/saved-movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  cards={cards}
                  searchMovies={searchMovies}
                  shortMovies={shortMovies}
                  savedMovies={savedCards}
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
