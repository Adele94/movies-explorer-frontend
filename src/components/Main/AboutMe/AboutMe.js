import AboutMeImg from '../../../images/aboutMe-img.jpg'

function AboutMe(props) {
  return (
    <section className="aboutMe">
      <h1 className="aboutMe__title">Студент</h1>
      <div className="aboutMe__conteiner">
        <div className="aboutMe__info">
          <h2 className="aboutMe__name">Адель</h2>
          <h2 className="aboutMe__subtitle">Фронтенд-разработчик, 27 лет</h2>
          <p className="aboutMe__text">Я родилась в Нефтекамске, сейчас живу в Казани, закончила факультет прикладной математики и информатики в КФУ. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          
          <ul className="aboutMe__links">
            <li className="aboutMe__link-position">
              <a  className="aboutMe__link" href="https://www.linkedin.com/in/adel-nabiullina-b391a9227/">Linkedin</a>
            </li>
            <li className="aboutMe__link-position">
              <a  className="aboutMe__link" href="https://github.com/Adele94">Github</a>
            </li>
          </ul>
      </div>
      <img className="aboutMe__image" src={AboutMeImg} alt="фотография студента"/>
      </div>
    </section>
  );
}

export default AboutMe;