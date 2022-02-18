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

function App() {
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isHeaderNavigationOpen, setIsHeaderNavigationOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  function handleHeaderNavigationClick() {
    setIsHeaderNavigationOpen(true);
  }

  function closeHeaderNavigation() {
    setIsHeaderNavigationOpen(false)
  }

  function handleCardSave(card) {
    return MainApi.addSavedMovie(card)
      .then((newCard) => {
        setSavedCards([newCard, ...savedCards]);
        setErrorMessage("");
      })
      .catch(err => {
        setErrorMessage(err);
        console.log(err)
      })
      .finally(() => {
        setTimeout(function () {
        setErrorMessage("");
        }, 1500);
      });
  }

  function handleCardDelete(card) {
    let deleteSavedCard = savedCards.find(item => item.movieId === card.movieId)
    return MainApi.deleteSavedMovie(deleteSavedCard)
      .then(() => {
        setSavedCards(savedCards.filter(item => item.movieId !== card.movieId));
        setErrorMessage("");
      })
      .catch(err => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setTimeout(function () {
        setErrorMessage("");
        }, 1500);
      });
  }

  function handleCardDiscard(card) {
    let deleteSavedCard = savedCards.find(item => item.movieId === card.id)
    return MainApi.deleteSavedMovie(deleteSavedCard)
      .then(() => {
        setSavedCards(savedCards.filter(item => item.movieId !== card.id));
        setErrorMessage("");
      })
      .catch(err => {
        setErrorMessage(err);
      })
      .finally(() => {
        setTimeout(function () {
        setErrorMessage("");
        }, 1500);
      });
  }

  function handleCardClick(card) {
    if (card.trailerLink) {
      window.open(card.trailerLink, '_blank');
    }
    else {
      window.open(card.trailer, '_blank');
    }
  }

  useEffect(() => {
    setIsLoading(true)
    moviesApi
      .getInitialCards()
      .then(data => {
        localStorage.setItem('movies', JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      });
  }, [loggedIn]);


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

  function handleRegister({ name, email, password }) {
    MainApi.register({ name, email, password })
      .then(() => {
        handleLogin({email, password});
        setErrorMessage('');
      })
      .catch((err) => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setTimeout(function () {
        setErrorMessage("");
        }, 5000);
      });
  }

  function handleLogin({ email, password }) {
     MainApi.authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          MainApi.getProfile().then(res => {
            setCurrentUser(res);
          }); 
          setLoggedIn(true)
          navigate("/movies");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
      })
      .finally(() => {
        setTimeout(function () {
        setErrorMessage("");
        }, 5000);
      });
  }

  function handleEditProfile({ name, email }) {
    MainApi.updateProfile({ name, email })
      .then((res) => {
        setCurrentUser(res.data)
      }
      )
      .catch((err) => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setTimeout(function () {
        setErrorMessage("");
        }, 1500);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('checkbox');
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
                  onCardSave={handleCardSave}
                  onCardDelete={handleCardDiscard}
                  onCardClick={handleCardClick}
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                />
              </ProtectedRoute>
            } />
            <Route exact path="/saved-movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  cards={cards}
                  savedMovies={savedCards}
                  onCardDelete={handleCardDelete}
                  onCardClick={handleCardClick}
                  isLoading={isLoading}
                  errorMessage={errorMessage} />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile onEditProfile={handleEditProfile} onSignOut={handleSignOut} errorMessage={errorMessage}/>
              </ProtectedRoute>
            } />
            <Route path="/signup" element={<Register onRegister={handleRegister} errorMessage={errorMessage}/>} />
            <Route path="/signin" element={<Login onLogin={handleLogin} errorMessage={errorMessage}/>} />
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
