import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import Preloader from '../../ui/Preloader/Preloader';
import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import SearchMovieForm from '../../SearchMovieForm/SearchMovieForm';
import EmptySearch from '../../EmptySearch/EmptySearch';

import { IMovie } from '../../../types/movie';
import { IMovieDuration } from '../../ui/MovieDurationRadio/MovieDurationRadio';
import { usePushNotification } from '../../shared/Notifications/NotificationsProvider';
import { getBeatMoviesThunk } from '../../../store/beatMovies/thunks';
import { resetBeatMovieState } from '../../../store/beatMovies/beatMovies';
import {
  filterByDuration,
  filterBySearchString,
} from '../../../utils/searchUtils';

import styles from './Movies.module.css';

const Movies = () => {
  const dispatch = useAppDispatch();
  const { likedMovies, beatMovies, isFetchBeatMovies } = useAppSelector(
    (state) => ({
      beatMovies: state.beatMovie.movies,
      likedMovies: state.main.likedMovies,
      isFetchBeatMovies: state.beatMovie.isFetchBeatMovies,
    })
  );

  const [cards, setCards] = useState<IMovie[] | null>(null);
  const [filteredMovies, setFilteredMovies] = useState<IMovie[] | null>(null);

  const [searchString, setSearchString] = useState('');
  const [movieDuration, setMovieDuration] = useState<IMovieDuration>('all');

  const pushNotification = usePushNotification();

  const injectLikes = (cards: IMovie[]): IMovie[] => {
    return cards.map(
      (card) =>
        likedMovies.find((likedMovie) => card.movieId === likedMovie.movieId) ||
        card
    );
  };

  const filterMovies = () => {
    if (!cards) {
      return;
    }

    let filteredMovies = searchString
      ? filterBySearchString(cards, searchString)
      : cards;

    if (movieDuration === 'long') {
      filteredMovies = filterByDuration(filteredMovies, false);
    }
    if (movieDuration === 'short') {
      filteredMovies = filterByDuration(filteredMovies, true);
    }

    setFilteredMovies(filteredMovies);
  };

  useEffect(() => {
    const loadingCards = async () => {
      try {
        await dispatch(getBeatMoviesThunk()).unwrap();
      } catch (err: any) {
        pushNotification({
          type: 'error',
          text: err.message,
        });
      }
    };
    loadingCards();

    return () => {
      dispatch(resetBeatMovieState());
    };
  }, []);

  useEffect(() => {
    if (beatMovies.length > 0) {
      setCards(injectLikes(beatMovies));
    }
  }, [beatMovies, likedMovies]);

  useEffect(() => {
    if (cards) {
      filterMovies();
    }
  }, [searchString, movieDuration, cards]);

  const emptySearch = filteredMovies !== null && filteredMovies?.length === 0;

  return (
    <section className={styles.movies}>
      <SearchMovieForm
        extraClass={styles.movies__searchForm}
        searchString={searchString}
        setSearchString={setSearchString}
        durationType={movieDuration}
        setDurationType={setMovieDuration}
      />
      {isFetchBeatMovies ? (
        <Preloader />
      ) : (
        <MoviesCardList cards={filteredMovies} />
      )}
      {emptySearch ? (
        <EmptySearch heading="╮（╯＿╰）╭" text="Ничего не нашлось" />
      ) : null}
    </section>
  );
};

export default Movies;
