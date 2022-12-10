import { ChangeEventHandler, FC, useEffect, useState } from 'react';

import { usePushNotification } from './components/shared/Notifications/NotificationsProvider';
import { NOTIFICATION_TYPE } from './components/shared/Notifications/types/notification';
import './App.css';

import FormInput from './components/ui/FormInput/FormInput';
import LikeBtn from './components/ui/LikeBtn/LikeBtn';
import Logo from './components/ui/Logo/Logo';
import LogoLink from './components/ui/LogoLink/LogoLink';
import ModernCheckbox from './components/ui/ModernCheckbox/ModernCheckbox';
import Preloader from './components/ui/Preloader/Preloader';
import ProfileInput from './components/ui/ProfileInput/ProfileInput';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import CustomLink from './components/ui/CustomLink/CustomLink';
import { ICard } from './types/movie';
import MoviesCardList from './components/MoviesCardList/MoviesCardList';
import { getLikedMovies } from './utils/MainApi';
import SearchMovieForm from './components/SearchMovieForm/SearchMovieForm';

const App: FC = () => {
  const pushNotification = usePushNotification();
  const [isChecked, setIsChecked] = useState(false);

  const addNotification = () => {
    pushNotification(
      {
        type: NOTIFICATION_TYPE.success,
        heading: 'hello',
      },
      1000
    );
  };

  const [cards, setCards] = useState<ICard[]>([]);
  useEffect(() => {
    const fn = async () => {
      const cards = await getLikedMovies();
      setCards(cards);
    };
    fn();
  }, []);

  const [string, setString] = useState('');
  const [bool, setBool] = useState(false);

  return (
    <div>
      <SearchMovieForm
        isShortMovies={bool}
        onSubmit={() => console.log('submit')}
        searchString={string}
        setIsShortMovies={setBool}
        setSearchString={setString}
      />
      <MoviesCardList cards={cards} cbBtnClick={() => console.log('hit')} />
    </div>
  );
};

export default App;
