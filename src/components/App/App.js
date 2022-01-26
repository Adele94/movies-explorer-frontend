import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  return (
    <div className="App">
    <Fragment>
      <Routes>  
        <Route path="/" element={<Header loggedIn={false}/>} exact/>
        <Route path="/movies" element={<Header loggedIn={false}/>}/>
        <Route path="/profile" element={<Header loggedIn={false}/>}/>
      </Routes>
      </Fragment>
    <Fragment>
      <Routes>  
        <Route path="/" element={<Main/>} exact/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
      </Fragment>
      <Fragment>
      <Routes>  
        <Route path="/" element={<Footer/>} exact/>
        <Route path="/movies" element={<Footer />}/>
      </Routes>
      </Fragment>
    </div>
  );
}

export default App;
