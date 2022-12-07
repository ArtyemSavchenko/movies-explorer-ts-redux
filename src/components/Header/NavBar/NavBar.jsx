import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import BurgerButton from '../BurgerButton/BurgerButton';
import BtnClose from '../../ui/BtnClose/BtnClose';

import './NavBar.css';

const NavBar = () => {
  const [isOpened, setIsOpened] = useState(false);

  const setLinkClass = ({ isActive }) => {
    let className = 'nav-bar__link';
    if (isActive) {
      className += ' nav-bar__link_active';
    }
    return className;
  };

  const setBtnClass = ({ isActive }) =>
    isActive ? 'nav-bar__btn nav-bar__btn_active' : 'nav-bar__btn';

  const closeMenu = () => {
    setIsOpened(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };

  const handleEscClosing = useCallback((e) => {
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
    <div className="nav-bar">
      <BurgerButton
        extraClass="nav-bar__burger-btn"
        aria-label="Открыть меню"
        onClick={() => setIsOpened(true)}
      />

      <div
        className={`nav-bar__menu-wrapper${
          isOpened ? ' nav-bar__menu-wrapper_opened' : ''
        }`}
        onPointerDown={handleOverlayClick}
      >
        <div
          className={`nav-bar__menu-box${
            isOpened ? ' nav-bar__menu-box_opened' : ''
          }`}
        >
          <BtnClose
            type="button"
            onClick={() => setIsOpened(false)}
            aria-label="Закрыть меню"
            extraClass="nav-bar__btn-close"
          />

          <ul className="nav-bar__link-box">
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
