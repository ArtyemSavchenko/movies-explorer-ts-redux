import promoImg from '../../../../images/promo-logo.svg';

import styles from './Promo.module.css';

const Promo = () => {
  return (
    <section className={styles.promo}>
      <img
        className={styles.promo__img}
        src={promoImg}
        alt="Планета земля, нарисованная из слов веб."
      />
      <h1 className={styles.promo__heading}>
        Учебный проект студента факультета{' '}
        <span className="promo__noWrap">Веб-разработки</span>.
      </h1>
      <p className={styles.promo__subheading}>
        Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.
      </p>
      <a className={styles.promo__btnMore} href="#about-project">
        Узнать больше
      </a>
    </section>
  );
};

export default Promo;
