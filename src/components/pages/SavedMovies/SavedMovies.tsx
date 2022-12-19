import { useCallback, useContext, useEffect, useState } from 'react';

import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import SearchMovieForm from '../../SearchMovieForm/SearchMovieForm';
import EmptySearch from '../../EmptySearch/EmptySearch';

import { usePushNotification } from '../../shared/Notifications/NotificationsProvider';
import { CurrentUser } from '../../../contexts/CurrentUserContext';
import { IMovie } from '../../../types/movie';
import { IUserProvider } from '../../../types/userProvider';

import {
  filterByDuration,
  filterBySearchString,
} from '../../../utils/searchUtils';
import { dislikeMovie } from '../../../utils/MainApi';

import styles from './SavedMovies.module.css';
import { useAppSelector } from '../../../store/hooks';

const SavedMovies = () => {
  const { likedMovies } = useAppSelector(({ main }) => main);
  const [cards, setCards] = useState<IMovie[]>(likedMovies);
  const [searchString, setSearchString] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  const pushNotification = usePushNotification();

  const handleSearch = () => {};

  useEffect(() => {
    setCards(likedMovies);
  }, [likedMovies]);

  return (
    <section className={styles.savedMovies}>
      <SearchMovieForm
        extraClass={styles.savedMovies__searchForm}
        onSubmit={handleSearch}
        searchString={searchString}
        setSearchString={setSearchString}
        isShortMovies={isShortMovies}
        setIsShortMovies={setIsShortMovies}
      />

      {likedMovies.length === 0 ? (
        <EmptySearch
          heading="(┬┬﹏┬┬)"
          text="Вы не добавили ни одного фильма"
        />
      ) : cards.length === 0 ? (
        <EmptySearch heading="(┬┬﹏┬┬)" text="Ничего не найдено" />
      ) : (
        <MoviesCardList cards={cards} />
      )}
    </section>
  );
};
export default SavedMovies;
