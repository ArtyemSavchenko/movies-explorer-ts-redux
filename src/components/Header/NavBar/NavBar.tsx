import { PointerEventHandler, useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import BurgerButton from '../BurgerButton/BurgerButton';
import BtnClose from '../../ui/BtnClose/BtnClose';

import { IActiveNavClassSetter } from '../../../types/ActiveNavClassSetter';

import styles from './NavBar.module.css';


const NavBar = () => {
  const [isOpened, setIsOpened] = useState(false);

  const setLinkClass: IActiveNavClassSetter = ({ isActive }) =>
    classNames(styles.navBar__link, isActive && styles.navBar__link_active);

  const setBtnClass: IActiveNavClassSetter = ({ isActive }) =>
    classNames(styles.navBar__btn, isActive && styles.navBar__btn_active);

  const closeMenu = () => {
    setIsOpened(false);
  };

  const handleOverlayClick: PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };

  const handleEscClosing = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  }, []);

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('keydown', handleEscClosing);
    } else {
      document.removeEventListener('keydown', handleEscClosing);
    }
  }, [isOpened, handleEscClosing]);

  return (
    <div className="navBar">
      <BurgerButton
        extraClass={styles.navBar__burgerBtn}
        aria-label="Открыть меню"
        onClick={() => setIsOpened(true)}
      />

      <div
        className={classNames(
          styles.navBar__menuWrapper,
          isOpened && styles.navBar__menuWrapper_opened
        )}
        onPointerDown={handleOverlayClick}
      >
        <div
          className={classNames(
            styles.navBar__menuBox,
            isOpened && styles.navBar__menuBox_opened
          )}
        >
          <BtnClose
            type="button"
            onClick={() => setIsOpened(false)}
            aria-label="Закрыть меню"
            extraClass={styles.navBar__btnClose}
          />

          <ul className={styles.navBar__linkBox}>
            <li>
              <NavLink className={setLinkClass} to="/" onClick={closeMenu}>
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                className={setLinkClass}
                to="/movies"
                onClick={closeMenu}
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                className={setLinkClass}
                to="/saved-movies"
                onClick={closeMenu}
              >
                Сохраненные&nbsp;фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                className={setBtnClass}
                to="/profile"
                onClick={closeMenu}
              >
                Аккаунт
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
