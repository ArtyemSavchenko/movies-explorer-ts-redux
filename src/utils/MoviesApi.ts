import { MOVIE_BASE_URL } from '../utils/constants';
import { IMovie } from '../types/movie';

import { checkApiError } from './checkApiError';

export const getMovies = async (): Promise<IMovie> => {
  const res = await fetch(`${MOVIE_BASE_URL}`);
  return checkApiError(res);
};
