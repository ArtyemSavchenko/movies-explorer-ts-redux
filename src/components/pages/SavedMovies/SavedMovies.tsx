import { useEffect, useState } from 'react';

import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import SearchMovieForm from '../../SearchMovieForm/SearchMovieForm';
import EmptySearch from '../../EmptySearch/EmptySearch';
import Preloader from '../../ui/Preloader/Preloader';

import { IMovie } from '../../../types/movie';
import { useAppSelector } from '../../../store/hooks';
import { IMovieDuration } from '../../ui/MovieDurationRadio/MovieDurationRadio';
import { filterByParams } from '../../../utils/searchUtils';
import { debounce } from '../../../utils/debounce';

import styles from './SavedMovies.module.css';

const SavedMovies = () => {
  const { likedMovies } = useAppSelector(({ main }) => main);

  const [filteredMovies, setFilteredMovies] = useState<IMovie[] | null>(null);

  const [searchString, setSearchString] = useState('');
  const [movieDuration, setMovieDuration] = useState<IMovieDuration>('all');

  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setFilteredMovies(likedMovies);
  }, [likedMovies]);

  const filterMovies = () => {
    if (!likedMovies) {
      return;
    }

    setFilteredMovies(filterByParams(likedMovies, searchString, movieDuration));
  };

  useEffect(() => {
    setIsFiltering(true);
    debounce(() => {
      filterMovies();
      setIsFiltering(false);
    }, 300);
  }, [searchString, movieDuration]);

  useEffect(() => {
    filterMovies();
  }, [likedMovies]);

  //TODO filteredMovies !== null - лишнее получается?
  const isEmptySearch =
    !isFiltering &&
    filteredMovies !== null &&
    filteredMovies?.length === 0 &&
    likedMovies.length !== 0;
  const isLoading = isFiltering && likedMovies.length !== 0;
  const isNoLikedMovies = likedMovies.length === 0;

  return (
    <section className={styles.savedMovies}>
      <SearchMovieForm
        extraClass={styles.savedMovies__searchForm}
        searchString={searchString}
        setSearchString={setSearchString}
        durationType={movieDuration}
        setDurationType={setMovieDuration}
      />

      {isNoLikedMovies && (
        <EmptySearch
          heading="(┬┬﹏┬┬)"
          text="Вы не сохранили ни одного фильма"
        />
      )}

      {isLoading ? <Preloader /> : <MoviesCardList cards={filteredMovies} />}

      {isEmptySearch && (
        <EmptySearch heading="(┬┬﹏┬┬)" text="Ничего не найдено" />
      )}
    </section>
  );
};

export default SavedMovies;
