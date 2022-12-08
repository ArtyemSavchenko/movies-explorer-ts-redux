import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import { UIButton } from '../../../types/ui';

import styles from './FormBtn.module.css';

interface FormBtnProps extends UIButton {
  extraClass?: string;
  isLoading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

const FormBtn: FC<FormBtnProps> = ({
  children,
  extraClass,
  isLoading,
  disabled,
  ...restProps
}) => {
  return (
    <button
      type="submit"
      className={classNames(styles.formBtn, extraClass)}
      disabled={disabled || isLoading}
      {...restProps}
    >
      {isLoading ? (
        <div className={styles.formBtn__spinner}>
          <div className={styles.formBtn__spinnerEl}></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default FormBtn;
