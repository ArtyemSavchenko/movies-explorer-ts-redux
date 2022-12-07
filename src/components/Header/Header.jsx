import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import SignMenu from './SignMenu/SignMenu';
import NavBar from './NavBar/NavBar';
import LogoLink from '../ui/LogoLink/LogoLink';

import { CurrentUser } from '../../contexts/CurrentUserContext';

import './Header.css';

const Header = () => {
  const { user } = useContext(CurrentUser);
  const location = useLocation();

  if (location.pathname === '/signin' || location.pathname === '/signup') {
    return null;
  }

  return (
    <header className={`header${location.pathname === '/' ? ' header_landing' : ''}`}>
      <LogoLink funny />
      {user ? <NavBar /> : <SignMenu />}
    </header>
  );
};

export default Header;
