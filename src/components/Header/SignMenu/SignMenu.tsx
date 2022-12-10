import CustomLink from '../../ui/CustomLink/CustomLink';

import styles from './SignMenu.module.css';

const SignMenu = () => {
  return (
    <div className={styles.signMenu}>
      <CustomLink
        feature="internal-link"
        extraClass={styles.signMenu__link}
        to="signup"
      >
        Регистрация
      </CustomLink>
      <CustomLink
        feature="internal-link"
        extraClass={styles.signMenu__btn}
        to="signin"
      >
        Войти
      </CustomLink>
    </div>
  );
};

export default SignMenu;
