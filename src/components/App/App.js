import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
    <Header  loggedIn={false}/>
    <Fragment>
      <Routes>  
        <Route path="/" element={<Main/>} exact/>
        <Route path="/movies" element={<Movies/>}/>
      </Routes>
      </Fragment>
      <Footer />
    </div>
  );
}

export default App;
