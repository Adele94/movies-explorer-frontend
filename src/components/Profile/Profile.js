import { useNavigate} from 'react-router-dom';

function Profile(props) {
  const navigate = useNavigate();

  function signout() {
    navigate('/');
  }

  return (
    <section className="profile">
      <form className="profile__form">
        <h2 className="profile__greeting">Привет, Виталий!</h2>
        <div className="profile__inputLabel">
          <label className="profile__label" >Имя</label>
          <input type="text" className="profile__input" required minLength="2" maxLength="200" />
        </div>
        <div className="profile__inputLabel">
          <label className="profile__label" >E-mail</label>
          <input type="email" className="profile__input" required minLength="2" maxLength="200" />
        </div>
        <div className="profile__buttons">
          <button type="submit" className="profile__button-edit">Редактировать </button>
          <button type='button' className="profile__button-signout" onClick={signout}>Выйти из аккаунта</button>
        </div>
      </form>
    </section>
);
}

export default Profile;