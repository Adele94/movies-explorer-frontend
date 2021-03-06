import registerLogo from '../../images/header-logo.svg'
import { Link } from "react-router-dom"
import React, { useCallback, useState, useEffect } from 'react';
import * as EmailValidator from 'email-validator';

function Register(props) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const registerSubmitClassName = (
    `register__submit ${!isValid ? 'register__submit_disable' : ''}`
  );

  const registerInputClassName = (
    `register__input ${errors["password"] !== "" ? 'register__input_error' : ''}`
  );

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setErrorMessage('');
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity() && errors.email!=='Неверный формат почты')
    if (!target.validationMessage && name === "email") {
      if (!EmailValidator.validate(value)) {
        setErrors({ ...errors, ["email"]: 'Неверный формат почты' });
        setIsValid(false);
      }
      else {
        setErrors({ ...errors, ["email"]: '' });
        setIsValid(target.closest("form").checkValidity())
      }
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = { name: "", email: "", password: "" }, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setErrorMessage('')
    },
    [setValues, setErrors, setIsValid]
  );

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ name: values.name, email: values.email, password: values.password })
    resetForm();
  }
  
  useEffect(() => {
    if (props.errorMessage != '') {
      if (props.errorMessage === 'Ошибка: 409 undefined') {
        setErrorMessage("Пользователь с таким email уже существует");
      }
    }
    else {
      setErrorMessage('');
    }
  }, [props.errorMessage]);


  return (
    <section className="register">
      <Link to="/"><img className="register__logo" src={registerLogo} alt="Логотип" /></Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__content" onSubmit={handleSubmit}>
        <section className="register__input-section">
          <label className="register__label">Имя</label>
          <input type="text" className="register__input" name="name" onChange={handleChange} value={values.name || ""} required minLength="2" maxLength="40" />
          <span className="register__input-error register__input-error_active">{errors["name"]}</span>
        </section>
        <section className="register__input-section">
          <label className="register__label">E-mail</label>
          <input type="email" className="register__input" name="email" onChange={handleChange} value={values.email || ""} required minLength="2" maxLength="200" />
          <span className="register__input-error register__input-error_active">{errors["email"]}</span>
        </section>
        <section className="register__input-section">
          <label className="register__label">Пароль</label>
          <input type="password" className={registerInputClassName} name="password" onChange={handleChange} value={values.password || ""} required minLength="5" maxLength="40" />
          <span className="register__input-error register__input-error_active">{errors["password"]}</span>
        </section>
        {<p className="register__error">{errorMessage}</p>}
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