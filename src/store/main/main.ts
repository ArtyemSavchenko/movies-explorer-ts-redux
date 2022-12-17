import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMovie } from '../../types/movie';
import { ICurrentUser } from '../../types/user';
import {
  getUserThunk,
  authorizeThunk,
  registerThunk,
  getLikedMoviesThunk,
  likeMovieThunk,
  dislikeMovieThunk,
  patchUserThunk,
} from './thunks';

type ILoading = 'appLoading' | 'submitting' | null;

interface IMainState {
  user: ICurrentUser | null;
  loadingStatus: ILoading;
  likedMovies: IMovie[] | null;
}

const initialState: IMainState = {
  user: null,
  loadingStatus: 'appLoading',
  likedMovies: null,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoadingStatus: (state: IMainState, action: PayloadAction<ILoading>) => {
      state.loadingStatus = action.payload;
    },
    resetState: (state: IMainState) => {
      state = {
        ...initialState,
        loadingStatus: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserThunk.pending, (state) => {
      // state.loadingStatus = 'appLoading';
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      // state.loadingStatus = null;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      // state.loadingStatus = null;
    });

    builder.addCase(authorizeThunk.pending, (state) => {
      state.loadingStatus = 'submitting';
    });
    builder.addCase(authorizeThunk.rejected, (state) => {
      // state.loadingStatus = null;
    });
    builder.addCase(authorizeThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      // state.loadingStatus = null;
    });

    builder.addCase(registerThunk.pending, (state) => {
      // state.loadingStatus = 'submitting';
    });
    builder.addCase(registerThunk.rejected, (state) => {
      // state.loadingStatus = null;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      // state.loadingStatus = null;
    });

    builder.addCase(patchUserThunk.pending, (state) => {
      // state.loadingStatus = 'submitting';
    });
    builder.addCase(patchUserThunk.rejected, (state) => {
      // state.loadingStatus = null;
    });
    builder.addCase(patchUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      // state.loadingStatus = null;
    });

    builder.addCase(getLikedMoviesThunk.pending, (state) => {
      // state.loadingStatus = 'submitting';
    });
    builder.addCase(getLikedMoviesThunk.rejected, (state) => {
      // state.loadingStatus = null;
    });
    builder.addCase(getLikedMoviesThunk.fulfilled, (state, action) => {
      state.likedMovies = action.payload;
      // state.loadingStatus = null;
    });

    builder.addCase(likeMovieThunk.pending, (state) => {
      // state.loadingStatus = 'submitting';
    });
    builder.addCase(likeMovieThunk.rejected, (state) => {
      // state.loadingStatus = null;
    });
    builder.addCase(likeMovieThunk.fulfilled, (state, action) => {
      const movieId = state.likedMovies?.findIndex(
        (movie) => movie.movieId === action.payload.movieId
      );
      if (movieId && state.likedMovies) {
        state.likedMovies[movieId].owner = state.user?._id;
        state.likedMovies[movieId]._id = action.payload._id;
      }
    });

    builder.addCase(dislikeMovieThunk.pending, (state) => {
      // state.loadingStatus = 'submitting';
    });
    builder.addCase(dislikeMovieThunk.rejected, (state) => {
      // state.loadingStatus = null;
    });
    builder.addCase(dislikeMovieThunk.fulfilled, (state, action) => {
      if (state.likedMovies) {
        state.likedMovies = state.likedMovies.filter(
          (movie) => movie._id !== action.payload.movieId
        );
      }
    });
  },
});

export const { setLoadingStatus, resetState } = mainSlice.actions;

export default mainSlice.reducer;
