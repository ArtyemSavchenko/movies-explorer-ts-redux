import { createSlice } from '@reduxjs/toolkit';

import { IMovie } from '../../types/movie';
import { getBeatMoviesThunk } from './thunks';

interface IBeatMovieState {
  movies: IMovie[];
  isFetchBeatMovies: boolean;
}

const initialState: IBeatMovieState = {
  movies: [],
  isFetchBeatMovies: false,
};

const beatMovieSlice = createSlice({
  name: 'beatMovies',
  initialState,
  reducers: {
    resetBeatMovieState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getBeatMoviesThunk.pending, (state) => {
      state.isFetchBeatMovies = true;
    });
    builder.addCase(getBeatMoviesThunk.rejected, (state, action) => {
      state.isFetchBeatMovies = false;
    });
    builder.addCase(getBeatMoviesThunk.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.isFetchBeatMovies = false;
    });
  },
});

export const { resetBeatMovieState } = beatMovieSlice.actions;

export default beatMovieSlice.reducer;
