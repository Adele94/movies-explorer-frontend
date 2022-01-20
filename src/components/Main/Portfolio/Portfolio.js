import portfolioArrow from "../../../images/portfolio-arrow.svg"

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
            <li className="portfolio__link-position">
              <a className="portfolio__link" href="https://github.com/Adele94/how-to-learn">
                Статичный сайт
                <img className="portfolio__link-icon" src={portfolioArrow} alt="Картинка стрелки"/>
              </a>
            </li>
            <li className="portfolio__link-position">
              <a className="portfolio__link" href="https://github.com/Adele94/russian-travel">
                Адаптивный сайт 
                <img className="portfolio__link-icon" src={portfolioArrow} alt="Картинка стрелки"/>
              </a>
            </li>
            <li className="portfolio__link-position">
              <a className="portfolio__link" href="https://github.com/Adele94">
                Одностраничное приложение
                <img className="portfolio__link-icon" src={portfolioArrow} alt="Картинка стрелки"/>
              </a>
            </li>
          </ul>
    </section>
  );
}

export default Portfolio;