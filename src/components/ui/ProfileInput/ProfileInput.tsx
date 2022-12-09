import { FC, useId } from 'react';
import classNames from 'classnames';

import { UIInput } from '../../../types/ui';

import styles from './ProfileInput.module.css';

interface ProfileInputProps extends UIInput {
  label: string;
  extraClass?: string;
  error?: string;
}

const ProfileInput: FC<ProfileInputProps> = ({
  label,
  extraClass,
  error = '',
  ...restProps
}) => {
  const id = useId();

  return (
    <div className={classNames(styles.profileInput, extraClass)}>
      <input className={styles.profileInput__input} {...restProps} id={id} />
      <label className={styles.profileInput__label} htmlFor={id}>
        {label}
      </label>
      <p className={styles.profileInput__err}>{error}</p>
    </div>
  );
};

export default ProfileInput;
