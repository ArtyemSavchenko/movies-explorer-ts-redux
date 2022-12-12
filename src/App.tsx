import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Main from './components/Main/Main';
import Preloader from './components/ui/Preloader/Preloader';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import { usePushNotification } from './components/shared/Notifications/NotificationsProvider';
import { CurrentUser } from './contexts/CurrentUserContext';
import { ICurrentUser } from './types/user';
import { IMovie } from './types/movie';

import { getLikedMovies, getUser } from './utils/MainApi';

import styles from './App.module.css';
import { ISignIn, ISignOut } from './types/userProvider';

const App = () => {
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const pushNotification = usePushNotification();

  const [user, setUser] = useState<ICurrentUser | null>(null);
  const [likedCards, setLikedCards] = useState<IMovie[]>([]);

  const signIn: ISignIn = async (user, callback) => {
    setUser(user);

    if (callback) {
      callback();
    }
  };

  const signOut: ISignOut = (callback) => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('last-result');
    setUser(null);
    setLikedCards([]);

    if (callback) {
      callback();
    }
  };

  const providerValue = { user, signIn, signOut, likedCards, setLikedCards };

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        localStorage.removeItem('last-result');
        setIsCheckingToken(false);
        return;
      }

      try {
        const user = await getUser();
        signIn(user);
      } catch (err: any) {
        pushNotification({
          type: 'error',
          heading: 'Не удалось авторизоваться',
          text: 'Токен недействителен',
        });

        localStorage.removeItem('last-result');
        localStorage.removeItem('jwt');

        setIsCheckingToken(false);
        return;
      }

      try {
        const likedMovies = await getLikedMovies();
        setLikedCards(likedMovies);
      } catch (err: any) {
        pushNotification({
          type: 'error',
          text: err.message,
        });
      } finally {
        setIsCheckingToken(false);
      }
    };

    checkToken();
  }, []);

  return isCheckingToken ? (
    <Preloader />
  ) : (
    <Suspense fallback={<Preloader />}>
      <CurrentUser.Provider value={providerValue}>
        <div className={styles.app}>
          <Header />
          <Main>
            <Outlet />
          </Main>
          <Footer />
        </div>
      </CurrentUser.Provider>
    </Suspense>
  );
};

export default App;
