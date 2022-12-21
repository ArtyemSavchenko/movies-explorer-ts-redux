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

export const getUserDataThunk = createAsyncThunk(
  'main/getUserDataThunk',
  async () => {
    const user = await getUser();
    const likedMovies = await getLikedMovies();

    return { user, likedMovies };
  }
);

export const authorizeThunk = createAsyncThunk<
  { user: ICurrentUser; likedMovies: IMovie[] },
  IAuthorizeData
>('main/authorizeThunk', async ({ email, password }) => {
  const { token } = await authorize({ email, password });
  localStorage.setItem('jwt', token);

  const user = await getUser();
  const likedMovies = await getLikedMovies();

  return { user, likedMovies };
});

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
