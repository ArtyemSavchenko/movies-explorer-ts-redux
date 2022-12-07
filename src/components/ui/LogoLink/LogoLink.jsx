import { NavLink } from 'react-router-dom';

import Logo from '../Logo/Logo';

import './LogoLink.css';

const LogoLink = ({ extraClass = '', funny = false }) => {
  const setLogoClass = ({ isActive }) => {
    let className = '';
    if (isActive) {
      className += ' logo-link_current-page';
    }
    if (extraClass) {
      className += ' ' + extraClass;
    }
    return className;
  };

  return (
    <NavLink
      className={setLogoClass}
      to="/"
      aria-label="Ссылка на главную страницу."
    >
      <Logo funny={funny} />
    </NavLink>
  );
};

export default LogoLink;
