import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from '../../ui/FormInput/FormInput';
import LogoLink from '../../ui/LogoLink/LogoLink';
import FormBtn from '../../ui/FormBtn/FormBtn';
import CustomLink from '../../ui/CustomLink/CustomLink';

import { CurrentUser } from '../../../contexts/CurrentUserContext';

import { usePushNotification } from '../../shared/Notifications/NotificationsProvider';
import { authorize, getLikedMovies, getUser } from '../../../utils/MainApi';

import { useValidationInput } from '../../../hook/useValidationInput';

import styles from './Login.module.css';

const Login = () => {
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
    if (emailIsValid && passwordIsValid) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [emailIsValid, passwordIsValid]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, setLikedCards } = useContext(CurrentUser);
  const navigate = useNavigate();
  const pushNotification = usePushNotification();

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const { token } = await authorize(email, password);
      localStorage.setItem('jwt', token);

      const user = await getUser();
      signIn(user, () => {
        navigate('/movies');
      });

      const likedMovies = await getLikedMovies();
      setLikedCards(likedMovies);
    } catch (err: any) {
      pushNotification({
        type: 'error',
        text: err.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.login}>
      <LogoLink extraClass={styles.login__logoLink} funny />
      <p className={styles.login__title}>Рады видеть!</p>
      <form className={styles.login__form} onSubmit={handleLogin}>
        <fieldset className={styles.login__fieldset} disabled={isSubmitting}>
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
          isLoading={isSubmitting}
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
