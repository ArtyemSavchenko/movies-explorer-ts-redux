import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';

import { EMAIL_REG_EXP, NAME_REG_EXP } from '../utils/constants';

interface IValidationParams {
  required?: boolean;
  isName?: boolean;
  isEmail?: boolean;
  minLength?: number;
  maxLength?: number;
}

type IValidationErrors = {
  [key in keyof IValidationParams]: string;
};

type IValidationType = keyof IValidationParams;

type ICheckValidationErr = (
  value: string,
  params: IValidationParams,
  errors?: IValidationErrors
) => string;

const checkValidationErr: ICheckValidationErr = (value, params, errors) => {
  for (const key in params) {
    switch (key as IValidationType) {
      case 'required':
        if (value === '') {
          return errors?.required || 'Пропущено обязательное поле';
        }
        break;

      case 'isName':
        if (!value.match(NAME_REG_EXP)) {
          return (
            errors?.isName ||
            'Имя может содержать только латиницу, кириллицу, пробел и дефис'
          );
        }
        break;

      case 'isEmail':
        if (!value.match(EMAIL_REG_EXP)) {
          return errors?.isEmail || 'Введенный адрес некорректен';
        }
        break;

      case 'minLength':
        if (params.minLength && value.length < params.minLength) {
          return (
            errors?.minLength ||
            `Минимальная длина не может быть меньше ${params.minLength}`
          );
        }
        break;

      case 'maxLength':
        if (params.maxLength && value.length > params.maxLength) {
          return (
            errors?.maxLength ||
            `Максимальная длина не может быть больше ${params.maxLength}`
          );
        }
        break;

      default:
        return '';
    }
  }

  return '';
};

type IValidationHook = (
  initialState: string,
  params: IValidationParams,
  errors?: IValidationErrors
) => [
  state: string,
  error: string,
  isValid: boolean,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
];

export const useValidationInput: IValidationHook = (
  initialState,
  params,
  errors
) => {
  const [value, setValue] = useState(initialState);
  const [err, setErr] = useState('');
  const [isValid, setIsValid] = useState(!checkValidationErr(value, params));

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setErr('');

    const inputValue = e.target.value;
    setValue(inputValue);

    const err = checkValidationErr(inputValue, params, errors);

    setIsValid(!err);
    setErr(err);
  }, [params, errors]);

  return [value, err, isValid, onChange];
};
