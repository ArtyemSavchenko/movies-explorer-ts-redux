import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import LogoLink from '../../ui/LogoLink/LogoLink';
import FormInput from '../../ui/FormInput/FormInput';
import FormBtn from '../../ui/FormBtn/FormBtn';
import CustomLink from '../../ui/CustomLink/CustomLink';

import { usePushNotification } from '../../shared/Notifications/NotificationsProvider';
import { useValidationInput } from '../../../hooks/useValidationInput';

import { useAppDispatch } from '../../../store/hooks';
import { registerThunk } from '../../../store/main/thunks';

import styles from './Register.module.css';

const Register = () => {
  const dispatch = useAppDispatch();

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

  const pushNotification = usePushNotification();

  const handleRegister: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await dispatch(registerThunk({ name, email, password })).unwrap();
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
    <section className={styles.register}>
      <LogoLink extraClass={styles.register__logoLink} funny />
      <p className={styles.register__title}>Добро пожаловать!</p>
      <form
        className={styles.register__form}
        onSubmit={handleRegister}
        noValidate
      >
        <fieldset className={styles.register__fieldset} disabled={isSubmitting}>
          <FormInput
            extraClass={styles.register__input}
            type="text"
            placeholder="Имя"
            autoComplete="name"
            value={name}
            onChange={onChangeName}
            error={nameErr}
            required
            minLength={2}
            maxLength={30}
          />
          <FormInput
            extraClass={styles.register__input}
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            value={email}
            onChange={onChangeEmail}
            error={emailErr}
            required
          />
          <FormInput
            extraClass={styles.register__input}
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
          extraClass={styles.register__submitBtn}
          isLoading={isSubmitting}
          disabled={!isValidForm}
        >
          Зарегистрироваться
        </FormBtn>
        <p className={styles.register__caption}>
          Уже зарегистрированы?{' '}
          <CustomLink
            feature="internal-link"
            appearance="accent"
            extraClass={styles.register__captionLink}
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
