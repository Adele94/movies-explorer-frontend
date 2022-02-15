import registerLogo from '../../images/header-logo.svg'
import {Link} from "react-router-dom"
import React, { useCallback } from 'react';

function Register(props) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const registerSubmitClassName = (
    `register__submit ${!isValid ? 'register__submit_disable' : ''}`
  );

  const registerInputClassName = (
    `register__input ${errors["password"]!=="" ? 'register__input_error' : ''}`
  );
  
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  function handleSubmit(e) {
    e.preventDefault();
    let name = values["name"];
    let email = values["email"];
    let password = values["password"];
    props.onRegister({ name, email, password });
    resetForm();
  }
  
  return (
    <section  className="register"> 
      <Link to="/"><img className="register__logo" src={registerLogo} alt="Логотип"/></Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__content" onSubmit={handleSubmit}>
        <section className="register__input-section">
          <label className="register__label">Имя</label>
          <input type="text" className="register__input" name="name" onChange={handleChange} required minLength="2" maxLength="40" />
          <span className="register__input-error name-input-error">{errors["name"]}\</span>
        </section>
        <section className="register__input-section">
          <label className="register__label">E-mail</label>
          <input type="email" className="register__input" name="email" onChange={handleChange} required minLength="2" maxLength="200" />
          <span className="register__input-error description-input-error">{errors["email"]}</span>
        </section>
        <section className="register__input-section">
          <label className="register__label">Пароль</label>
          <input type="password" className={registerInputClassName} name="password" onChange={handleChange} required minLength="5" maxLength="40" />
          <span className="register__input-error description-input-error register__input-error_active">{errors["password"]}</span>
        </section>
        <div className="register__button-container" >
          <button type="submit" className={registerSubmitClassName}> Зарегистрироваться </button>
          <p className="register__question">Уже зарегистрированы?
            <Link to="/signin" className="register__link"> Войти</Link></p>
        </div >
      </form> 
    </section>
);
}

export default Register;