import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMovie } from '../../types/movie';

import {
  IAuthorizeData,
  ICurrentUser,
  IRegisterData,
  IUser,
} from '../../types/user';
import {
  authorize,
  dislikeMovie,
  getLikedMovies,
  getUser,
  likeMovie,
  patchUser,
  register,
} from '../../utils/MainApi';

export const getUserThunk = createAsyncThunk('main/getUserThunk', async () => {
  return await getUser();
});

export const authorizeThunk = createAsyncThunk<ICurrentUser, IAuthorizeData>(
  'main/authorizeThunk',
  async ({ email, password }) => {
    const { token } = await authorize({ email, password });
    localStorage.setItem('jwt', token);

    return await getUser();
  }
);

export const registerThunk = createAsyncThunk<ICurrentUser, IRegisterData>(
  'main/registerThunk',
  async ({ email, password, name }) => {
    const user = await register({ email, password, name });

    const { token } = await authorize({ email, password });
    localStorage.setItem('jwt', token);

    return user;
  }
);

export const patchUserThunk = createAsyncThunk<ICurrentUser, IUser>(
  'main/patchUserThunk',
  async ({ email, name }) => {
    const user = await patchUser({ email, name });
    return user;
  }
);

export const getLikedMoviesThunk = createAsyncThunk(
  'main/getLikedMoviesThunk',
  async () => {
    return await getLikedMovies();
  }
);

export const likeMovieThunk = createAsyncThunk<IMovie, IMovie>(
  'main/likeMovieThunk',
  async (movie) => {
    return await likeMovie(movie);
  }
);

export const dislikeMovieThunk = createAsyncThunk<{ movieId: string }, string>(
  'main/dislikeMovieThunk',
  async (movieId) => {
    await dislikeMovie(movieId);
    return { movieId };
  }
);
