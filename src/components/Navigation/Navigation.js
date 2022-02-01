import { Link} from 'react-router-dom';

function Navigation(props) {
  return (
    <section className={`navigation ${props.isOpen ? 'navigation_is-opened' : ''}`}  >
      <div className="navigation__container">
        <button className="navigation__close " onClick={props.onClose} type="button"></button>
        <nav>
            <ul className="navigation__navList">
              <Link className="navigation__link"  to='/'>Главная</Link>
              <Link className="navigation__link"  to='/movies'>Фильмы</Link>
              <Link className="navigation__link" to='/saved-movies'>Сохранённые фильмы</Link>
            </ul>
          </nav>
          <Link to="/profile" className="navigation__profile">
            <p className='navigation__profileText'>Аккаунт</p>
            <div className='navigation__profileIcon'></div>
          </Link>
      </div>
    </section>
  );
}

export default Navigation;