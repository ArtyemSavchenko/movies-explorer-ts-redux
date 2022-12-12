import { useContext, useEffect, useState } from 'react';

import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import SearchMovieForm from '../../SearchMovieForm/SearchMovieForm';
import Empty from '../../EmptySearch/EmptySearch';

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

const SavedMovies = () => {
  const { likedCards, setLikedCards } = useContext<IUserProvider>(CurrentUser);

  const [cards, setCards] = useState<IMovie[]>(likedCards);
  const [searchString, setSearchString] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  const pushNotification = usePushNotification();

  const handleSearch = () => {
    setCards(
      filterBySearchString(
        filterByDuration(likedCards, isShortMovies),
        searchString
      )
    );
    setIsFirstSearch(false);
  };

  const handleDeleteCard = async (card: IMovie) => {
    try {
      if (!card._id) {
        return console.error('Не передан card id');
      }

      await dislikeMovie(card._id);
      setLikedCards(
        likedCards.filter((likedCard) => likedCard._id !== card._id)
      );
    } catch (err: any) {
      pushNotification({
        type: 'error',
        text: err.message,
      });
    }
  };

  useEffect(() => {
    if (isFirstSearch) {
      setCards(likedCards);
    } else {
      setCards(
        filterBySearchString(
          filterByDuration(likedCards, isShortMovies),
          searchString
        )
      );
    }
  }, [isShortMovies, likedCards]);

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

      {likedCards.length === 0 ? (
        <Empty heading="(┬┬﹏┬┬)" text="Вы не добавили ни одного фильма" />
      ) : cards.length === 0 ? (
        <Empty heading="(┬┬﹏┬┬)" text="Ничего не найдено" />
      ) : (
        <MoviesCardList cards={cards} cbBtnClick={handleDeleteCard} />
      )}
    </section>
  );
};
export default SavedMovies;
