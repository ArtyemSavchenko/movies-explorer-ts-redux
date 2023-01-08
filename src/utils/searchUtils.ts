import { IMovieDuration } from '../components/ui/MovieDurationRadio/MovieDurationRadio';
import { IMovie } from '../types/movie';
import { SHORT_MOVIE_DURATION } from './constants';

export const filterBySearchString = (
  movies: IMovie[],
  searchString: string
) => {
  if (!searchString) {
    return movies;
  }

  return movies.filter((movie) => {
    if (
      !movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) &&
      !movie.nameEN.toLowerCase().includes(searchString.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
};

export const filterByDuration = (movies: IMovie[], isShortMovies: boolean) => {
  return movies.filter((movie) => {
    if (
      !(isShortMovies && movie.duration <= SHORT_MOVIE_DURATION) &&
      !(!isShortMovies && movie.duration > SHORT_MOVIE_DURATION)
    ) {
      return false;
    }

    return true;
  });
};

export const filterByParams = (
  cards: IMovie[],
  searchString: string,
  movieDuration: IMovieDuration
): IMovie[] => {
  let filteredMovies = searchString
    ? filterBySearchString(cards, searchString)
    : cards;

  if (movieDuration === 'long') {
    filteredMovies = filterByDuration(filteredMovies, false);
  }
  if (movieDuration === 'short') {
    filteredMovies = filterByDuration(filteredMovies, true);
  }

  return filteredMovies;
};
