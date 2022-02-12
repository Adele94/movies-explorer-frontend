import registerLogo from '../../images/header-logo.svg'
import {Link} from "react-router-dom"
import React from 'react';

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({ email, password });
  }
  return (
    <section  className="login"> 
      <Link to="/"><img className="login__logo" src={registerLogo} alt="Логотип"/></Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__content" onSubmit={handleSubmit}>
        <section className="login__input-section">
          <label className="login__label">E-mail</label>
          <input type="email" className="login__input" onChange={handleEmailChange} required minLength="2" maxLength="200" />
          <span className="login__input-error login__input-error_active"></span>
        </section>
        <section className="login__input-section">
          <label className="login__label">Пароль</label>
          <input type="password" className="login__input" onChange={handlePasswordChange} required minLength="2" maxLength="200" />
          <span className="login__input-error login__input-error_active"></span>
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