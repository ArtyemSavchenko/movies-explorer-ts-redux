import { FC } from 'react';
import classNames from 'classnames';

import { UIInput } from '../../../types/ui';

import styles from './ModernCheckbox.module.css';

interface ModernCheckboxProps extends UIInput {
  label: string;
  extraClass?: string;
}

const ModernCheckbox: FC<ModernCheckboxProps> = ({
  label,
  extraClass,
  ...restProps
}) => {
  return (
    <label className={classNames(styles.checkbox, extraClass)}>
      <input
        type="checkbox"
        className={styles.checkbox__switcher}
        {...restProps}
      />
      {label}
    </label>
  );
};

export default ModernCheckbox;
