import { useEffect, useState } from 'react';

import Preloader from '../../ui/Preloader/Preloader';
import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import SearchMovieForm from '../../SearchMovieForm/SearchMovieForm';
import EmptySearch from '../../EmptySearch/EmptySearch';

import { IMovie } from '../../../types/movie';
import { IMovieDuration } from '../../ui/MovieDurationRadio/MovieDurationRadio';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { usePushNotification } from '../../shared/Notifications/NotificationsProvider';
import { getBeatMoviesThunk } from '../../../store/beatMovies/thunks';
import { resetBeatMovieState } from '../../../store/beatMovies/beatMovies';
import { filterByParams } from '../../../utils/searchUtils';
import { debounce } from '../../../utils/debounce';

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
  const [isFiltering, setIsFiltering] = useState(false);

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

    setFilteredMovies(filterByParams(cards, searchString, movieDuration));
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
      setIsFiltering(true);
      debounce(() => {
        filterMovies();
        setIsFiltering(false);
      }, 300);
    }
  }, [searchString, movieDuration]);

  useEffect(() => {
    if (cards) {
      filterMovies();
    }
  }, [cards]);

  //TODO filteredMovies !== null - лишнее получается?
  const isEmptySearch =
    !isFiltering && filteredMovies !== null && filteredMovies?.length === 0;
  const isLoading = isFetchBeatMovies || isFiltering;

  return (
    <section className={styles.movie}>
      <SearchMovieForm
        extraClass={styles.movies__searchForm}
        searchString={searchString}
        setSearchString={setSearchString}
        durationType={movieDuration}
        setDurationType={setMovieDuration}
      />
      {isLoading ? <Preloader /> : <MoviesCardList cards={filteredMovies} />}
      {isEmptySearch && (
        <EmptySearch heading="╮（╯＿╰）╭" text="Ничего не нашлось" />
      )}
    </section>
  );
};

export default Movies;
