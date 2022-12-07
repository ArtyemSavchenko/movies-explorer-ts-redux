import CustomLink from '../../ui/CustomLink/CustomLink';

import './SignMenu.css';

const SignMenu = () => {
  return (
    <div className="sign-menu">
      <CustomLink feature="internal-link" extraClass="sign-menu__link" to="signup">
        Регистрация
      </CustomLink>
      <CustomLink feature="internal-link" extraClass="sign-menu__btn" to="signin">
        Войти
      </CustomLink>
    </div>
  );
};

export default SignMenu;
