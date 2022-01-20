import { Routes, Route, Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import headerLogo from '../../images/header-logo.svg'

function Header(props) {
  return (
    <>
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
          <div className='header__navigation'>
          <Link to="/signup" className='header__registration'>Регистрация</Link>
          <button to='/signin' className='header__auth-btn'>Войти</button>
        </div>
    </header>
    </>
  );
}

export default Header;