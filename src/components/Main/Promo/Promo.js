import promoLogo from '../../../images/promo-logo.svg';

function Promo(props) {
  return (
    <section className="promo">
      <img className="promo__image" src={promoLogo} alt="Картинка шара"/>
      <h1 className="promo__title">Учебный проект студента факультета <br/> Веб-разработки.</h1>
      <h2 className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h2>
      <button className="promo__more-btn"><a className="promo__more-btn_link" href="#aboutProject">Узнать больше</a></button>
    </section>
  );
}

export default Promo;