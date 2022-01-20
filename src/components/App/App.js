import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <Fragment>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main/>}/>
      </Routes>
      </Fragment>
    </div>
  );
}

export default App;
