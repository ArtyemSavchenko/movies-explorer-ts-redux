import { FC } from 'react';

import { UIAnchor } from '../../../../types/ui';

import styles from './PortfolioLink.module.css';

const PortfolioLink: FC<UIAnchor> = ({ children, ...restProps }) => {
  return (
    <a className={styles.portfolioLink} {...restProps}>
      {children}
      <svg
        className={styles.portfolioLink__arrow}
        viewBox="0 0 11 11"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m1.564 10.714-.997-.997L7.982 2.29H2.254L2.267.91h8.092v8.104H8.966l.013-5.727-7.415 7.427Z" />
      </svg>
    </a>
  );
};

export default PortfolioLink;
