import { useId } from 'react';

import './FormInput.css';

const FormInput = ({
  placeholder,
  error = '',
  extraClass = '',
  ...restProps
}) => {
  const id = useId();

  return (
    <div className={`input-field ${extraClass}`}>
      <input
        className={`input-field__input${error && ' input-field__input_error'}`}
        {...restProps}
        id={id}
        placeholder=" "
      />
      <label htmlFor={id} className="input-field__label">
        {placeholder}
      </label>
      <p className="input-field__error">{error}</p>
    </div>
  );
};

export default FormInput;
