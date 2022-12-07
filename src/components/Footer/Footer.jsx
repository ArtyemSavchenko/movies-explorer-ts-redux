import { useLocation } from 'react-router-dom';

import CustomLink from '../ui/CustomLink/CustomLink';

import './Footer.css';

const Footer = () => {
  const location = useLocation();

  if (
    location.pathname === '/signin' ||
    location.pathname === '/signup' ||
    location.pathname === '/profile'
  ) {
    return null;
  }

  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__link-box">
        <CustomLink
          extraClass="footer__link"
          feature="external-link"
          href="https://practicum.yandex.ru/"
        >
          Яндекс.Практикум
        </CustomLink>
        <CustomLink
          extraClass="footer__link"
          feature="external-link"
          href="https://github.com/ArtyemSavchenko"
        >
          Github
        </CustomLink>
        <p className="footer__year">© 2022</p>
      </div>
    </footer>
  );
};

export default Footer;
