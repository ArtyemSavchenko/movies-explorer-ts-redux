import { useContext, useEffect, useState } from 'react';

import Preloader from '../../ui/Preloader/Preloader';
import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import SearchMovieForm from '../../SearchMovieForm/SearchMovieForm';
import Empty from '../../EmptySearch/EmptySearch';

import {
  filterByDuration,
  filterBySearchString,
  getNewPage,
} from '../../../utils/searchUtils';
import { usePushNotification } from '../../shared/Notifications/Notifications';
import { MOVIE_COVER_URL } from '../../../utils/constants';

import { getMovies } from '../../../utils/MoviesApi';
import { dislikeMovie, likeMovie } from '../../../utils/MainApi';

import { CurrentUser } from '../../../contexts/CurrentUserContext';

import './Movies.css';

const Movies = () => {
  const [cards, setCards] = useState([]);
  const [foundMovies, setFoundMovies] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);

  const [isMoreResultBtnVisible, setIsMoreResultBtnVisible] = useState(false);

  const [searchString, setSearchString] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);

  const [isEmptySearch, setIsEmptySearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { likedCards, setLikedCards, user } = useContext(CurrentUser);

  const pushNotification = usePushNotification();

  const injectLikes = (cards) => {
    return cards.map(
      (card) =>
        likedCards.find((likedMovie) => card.movieId === likedMovie.movieId) ||
        card
    );
  };

  const renderStartCards = () => {
    if (filteredMovies.length === 0) {
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

  const saveLastSearch = () => {
    localStorage.setItem(
      'last-result',
      JSON.stringify({
        searchString,
        isShortMovies,
        foundMovies,
      })
    );
  };

  const addCardsPage = () => {
    const { newCards, isAllCards } = getNewPage(cards, filteredMovies);

    setCards((cards) => [...cards, ...injectLikes(newCards)]);
    setIsMoreResultBtnVisible(!isAllCards);
  };

  useEffect(() => {
    if (!foundMovies) {
      return;
    }
    setFilteredMovies(filterByDuration(foundMovies, isShortMovies));
    saveLastSearch();
  }, [foundMovies, isShortMovies]);

  useEffect(() => {
    if (!filteredMovies) {
      return;
    }
    renderStartCards(filteredMovies);
  }, [filteredMovies]);

  const likeCard = async (card) => {
    try {
      const movie = await likeMovie(card);
      setLikedCards([movie, ...likedCards]);

      setCards(
        cards.map((card) => {
          if (movie.movieId === card.movieId) {
            card.owner = user._id;
            card._id = movie._id;
          }
          return card;
        })
      );
    } catch (err) {
      pushNotification({
        type: 'error',
        text: err.message,
      });
    }
  };
  const dislikeCard = async (card) => {
    try {
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
    } catch (err) {
      pushNotification({
        type: 'error',
        text: err.message,
      });
    }
  };
  const handleLikeOrDislikeCard = async (card) => {
    card.owner !== user._id ? await likeCard(card) : await dislikeCard(card);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setIsEmptySearch(false);
    setFoundMovies(null);
    setFilteredMovies(null);
    setCards([]);
    setIsMoreResultBtnVisible(false);

    try {
      const movies = await getMovies();
      const formattedMovies = movies.map((movie) => {
        return {
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `${MOVIE_COVER_URL}${movie.image.url}`,
          trailerLink: movie.trailerLink,
          thumbnail: `${MOVIE_COVER_URL}${movie.image.formats.thumbnail.url}`,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        };
      });

      setFoundMovies(filterBySearchString(formattedMovies, searchString));
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
    <section className="movies">
      <SearchMovieForm
        extraClass="movies__search-form"
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
        <Empty heading="╮（╯＿╰）╭" text="Ничего не нашлось" />
      ) : null}
      <button
        className={`movies__more-btn${
          isMoreResultBtnVisible ? ' movies__more-btn_visible' : ''
        }`}
        type="button"
        onClick={addCardsPage}
      >
        Ещё
      </button>
    </section>
  );
};

export default Movies;
