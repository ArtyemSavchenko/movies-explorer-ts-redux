import { useCallback, useContext, useEffect, useState } from 'react';

import Preloader from '../../ui/Preloader/Preloader';
import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import SearchMovieForm from '../../SearchMovieForm/SearchMovieForm';
import EmptySearch from '../../EmptySearch/EmptySearch';

import {
  filterByDuration,
  filterBySearchString,
  getNewPage,
} from '../../../utils/searchUtils';
import { usePushNotification } from '../../shared/Notifications/NotificationsProvider';
import { IMovie } from '../../../types/movie';

import { getMovies } from '../../../utils/MoviesApi';
import { dislikeMovie, likeMovie } from '../../../utils/MainApi';

import { CurrentUser } from '../../../contexts/CurrentUserContext';

import styles from './Movies.module.css';
import classNames from 'classnames';
import { IUserProvider } from '../../../types/userProvider';

const Movies = () => {
  const [cards, setCards] = useState<IMovie[]>([]);
  const [foundMovies, setFoundMovies] = useState<IMovie[] | null>(null);
  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);

  const [isMoreResultBtnVisible, setIsMoreResultBtnVisible] = useState(false);

  const [searchString, setSearchString] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);

  const [isEmptySearch, setIsEmptySearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { likedCards, setLikedCards, user } =
    useContext<IUserProvider>(CurrentUser);

  const pushNotification = usePushNotification();

  const injectLikes = (cards: IMovie[]): IMovie[] => {
    return cards.map(
      (card) =>
        likedCards.find((likedMovie) => card.movieId === likedMovie.movieId) ||
        card
    );
  };

  const renderStartCards = () => {
    if (filteredMovies?.length === 0) {
      setCards([]);
      setIsEmptySearch(true);
      setIsMoreResultBtnVisible(false);
      return;
    }

    setIsEmptySearch(false);
    const { newCards, isAllCards } = getNewPage([], filteredMovies);
    setCards(injectLikes(newCards));
    setIsMoreResultBtnVisible(!isAllCards);
  };

  const addCardsPage = () => {
    const { newCards, isAllCards } = getNewPage(cards, filteredMovies);

    setCards((cards) => [...cards, ...injectLikes(newCards)]);
    setIsMoreResultBtnVisible(!isAllCards);
  };

  useEffect(() => {
    if (!foundMovies) {
      setIsEmptySearch(true);
      return;
    }
    setFilteredMovies(filterByDuration(foundMovies, isShortMovies));

    localStorage.setItem(
      'last-result',
      JSON.stringify({
        searchString,
        isShortMovies,
        foundMovies,
      })
    );
  }, [foundMovies, isShortMovies]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      return;
    }

    renderStartCards();
  }, [filteredMovies]);

  const likeCard = async (card: IMovie) => {
    try {
      const movie = await likeMovie(card);
      setLikedCards([movie, ...likedCards]);

      setCards(
        cards.map((card) => {
          if (user && movie.movieId === card.movieId) {
            card.owner = user._id;
            card._id = movie._id;
          }
          return card;
        })
      );
    } catch (err: any) {
      pushNotification({
        type: 'error',
        text: err.message,
      });
    }
  };
  const dislikeCard = async (card: IMovie) => {
    try {
      if (!card._id) {
        return console.error('Не передан card id');
      }
      await dislikeMovie(card._id);

      setLikedCards(
        likedCards.filter((likedCard) => likedCard._id !== card._id)
      );

      setCards(
        cards.map((oldCard) => {
          if (oldCard._id === card._id) {
            delete oldCard.owner;
          }
          return oldCard;
        })
      );
    } catch (err: any) {
      pushNotification({
        type: 'error',
        text: err.message,
      });
    }
  };
  const handleLikeOrDislikeCard = useCallback(async (card: IMovie) => {
    user && card.owner !== user._id
      ? await likeCard(card)
      : await dislikeCard(card);
  }, [cards]);

  const handleSearch = async () => {
    setIsLoading(true);
    setIsEmptySearch(false);
    setFoundMovies(null);
    setFilteredMovies([]);
    setCards([]);
    setIsMoreResultBtnVisible(false);

    try {
      const beatMovies = await getMovies();

      setFoundMovies(filterBySearchString(beatMovies, searchString));
    } catch (err) {
      pushNotification({
        type: 'error',
        text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const lastResultString = localStorage.getItem('last-result');
    if (!lastResultString) {
      return;
    }

    const { searchString, isShortMovies, foundMovies } =
      JSON.parse(lastResultString);

    setSearchString(searchString);
    setIsShortMovies(isShortMovies);
    setFoundMovies(foundMovies);
  }, []);

  return (
    <section className={styles.movies}>
      <SearchMovieForm
        extraClass={styles.movies__searchForm}
        onSubmit={handleSearch}
        searchString={searchString}
        setSearchString={setSearchString}
        isShortMovies={isShortMovies}
        setIsShortMovies={setIsShortMovies}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList cards={cards} cbBtnClick={handleLikeOrDislikeCard} />
      )}
      {isEmptySearch && !isLoading ? (
        <EmptySearch heading="╮（╯＿╰）╭" text="Ничего не нашлось" />
      ) : null}
      <button
        className={classNames(
          styles.movies__moreBtn,
          isMoreResultBtnVisible && styles.movies__moreBtn_visible
        )}
        type="button"
        onClick={addCardsPage}
      >
        Ещё
      </button>
    </section>
  );
};

export default Movies;
