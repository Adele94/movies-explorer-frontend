import portfolioArrow from "../../../images/portfolio-arrow.svg"

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
            <li className="portfolio__link-position">
              <a className="portfolio__link" href="https://github.com/Adele94/how-to-learn" target="_blank" rel="noreferrer">
                Статичный сайт
                <img className="portfolio__link-icon" src={portfolioArrow} alt="Картинка стрелки"/>
              </a>
            </li>
            <li className="portfolio__link-position">
              <a className="portfolio__link" href="https://github.com/Adele94/russian-travel" target="_blank" rel="noreferrer">
                Адаптивный сайт 
                <img className="portfolio__link-icon" src={portfolioArrow} alt="Картинка стрелки"/>
              </a>
            </li>
            <li className="portfolio__link-position">
              <a className="portfolio__link" href="https://github.com/Adele94/react-mesto-api-full" target="_blank" rel="noreferrer">
                Одностраничное приложение
                <img className="portfolio__link-icon" src={portfolioArrow} alt="Картинка стрелки"/>
              </a>
            </li>
          </ul>
    </section>
  );
}

export default Portfolio;