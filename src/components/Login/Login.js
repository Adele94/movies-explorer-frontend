import registerLogo from '../../images/header-logo.svg'
import { Link } from "react-router-dom"
import React, { useCallback, useState, useEffect } from 'react';
import * as EmailValidator from 'email-validator';

function Login(props) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loginSubmitClassName = (
    `login__submit ${!isValid ? 'login__submit_disable' : ''}`
  );

  const loginInputClassName = (
    `login__input ${errors["password"] !== "" ? 'login__input_error' : ''}`
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
    (newValues = {}, newErrors = { name: "", password: "" }, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setErrorMessage('')
    },
    [setValues, setErrors, setIsValid]
  );


  const handleSubmit = async (e) => {
    e.preventDefault();
    props.onLogin({ email: values.email, password: values.password })
    resetForm();
  }

  useEffect(() => {
    if (props.errorMessage != '') {
      setErrorMessage('Неправильный логин или пароль.');
    }
    else {
      setErrorMessage('');
    }
  }, [props.errorMessage]);

  return (
    <section className="login">
      <Link to="/"><img className="login__logo" src={registerLogo} alt="Логотип" /></Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__content" onSubmit={handleSubmit} >
        <section className="login__input-section">
          <label className="login__label">E-mail</label>
          <input type="email" className="login__input" name="email" onChange={handleChange} value={values.email || ""} required minLength="2" maxLength="200" />
          <span className="login__input-error login__input-error_active">{errors["email"]}</span>
        </section>
        <section className="login__input-section">
          <label className="login__label">Пароль</label>
          <input type="password" className={loginInputClassName} name="password" onChange={handleChange} value={values.password || ""} required minLength="5" maxLength="40" />
          <span className="login__input-error login__input-error_active">{errors["password"]}</span>
        </section>
        {<p className="login__error">{errorMessage}</p>}
        <div className="login__button-container" >
          <button type="submit" className={loginSubmitClassName} disabled={!isValid}> Войти </button>
          <p className="login__question">Ещё не зарегистрированы?
            <Link to="/signup" className="login__link"> Регистрация </Link></p>
        </div >
      </form>
    </section>
  );
}

export default Login;