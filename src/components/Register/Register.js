import registerLogo from '../../images/header-logo.svg'
import {Link} from "react-router-dom"

function Register(props) {
  return (
    <section  className="register"> 
      <Link to="/"><img className="register__logo" src={registerLogo} alt="Логотип"/></Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__content" >
        <section className="register__input-section">
          <label className="register__label">Имя</label>
          <input type="text" className="register__input" required minLength="2" maxLength="40" />
          <span className="register__input-error name-input-error"></span>
        </section>
        <section className="register__input-section">
        <label className="register__label">E-mail</label>
          <input type="email" className="register__input" required minLength="2" maxLength="200" />
          <span className="register__input-error description-input-error"></span>
        </section>
        <section className="register__input-section">
        <label className="register__label">Пароль</label>
          <input type="password" className="register__input register__input-password" required minLength="2" maxLength="200" />
          <span className="register__input-error description-input-error register__input-error_active"></span>
        </section>
        <div className="register__button-container" >
          <button type="submit" className="register__submit"> Зарегистрироваться </button>
          <p className="register__question">Уже зарегистрированы?
            <Link to="/signin" className="register__link"> Войти</Link></p>
        </div >
      </form> 
    </section>
);
}

export default Register;