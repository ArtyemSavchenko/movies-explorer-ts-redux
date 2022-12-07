import promoImg from '../../../../images/promo-logo.svg';

import './Promo.css';

const Promo = () => {
  return (
    <section className="promo">
      <img
        className="promo__img"
        src={promoImg}
        alt="Планета земля, нарисованная из слов веб."
      />
      <h1 className="promo__heading">
        Учебный проект студента факультета{' '}
        <span className="promo__no-wrap">Веб-разработки</span>.
      </h1>
      <p className="promo__subheading">
        Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.
      </p>
      <a className="promo__btn-more" href="#about-project">
        Узнать больше
      </a>
    </section>
  );
};

export default Promo;
