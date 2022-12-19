import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

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
import { getBeatMoviesThunk } from '../../../store/beatMovies/thunks';
import { setLoadingStatus } from '../../../store/main/main';
import { resetBeatMovieState } from '../../../store/beatMovies/beatMovies';
import { IMovie } from '../../../types/movie';

import styles from './Movies.module.css';

const Movies = () => {
  const dispatch = useAppDispatch();
  const { likedMovies, beatMovies, loadingStatus } = useAppSelector(
    (state) => ({
      beatMovies: state.beatMovie.movies,
      user: state.main.user,
      likedMovies: state.main.likedMovies,
      loadingStatus: state.main.loadingStatus,
    })
  );

  const [cards, setCards] = useState<IMovie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);

  const [searchString, setSearchString] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);

  const [isEmptySearch, setIsEmptySearch] = useState(false);

  const pushNotification = usePushNotification();

  const injectLikes = (cards: IMovie[]): IMovie[] => {
    return cards.map(
      (card) =>
        likedMovies.find(
          (likedMovie) => card.movieId === likedMovie.movieId
        ) || card
    );
  };

  useEffect(() => {
    const loadingCards = async () => {
      dispatch(setLoadingStatus('submitting'));

      try {
        await dispatch(getBeatMoviesThunk()).unwrap();
      } catch (err: any) {
        pushNotification({
          type: 'error',
          text: err.message,
        });
      } finally {
        dispatch(setLoadingStatus(null));
      }
    };
    loadingCards();

    return () => {
      dispatch(resetBeatMovieState());
    };
  }, []);

  useEffect(() => {
    setCards(injectLikes(beatMovies));
  }, [beatMovies, likedMovies]);

  return (
    <section className={styles.movies}>
      <SearchMovieForm
        extraClass={styles.movies__searchForm}
        onSubmit={() => console.log('search')}
        searchString={searchString}
        setSearchString={setSearchString}
        isShortMovies={isShortMovies}
        setIsShortMovies={setIsShortMovies}
      />
      {loadingStatus === 'submitting' ? (
        <Preloader />
      ) : (
        <MoviesCardList cards={cards} />
      )}
      {isEmptySearch && !loadingStatus ? (
        <EmptySearch heading="╮（╯＿╰）╭" text="Ничего не нашлось" />
      ) : null}
    </section>
  );
};

export default Movies;
