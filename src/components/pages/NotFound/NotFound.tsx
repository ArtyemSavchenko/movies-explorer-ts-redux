import { useNavigate } from 'react-router-dom';

import CustomLink from '../../ui/CustomLink/CustomLink';

import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.notFoundPage}>
      <div className={styles.notFoundPage__content}>
        <p className={styles.notFoundPage__errNumber}>404</p>
        <p className={styles.notFoundPage__errText}>Страница не найдена</p>
      </div>
      <CustomLink
        extraClass={styles.notFoundPage__link}
        feature="button"
        appearance="accent"
        onClick={() => navigate(-1)}
      >
        Назад
      </CustomLink>
    </section>
  );
};

export default NotFound;
