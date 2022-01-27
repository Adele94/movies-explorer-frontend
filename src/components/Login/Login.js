import registerLogo from '../../images/header-logo.svg'
import {Link} from "react-router-dom"

function Login(props) {
  return (
    <section  className="login"> 
      <Link to="/"><img className="login__logo" src={registerLogo} alt="Логотип"/></Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__content" >
        <section className="login__input-section">
        <label className="login__label">E-mail</label>
          <input type="text" className="login__input"  value={''} name="description" required minLength="2" maxLength="200" />
          <span className="login__input-error description-input-error"></span>
        </section>
        <section className="login__input-section">
        <label className="login__label">Пароль</label>
          <input type="text" className="login__input"  value={''} name="description" required minLength="2" maxLength="200" />
          <span className="login__input-error description-input-error"></span>
        </section>
        <div className="login__button-container" >
          <button type="submit" className="login__submit"> Войти </button>
          <p className="login__question">Ещё не зарегистрированы?
            <Link to="/signup" className="login__link"> Регистрация </Link></p>
        </div >
      </form> 
    </section>
);
}

export default Login;