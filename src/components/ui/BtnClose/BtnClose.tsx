import { FC } from 'react';
import classNames from 'classnames';

import { UIButton } from '../../../types/ui';

import styles from './BtnClose.module.css';

interface BtnCloseProps extends UIButton {
  extraClass?: string;
}

const BtnClose: FC<BtnCloseProps> = ({ extraClass, ...restProps }) => {
  return (
    <button className={classNames(styles.btnClose, extraClass)} {...restProps}>
      <svg
        className={styles.btnClose__svg}
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.16 2.282 2.283.161l15.556 15.556-2.12 2.122z" />
        <path d="m15.717.161 2.121 2.122L2.282 17.839.161 15.718z" />
      </svg>
    </button>
  );
};

export default BtnClose;
