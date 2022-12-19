import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMovie } from '../../types/movie';
import { ICurrentUser } from '../../types/user';
import {
  authorizeThunk,
  registerThunk,
  likeMovieThunk,
  dislikeMovieThunk,
  patchUserThunk,
  getUserDataThunk,
} from './thunks';

type ILoadingStatus = 'appLoading' | 'submitting' | null;

interface IMainState {
  user: ICurrentUser | null;
  loadingStatus: ILoadingStatus;
  likedMovies: IMovie[];
}

const initialState: IMainState = {
  user: null,
  loadingStatus: 'appLoading',
  likedMovies: [],
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<ILoadingStatus>) => {
      state.loadingStatus = action.payload;
    },
    resetMainState: () => ({
      ...initialState,
      loadingStatus: null,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDataThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.likedMovies = action.payload.likedMovies;
    });

    builder.addCase(authorizeThunk.pending, (state) => {
      state.loadingStatus = 'submitting';
    });
    builder.addCase(authorizeThunk.rejected, (state) => {
      state.loadingStatus = null;
    });
    builder.addCase(authorizeThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.likedMovies = action.payload.likedMovies;
      state.loadingStatus = null;
    });

    builder.addCase(registerThunk.pending, (state) => {
      state.loadingStatus = 'submitting';
    });
    builder.addCase(registerThunk.rejected, (state) => {
      state.loadingStatus = null;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loadingStatus = null;
    });

    builder.addCase(patchUserThunk.pending, (state) => {
      state.loadingStatus = 'submitting';
    });
    builder.addCase(patchUserThunk.rejected, (state) => {
      state.loadingStatus = null;
    });
    builder.addCase(patchUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loadingStatus = null;
    });

    builder.addCase(likeMovieThunk.fulfilled, (state, action) => {
      state.likedMovies.unshift(action.payload);
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

export const { setLoadingStatus, resetMainState } = mainSlice.actions;

export default mainSlice.reducer;
