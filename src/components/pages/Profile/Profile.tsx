import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomLink from '../../ui/CustomLink/CustomLink';
import ProfileInput from '../../ui/ProfileInput/ProfileInput';

import { useValidationInput } from '../../../hooks/useValidationInput';
import { usePushNotification } from '../../shared/Notifications/NotificationsProvider';

import { patchUser } from '../../../utils/MainApi';

import styles from './Profile.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { patchUserThunk } from '../../../store/main/thunks';

const Profile = () => {
  const { user } = useAppSelector(({ main }) => main);
  const dispatch = useAppDispatch();

  const [name, nameErr, nameIsValid, onChangeName] = useValidationInput(
    user?.name,
    {
      required: true,
      isName: true,
      minLength: 2,
      maxLength: 30,
    }
  );
  const [email, emailErr, emailIsValid, onChangeEmail] = useValidationInput(
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
    if (nameIsValid && emailIsValid && isDataChanged) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [nameIsValid, emailIsValid, isDataChanged]);

  useEffect(() => {
    if (name !== user?.name || email !== user?.email) {
      setIsFirstEditing(false);
      setIsDataChanged(true);
    } else {
      setIsDataChanged(false);
    }
  }, [name, email, user]);

  const navigate = useNavigate();
  const pushNotification = usePushNotification();

  const handleEditProfile: React.PointerEventHandler<
    HTMLButtonElement
  > = async (e) => {
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

  const handleSignOut = () => {
    // signOut(navigate('/'));
  };

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
              required
              minLength={2}
              maxLength={30}
              error={nameErr}
            />
            <ProfileInput
              extraClass={styles.profile__input}
              label="E-mail"
              type="email"
              value={email}
              onChange={onChangeEmail}
              required
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
