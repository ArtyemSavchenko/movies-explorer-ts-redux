import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import FormInput from '../../ui/FormInput/FormInput';
import LogoLink from '../../ui/LogoLink/LogoLink';
import FormBtn from '../../ui/FormBtn/FormBtn';
import CustomLink from '../../ui/CustomLink/CustomLink';

import { usePushNotification } from '../../shared/Notifications/NotificationsProvider';
import { useValidationInput } from '../../../hooks/useValidationInput';
import { authorizeThunk } from '../../../store/main/thunks';

import styles from './Login.module.css';

const Login = () => {
  const loadingStatus = useAppSelector(({ main }) => main.loadingStatus);

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

  const dispatch = useAppDispatch();
  const pushNotification = usePushNotification();

  useEffect(() => {
    if (emailIsValid && passwordIsValid) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [emailIsValid, passwordIsValid]);

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await dispatch(authorizeThunk({ email, password })).unwrap();
    } catch (err: any) {
      pushNotification({
        type: 'error',
        text: err.message,
      });
    }
  };

  return (
    <section className={styles.login}>
      <LogoLink extraClass={styles.login__logoLink} funny />
      <p className={styles.login__title}>Рады видеть!</p>
      <form className={styles.login__form} onSubmit={handleLogin}>
        <fieldset
          className={styles.login__fieldset}
          disabled={loadingStatus === 'submitting'}
        >
          <FormInput
            extraClass={styles.login__input}
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            value={email}
            onChange={onChangeEmail}
            error={emailErr}
            required
          />
          <FormInput
            extraClass={styles.login__input}
            type="password"
            placeholder="Пароль"
            autoComplete="password"
            value={password}
            onChange={onChangePassword}
            error={passwordErr}
            required
          />
        </fieldset>
        <FormBtn
          extraClass={styles.login__submitBtn}
          disabled={!isValidForm}
          isLoading={loadingStatus === 'submitting'}
        >
          Войти
        </FormBtn>
        <p className={styles.login__caption}>
          Ещё не зарегистрированы?{' '}
          <CustomLink
            feature="internal-link"
            appearance="accent"
            extraClass={styles.login__captionLink}
            to="/signup"
          >
            Регистрация
          </CustomLink>
        </p>
      </form>
    </section>
  );
};

export default Login;
