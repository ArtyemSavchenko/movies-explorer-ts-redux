import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Main from './components/Main/Main';
import Preloader from './components/ui/Preloader/Preloader';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import { usePushNotification } from './components/shared/Notifications/NotificationsProvider';

import styles from './App.module.css';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setLoadingStatus } from './store/main/main';
import { getLikedMoviesThunk, getUserThunk } from './store/main/thunks';

const App = () => {
  const { loadingStatus } = useAppSelector(({ main }) => main);
  const dispatch = useAppDispatch();

  const pushNotification = usePushNotification();

  useEffect(() => {
    dispatch(setLoadingStatus('appLoading'));

    const checkToken = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        localStorage.clear();
        dispatch(setLoadingStatus(null));

        return;
      }

      try {
        await dispatch(getUserThunk()).unwrap();
      } catch (err) {
        pushNotification({
          type: 'error',
          heading: 'Не удалось авторизоваться',
          text: 'Токен недействителен',
        });

        localStorage.clear();

        dispatch(setLoadingStatus(null));
        return;
      }

      try {
        await dispatch(getLikedMoviesThunk()).unwrap();
      } catch (err: any) {
        pushNotification({
          type: 'error',
          text: err.message,
        });
      } finally {

        dispatch(setLoadingStatus(null));
      }
    };

    checkToken();
  }, []);

  return loadingStatus === 'appLoading' ? (
    <Preloader />
  ) : (
    <Suspense fallback={<Preloader />}>
      <div className={styles.app}>
        <Header />
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </div>
    </Suspense>
  );
};

export default App;
