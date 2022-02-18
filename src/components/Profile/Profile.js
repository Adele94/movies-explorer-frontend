import React, { useEffect, useContext, useState } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isSubmitted, setIsSubmitted] = useState(false)
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleNameChange(e) {
    setIsSubmitted(false);
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setIsSubmitted(false);
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name != currentUser.name || email != currentUser.email) {
      props.onEditProfile({ name, email });
      setIsSubmitted(true);
    }
  }
  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h2 className="profile__greeting">Привет, {name}!</h2>
        <div className="profile__inputLabel">
          <label className="profile__label" >Имя</label>
          <input type="text" className="profile__input" onChange={handleNameChange} value={name || ''} name="name" required minLength="2" maxLength="200" />
        </div>
        <div className="profile__inputLabel">
          <label className="profile__label" >E-mail</label>
          <input type="email" className="profile__input" onChange={handleEmailChange} value={email || ''} name="email" required minLength="2" maxLength="200" />
        </div>
        {isSubmitted && <p className="profile__message">{props.errorMessage ? props.errorMessage : "Изменения сохранены"}</p>}
        <div className="profile__buttons">
          <button type="submit" className="profile__button-edit">Редактировать </button>
          <button type='button' className="profile__button-signout" onClick={props.onSignOut}>Выйти из аккаунта</button>
        </div>
      </form>
    </section>
  );
}

export default Profile;