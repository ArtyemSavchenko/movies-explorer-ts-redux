import PortfolioLink from '../PortfolioLink/PortfolioLink';

import './Portfolio.css';

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
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <ul className="portfolio__list">
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
