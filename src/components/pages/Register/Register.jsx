import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoLink from '../../ui/LogoLink/LogoLink';
import FormInput from '../../ui/FormInput/FormInput';
import FormBtn from '../../ui/FormBtn/FormBtn';
import CustomLink from '../../ui/CustomLink/CustomLink';

import { usePushNotification } from '../../shared/Notifications/Notifications';
import { useValidationInput } from '../../../hook/useValidationInput';
import { authorize, register } from '../../../utils/MainApi';

import { CurrentUser } from '../../../contexts/CurrentUserContext';

import './Register.css';

const Register = () => {
  const [name, nameErr, nameIsValid, onChangeName] = useValidationInput('', {
    required: true,
    isName: true,
    minLength: 2,
    maxLength: 30,
  });
  const [email, emailErr, emailIsValid, onChangeEmail] = useValidationInput(
    '',
    {
      required: true,
      isEmail: true,
    }
  );
  const [password, passwordErr, passwordIsValid, onChangePassword] =
    useValidationInput('', {
      required: true,
    });

  const [isValidForm, setIsValidForm] = useState(true);
  useEffect(() => {
    if (nameIsValid && emailIsValid && passwordIsValid) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [nameIsValid, emailIsValid, passwordIsValid]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn } = useContext(CurrentUser);

  const navigate = useNavigate();
  const pushNotification = usePushNotification();

  const handleRegister = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const user = await register(email, password, name);

      if (user) {
        const { token } = await authorize(email, password);
        localStorage.setItem('jwt', token);

        signIn(user, () => {
          navigate('/movies');
        });
      }
    } catch (err) {
      pushNotification({
        type: 'error',
        text: err.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="register">
      <LogoLink extraClass="register__logo-link" funny />
      <p className="register__title">Добро пожаловать!</p>
      <form className="register__form" onSubmit={handleRegister} noValidate>
        <fieldset className="register__fieldset" disabled={isSubmitting}>
          <FormInput
            extraClass="register__input"
            type="text"
            placeholder="Имя"
            autoComplete="name"
            value={name}
            onChange={onChangeName}
            error={nameErr}
            required
            minLength="2"
            maxLength="30"
          />
          <FormInput
            extraClass="register__input"
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            value={email}
            onChange={onChangeEmail}
            error={emailErr}
            required
          />
          <FormInput
            extraClass="register__input"
            type="password"
            placeholder="Пароль"
            autoComplete="new-password"
            value={password}
            onChange={onChangePassword}
            error={passwordErr}
            required
          />
        </fieldset>
        <FormBtn
          extraClass="register__submit-btn"
          isLoading={isSubmitting}
          disabled={!isValidForm}
        >
          Зарегистрироваться
        </FormBtn>
        <p className="register__caption">
          Уже зарегистрированы?{' '}
          <CustomLink
            feature="internal-link"
            appearance="accent"
            extraClass="register__caption-link"
            to="/signin"
          >
            Войти
          </CustomLink>
        </p>
      </form>
    </section>
  );
};

export default Register;
