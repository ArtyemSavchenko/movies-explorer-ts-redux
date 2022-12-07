import { ILikedMovie, IMovieForLike } from '../types/movie';
import { ICurrentUser, IToken } from '../types/user';
import { checkApiError } from './checkApiError';

import { MAIN_BASE_URL } from './constants';

const getToken = () => {
  return `Bearer ${localStorage.getItem('jwt')}`;
};

export const authorize = async (email: string, password: string) => {
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

  return checkApiError<IToken>(res);
};

export const register = async (email: string, password: string, name: string) => {
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

  return checkApiError<ICurrentUser>(res);
};

export const getUser = async () => {
  const res = await fetch(`${MAIN_BASE_URL}/users/me`, {
    headers: {
      Authorization: getToken(),
    },
  });

  return checkApiError<ICurrentUser>(res);
};

export const patchUser = async (name: string, email: string) => {
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

  return checkApiError<ICurrentUser>(res);
};

export const likeMovie = async (movie: IMovieForLike) => {
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

  return checkApiError<ILikedMovie>(res);
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

export const getLikedMovies = async () => {
  const res = await fetch(`${MAIN_BASE_URL}/movies`, {
    headers: {
      Authorization: getToken(),
    },
  });

  return checkApiError<ILikedMovie[]>(res);
}
