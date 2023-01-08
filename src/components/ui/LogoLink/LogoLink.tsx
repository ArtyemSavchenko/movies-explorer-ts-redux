import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import Logo from '../Logo/Logo';

import { IActiveNavClassSetter } from '../../../types/ActiveNavClassSetter';

import styles from './LogoLink.module.css';

interface LogoLinkProps {
  extraClass?: string;
  funny?: boolean;
}

const LogoLink: FC<LogoLinkProps> = ({ extraClass, funny }) => {
  const setLogoClass: IActiveNavClassSetter = ({ isActive }) =>
    classNames(extraClass, isActive && styles.logoLink_currentPage);

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

export default memo(LogoLink);
