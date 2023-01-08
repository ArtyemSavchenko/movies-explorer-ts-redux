import { PointerEventHandler, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import CustomLink from '../../ui/CustomLink/CustomLink';
import ProfileInput from '../../ui/ProfileInput/ProfileInput';

import { useValidationInput } from '../../../hooks/useValidationInput';
import { usePushNotification } from '../../shared/Notifications/NotificationsProvider';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { patchUserThunk } from '../../../store/main/thunks';
import { resetMainState } from '../../../store/main/main';

import styles from './Profile.module.css';

const Profile = () => {
  const { user } = useAppSelector(({ main }) => main);
  const dispatch = useAppDispatch();

  const [name, nameErr, isValidName, onChangeName] = useValidationInput(
    user?.name,
    {
      required: true,
      isName: true,
      minLength: 2,
      maxLength: 30,
    }
  );
  const [email, emailErr, isValidEmail, onChangeEmail] = useValidationInput(
    user?.email,
    {
      required: true,
      isEmail: true,
    }
  );

  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isValidForm, setIsValidForm] = useState(true);
  const [isFirstEditing, setIsFirstEditing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isValidName && isValidEmail && isDataChanged) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [isValidName, isValidEmail, isDataChanged]);

  useEffect(() => {
    if (name !== user?.name || email !== user?.email) {
      setIsFirstEditing(false);
      setIsDataChanged(true);
    } else {
      setIsDataChanged(false);
    }
  }, [name, email, user]);

  const pushNotification = usePushNotification();

  const handleEditProfile: PointerEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await dispatch(patchUserThunk({ name, email })).unwrap();

      setIsFirstEditing(true);
      pushNotification({
        type: 'success',
        heading: '(〃￣︶￣)人(￣︶￣〃)',
        text: 'Данные успешно обновлены',
      });
    } catch (err: any) {
      pushNotification({
        type: 'error',
        text: err.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = useCallback(() => {
    dispatch(resetMainState());
    localStorage.clear();
  }, []);

  return (
    <section className={styles.profile}>
      <div className={styles.profile__content}>
        <p className={styles.profile__heading}>Привет, {user?.name}!</p>

        <form className={styles.profile__form}>
          <fieldset
            className={styles.profile__fieldset}
            disabled={isSubmitting}
          >
            <ProfileInput
              extraClass={styles.profile__input}
              label="Имя"
              type="text"
              value={name}
              onChange={onChangeName}
              error={nameErr}
            />
            <ProfileInput
              extraClass={styles.profile__input}
              label="E-mail"
              type="email"
              value={email}
              onChange={onChangeEmail}
              error={emailErr}
            />

            <p
              className={classNames(
                styles.profile__errText,
                !isDataChanged &&
                  !isFirstEditing &&
                  styles.profile__errText_visible
              )}
            >
              Новые данные совпадают со старыми
            </p>
          </fieldset>

          <CustomLink
            extraClass={styles.profile__submitBtn}
            feature="button"
            type="submit"
            disabled={!isValidForm}
            isLoading={isSubmitting}
            onClick={handleEditProfile}
          >
            Редактировать
          </CustomLink>
        </form>

        <CustomLink
          extraClass={styles.profile__signOutBtn}
          feature="button"
          appearance="attention"
          type="button"
          onClick={handleSignOut}
        >
          Выйти из&nbsp;аккаунта
        </CustomLink>
      </div>
    </section>
  );
};

export default Profile;
