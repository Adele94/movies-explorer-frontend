function Footer(props) {
  return (
    <section className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2> 
      <div className="footer__navigation">
      <p className="footer__copyright">© 2022</p>    
        <ul className="footer__links">
          <li className="footer__link-position">
            <a className="footer__link" href="https://practicum.yandex.ru/profile/web/"  target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__link-position">
            <a className="footer__link" href="https://github.com/Adele94" target="_blank" rel="noreferrer">Github</a>
          </li>
          <li className="footer__link-position">
            <a className="footer__link" href="https://www.linkedin.com/in/adel-nabiullina-b391a9227/"  target="_blank" rel="noreferrer">Linkedin</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;