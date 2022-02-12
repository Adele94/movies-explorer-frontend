import registerLogo from '../../images/header-logo.svg'
import {Link} from "react-router-dom"
import React from 'react';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ name, email, password });
  }
  
  return (
    <section  className="register"> 
      <Link to="/"><img className="register__logo" src={registerLogo} alt="Логотип"/></Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__content" onSubmit={handleSubmit}>
        <section className="register__input-section">
          <label className="register__label">Имя</label>
          <input type="text" className="register__input" onChange={handleNameChange} required minLength="2" maxLength="40" />
          <span className="register__input-error name-input-error"></span>
        </section>
        <section className="register__input-section">
          <label className="register__label">E-mail</label>
          <input type="email" className="register__input" onChange={handleEmailChange} required minLength="2" maxLength="200" />
          <span className="register__input-error description-input-error"></span>
        </section>
        <section className="register__input-section">
          <label className="register__label">Пароль</label>
          <input type="password" className="register__input register__input-password" onChange={handlePasswordChange} required minLength="5" maxLength="40" />
          <span className="register__input-error description-input-error register__input-error_active">Что-то пошло не так...</span>
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