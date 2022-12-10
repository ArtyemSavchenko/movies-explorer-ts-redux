import { FC } from 'react';
import classNames from 'classnames';

import { UIButton } from '../../../types/ui';

import styles from './BurgerButton.module.css';

interface BurgerButtonProps extends UIButton {
  extraClass?: string;
}

const BurgerButton: FC<BurgerButtonProps> = ({ extraClass, ...restProps }) => {
  return (
    <button
      className={classNames(styles.burgerBtn, extraClass)}
      type="button"
      {...restProps}
    >
      <svg
        className={styles.burgerBtn__svg}
        viewBox="0 0 28 23"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M28 3H0V0h28v3ZM28 13H0v-3h28v3ZM28 23H0v-3h28v3Z" />
      </svg>
    </button>
  );
};

export default BurgerButton;
