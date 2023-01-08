import styles from './Promo.module.css';

const Promo = () => {
  return (
    <section className={styles.promo}>
      <h1 className={styles.promo__heading}>поиск фильмов</h1>
      <h2 className={styles.promo__subheading}>
        Яндекс.Практикум <span className={styles.promo__separator} /> BeatFilm
      </h2>
      <h3 className={styles.promo__training}>учебный проект</h3>
    </section>
  );
};

export default Promo;
