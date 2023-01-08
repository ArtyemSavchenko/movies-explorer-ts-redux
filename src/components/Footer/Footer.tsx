import { useLocation } from 'react-router-dom';

import CustomLink from '../ui/CustomLink/CustomLink';

import styles from './Footer.module.css';

const pathsWithoutFooter = ['/signin', '/signup', '/profile'];

const Footer = () => {
  const location = useLocation();

  if (pathsWithoutFooter.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <p className={styles.footer__text}>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className={styles.footer__linkBox}>
        <CustomLink
          extraClass={styles.footer__link}
          feature="external-link"
          href="https://practicum.yandex.ru/"
        >
          Яндекс.Практикум
        </CustomLink>
        <CustomLink
          extraClass={styles.footer__link}
          feature="external-link"
          href="https://github.com/ArtyemSavchenko"
        >
          Github
        </CustomLink>
        <p className={styles.footer__year}>© 2022</p>
      </div>
    </footer>
  );
};

export default Footer;
