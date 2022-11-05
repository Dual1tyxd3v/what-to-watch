import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { redirect } from './middlewares/redirect';
import { reducer } from './reducer';

const api = createApi();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect)
});
