import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector } from '../../store/hooks';

import SignMenu from './SignMenu/SignMenu';
import NavBar from './NavBar/NavBar';
import LogoLink from '../ui/LogoLink/LogoLink';

import styles from './Header.module.css';

const pathsWithoutHeader = ['/signin', '/signup'];

const Header = () => {
  const location = useLocation();
  const user = useAppSelector(({ main }) => main.user);

  if (pathsWithoutHeader.includes(location.pathname)) {
    return null;
  }

  return (
    <header
      className={classNames(
        styles.header,
        location.pathname === '/' && styles.header_landing
      )}
    >
      <LogoLink funny />
      {user !== null ? <NavBar /> : <SignMenu />}
    </header>
  );
};

export default Header;
