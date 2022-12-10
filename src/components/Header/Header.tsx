import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import SignMenu from './SignMenu/SignMenu';
import NavBar from './NavBar/NavBar';
import LogoLink from '../ui/LogoLink/LogoLink';

import { CurrentUser } from '../../contexts/CurrentUserContext';

import styles from './Header.module.css';

const Header = () => {
  // const { user } = useContext(CurrentUser);
  const location = useLocation();

  if (location.pathname === '/signin' || location.pathname === '/signup') {
    return null;
  }

  return (
    <header
      className={classNames(styles.header, {
        [styles.header_landing]: location.pathname === '/',
      })}
    >
      <LogoLink funny />
      {true ? <NavBar /> : <SignMenu />}
    </header>
  );
};

export default Header;
