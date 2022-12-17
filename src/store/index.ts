import { configureStore } from '@reduxjs/toolkit';

import main from './main/main';
import beatMovie from './beatMovies/beatMovies';

const store = configureStore({
  reducer: {
    main,
    beatMovie,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
