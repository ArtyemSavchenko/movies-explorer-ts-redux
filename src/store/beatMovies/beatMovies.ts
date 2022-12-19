import { createSlice } from '@reduxjs/toolkit';

import { IMovie } from '../../types/movie';
import { getBeatMoviesThunk } from './thunks';

interface IBeatMovieState {
  movies: IMovie[];
}

const initialState: IBeatMovieState = {
  movies: [],
};

const beatMovieSlice = createSlice({
  name: 'beatMovies',
  initialState,
  reducers: {
    resetBeatMovieState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getBeatMoviesThunk.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const { resetBeatMovieState } = beatMovieSlice.actions;

export default beatMovieSlice.reducer;
