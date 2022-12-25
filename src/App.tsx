import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Main from './components/Main/Main';
import Preloader from './components/ui/Preloader/Preloader';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { getUserDataThunk } from './store/main/thunks';
import { usePushNotification } from './components/shared/Notifications/NotificationsProvider';
import { resetMainState } from './store/main/main';

import styles from './App.module.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const { errorCode } = useAppSelector(({ main }) => main);

  const dispatch = useAppDispatch();
  const pushNotification = usePushNotification();

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);

      const token = localStorage.getItem('jwt');
      if (!token) {
        localStorage.clear();
        setIsLoading(false);

        return;
      }

      try {
        await dispatch(getUserDataThunk()).unwrap();
      } catch (err: any) {
        pushNotification({
          type: 'error',
          heading: err.message,
        });

        localStorage.clear();

        return;
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    if (errorCode === '401') {
      dispatch(resetMainState());
      localStorage.clear();
    }
  }, [errorCode]);

  return isLoading ? (
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
