import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';

import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import SearchMovieForm from '../../SearchMovieForm/SearchMovieForm';
import EmptySearch from '../../EmptySearch/EmptySearch';

import { IMovie } from '../../../types/movie';
import { IMovieDuration } from '../../ui/MovieDurationRadio/MovieDurationRadio';

import {
  filterByDuration,
  filterBySearchString,
} from '../../../utils/searchUtils';

import styles from './SavedMovies.module.css';

const SavedMovies = () => {
  const { likedMovies } = useAppSelector(({ main }) => main);

  const [filteredMovies, setFilteredMovies] = useState<IMovie[] | null>(null);

  const [searchString, setSearchString] = useState('');
  const [movieDuration, setMovieDuration] = useState<IMovieDuration>('all');

   useEffect(() => {
    setFilteredMovies(likedMovies);
  }, [likedMovies]);

  useEffect(() => {
    if (!likedMovies) {
      return;
    }

    let filteredMovies = searchString
      ? filterBySearchString(likedMovies, searchString)
      : likedMovies;

    if (movieDuration === 'long') {
      filteredMovies = filterByDuration(filteredMovies, false);
    }
    if (movieDuration === 'short') {
      filteredMovies = filterByDuration(filteredMovies, true);
    }

    setFilteredMovies(filteredMovies);
  }, [searchString, movieDuration, likedMovies])


  const emptySearch = filteredMovies !== null && filteredMovies?.length === 0;

  return (
    <section className={styles.savedMovies}>
      <SearchMovieForm
        extraClass={styles.savedMovies__searchForm}
        searchString={searchString}
        setSearchString={setSearchString}
        durationType={movieDuration}
        setDurationType={setMovieDuration}
      />

      {likedMovies.length === 0 ? (
        <EmptySearch
          heading="(┬┬﹏┬┬)"
          text="Вы не добавили ни одного фильма"
        />
      ) : emptySearch ? (
        <EmptySearch heading="(┬┬﹏┬┬)" text="Ничего не найдено" />
      ) : (
        <MoviesCardList cards={filteredMovies} />
      )}
    </section>
  );
};
export default SavedMovies;
