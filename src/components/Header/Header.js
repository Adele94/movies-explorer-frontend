import { Link, useNavigate} from 'react-router-dom';
import React from 'react';
import headerLogo from '../../images/header-logo.svg'
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const navigate = useNavigate();

  function handleAuthButtonClick() {
    navigate('/signin');
  }

  return (   
    <>
    {!props.loggedIn &&
    <header className="header">
      <Link to="/"><img className="header__logo" src={headerLogo} alt="Логотип" /></Link>
        <div className='header__navigation'>
          <Link to="/signup" className='header__registration'>Регистрация</Link>
          <button onClick={handleAuthButtonClick} className='header__auth-btn'>Войти</button>
        </div>
    </header>
    }
    {
      props.loggedIn &&
      <header className="header header__otherPage">
      <Link to="/"><img className="header__logo" src={headerLogo} alt="Логотип" /></Link>
          <nav>
            <ul className="header__navList">
              <Link className="header__link"  to='/movies'>Фильмы</Link>
              <Link className="header__link" to='/saved-movies'>Сохранённые фильмы</Link>
            </ul>
          </nav>
          <Link to="/profile" className="header__profile">
            <p className='header__profileText'>Аккаунт</p>
            <div className='header__profileIcon'></div>
          </Link>
          <button type='button' className="header_menuButton" onClick={props.onHeaderNavigation}> </button>
          <Navigation isOpen={props.isOpen} onClose={props.onClose} />
      </header>
    }
    </>
  );
}

export default Header;