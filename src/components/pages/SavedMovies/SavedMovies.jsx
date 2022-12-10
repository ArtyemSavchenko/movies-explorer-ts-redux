import { useContext, useEffect, useState } from 'react';

import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import SearchMovieForm from '../../SearchMovieForm/SearchMovieForm';
import Empty from '../../EmptySearch/EmptySearch';

import { usePushNotification } from '../../../components/shared/Notifications/Notifications';
import { CurrentUser } from '../../../contexts/CurrentUserContext';

import {
  filterByDuration,
  filterBySearchString,
} from '../../../utils/searchUtils';
import { dislikeMovie } from '../../../utils/MainApi';

import './SavedMovies.css';

const SavedMovies = () => {
  const { likedCards, setLikedCards } = useContext(CurrentUser);

  const [cards, setCards] = useState(likedCards);
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

  const handleDeleteCard = async (card) => {
    try {
      await dislikeMovie(card._id);
      setLikedCards(
        likedCards.filter((likedCard) => likedCard._id !== card._id)
      );
    } catch (err) {
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
    <section className="saved-movies">
      <SearchMovieForm
        extraClass="saved-movies__search-form"
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
