import { PointerEventHandler, useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import BurgerButton from '../BurgerButton/BurgerButton';
import BtnClose from '../../ui/BtnClose/BtnClose';

import styles from './NavBar.module.css';

type IActiveNavClassSetter = ({isActive}: { isActive: boolean }) => string;

const NavBar = () => {
  const [isOpened, setIsOpened] = useState(false);

  const setLinkClass: IActiveNavClassSetter = ({ isActive }) =>
    classNames(styles.navBar__link, {
      [styles.navBar__link_active]: isActive,
    });

  const setBtnClass: IActiveNavClassSetter = ({ isActive }) =>
    classNames(styles.navBar__btn, {
      [styles.navBar__btn_active]: isActive,
    });

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
        className={classNames(styles.navBar__menuWrapper, {
          [styles.navBar__menuWrapper_opened]: isOpened,
        })}
        onPointerDown={handleOverlayClick}
      >
        <div
          className={classNames(styles.navBar__menuBox, {
            [styles.navBar__menuBox_opened]: isOpened,
          })}
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
