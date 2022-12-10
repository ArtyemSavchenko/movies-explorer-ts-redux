import PortfolioLink from '../PortfolioLink/PortfolioLink';

import styles from './Portfolio.module.css';

const LINKS = [
  {
    name: 'Боевой проект',
    link: 'https://github.com/ArtyemSavchenko/mrc-zdorovie',
  },
  {
    name: 'Одностраничное приложение',
    link: 'https://github.com/ArtyemSavchenko/react-mesto-api-full',
  },
  {
    name: 'Адаптивный сайт',
    link: 'https://github.com/ArtyemSavchenko/russian-travel',
  },
];

const Portfolio = () => {
  return (
    <section className={styles.portfolio}>
      <h2 className={styles.portfolio__heading}>Портфолио</h2>
      <ul className={styles.portfolio__list}>
        {LINKS.map((item) => (
          <li key={item.link}>
            <PortfolioLink href={item.link} target="_blank">
              {item.name}
            </PortfolioLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Portfolio;
