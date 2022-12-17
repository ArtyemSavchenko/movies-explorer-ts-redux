import { createAsyncThunk } from '@reduxjs/toolkit';

import { IMovie } from '../../types/movie';
import { getMovies } from '../../utils/MoviesApi';

export const getBeatMoviesThunk = createAsyncThunk<IMovie[]>(
  'beatMovies/getBeatMoviesThunk',
  async () => {
    return getMovies();
  }
);
