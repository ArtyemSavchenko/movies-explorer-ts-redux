import { MOVIE_BASE_URL, MOVIE_COVER_URL } from '../utils/constants';
import { IBeatMovie, IMovie } from '../types/movie';
import { checkApiError } from './checkApiError';

export const getMovies = async (): Promise<IMovie[]> => {
  const res = await fetch(`${MOVIE_BASE_URL}`);
  const movies = await checkApiError<IBeatMovie[]>(res);
  
  return movies.map((movie) => {
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
};
