import { IMovie } from '../types/movie';
import { ICurrentUser, IToken } from '../types/user';
import { checkApiError } from './checkApiError';

import { MAIN_BASE_URL } from './constants';

const getToken = () => {
  return `Bearer ${localStorage.getItem('jwt')}`;
};

export const authorize = async (
  email: string,
  password: string
): Promise<IToken> => {
  const res = await fetch(`${MAIN_BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return checkApiError(res);
};

export const register = async (
  email: string,
  password: string,
  name: string
): Promise<ICurrentUser> => {
  const res = await fetch(`${MAIN_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });

  return checkApiError(res);
};

export const getUser = async (): Promise<ICurrentUser> => {
  const res = await fetch(`${MAIN_BASE_URL}/users/me`, {
    headers: {
      Authorization: getToken(),
    },
  });

  return checkApiError(res);
};

export const patchUser = async (
  name: string,
  email: string
): Promise<ICurrentUser> => {
  const res = await fetch(`${MAIN_BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
    body: JSON.stringify({
      name,
      email,
    }),
  });

  return checkApiError(res);
};

export const likeMovie = async (movie: IMovie): Promise<IMovie> => {
  const res = await fetch(`${MAIN_BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }),
  });

  return checkApiError(res);
};

export const dislikeMovie = async (movieId: string) => {
  const res = await fetch(`${MAIN_BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      Authorization: getToken(),
    },
  });

  return checkApiError(res);
};

export const getLikedMovies = async (): Promise<IMovie[]> => {
  const res = await fetch(`${MAIN_BASE_URL}/movies`, {
    headers: {
      Authorization: getToken(),
    },
  });

  return checkApiError(res);
};
