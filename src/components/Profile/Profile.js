function Profile(props) {
  return (
    <section className="profile">
          <div className="profile__form">
            <h2 className="profile__greeting">
              Привет, Виталий!
            </h2>
            <div className="profile__inputLabel">
              <label className="profile__label" htmlFor='name'>Имя</label>
              <input
                name='name'
                type='text'
                className="profile__input"
                id='name-profile'
                autoComplete='off'
              />
            </div>
            <div className="profile__inputLabel">
              <label className="profile__label" htmlFor='email'>E-mail</label>
              <input
                name='email'
                type='email'
                className="profile__input"
                id='email-profile'
                autoComplete='off'
              />
            </div>

            <div className="profile__buttons">
              <button
                type='submit'
                className="profile__button-edit"
              >
                Редактировать
              </button>
              <button
                type='button'
                className="profile__button-signout">
                Выйти из аккаунта
              </button>
            </div>
          </div>
    </section>
);
}

export default Profile;