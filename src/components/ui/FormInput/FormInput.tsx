import { FC, useId } from 'react';
import classNames from 'classnames';

import { UIInput } from '../../../types/ui';

import styles from './FormInput.module.css';

interface FormInputProps extends UIInput {
  placeholder: string;
  error?: string;
  extraClass?: string;
}

const FormInput: FC<FormInputProps> = ({
  placeholder,
  error,
  extraClass,
  ...restProps
}) => {
  const id = useId();

  return (
    <div className={classNames(styles.inputField, extraClass)}>
      <input
        className={classNames(styles.inputField__input, {
          [styles.inputField__input_error]: Boolean(error),
        })}
        {...restProps}
        placeholder=" "
        id={id}
      />
      <label htmlFor={id} className={styles.inputField__label}>
        {placeholder}
      </label>
      <p className={styles.inputField__error}>{error}</p>
    </div>
  );
};

export default FormInput;
