import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  return (
    <div className="App">
    <Fragment>
      <Routes>  
        <Route path="/" element={<Header loggedIn={false}/>} exact/>
        <Route path="/movies" element={
          <ProtectedRoute loggedIn={true}>
            <Header loggedIn={false}/>
          </ProtectedRoute>
        }/>
        <Route path="/saved-movies" element={
          <ProtectedRoute loggedIn={true}>
            <Header loggedIn={false}/>
          </ProtectedRoute>
        }/>
        <Route path="/profile" element={
          <ProtectedRoute loggedIn={true}>
            <Header loggedIn={false}/>
          </ProtectedRoute>
        }/>
      </Routes>
      </Fragment>
    <Fragment>
      <Routes>  
        <Route path="/" element={<Main/>} exact/>
        <Route path="/movies"  element={
        <ProtectedRoute loggedIn={true}>
          <Movies />
        </ProtectedRoute>
         }/>
        <Route path="/saved-movies"  element={
        <ProtectedRoute loggedIn={true}>
          <SavedMovies />
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
