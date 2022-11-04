import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus } from '../const';
import { Films } from '../types/film';
import { changeGenre, changeIsDataLoading, loadFilms, requireAuth } from './action';

type InitState = {
  selectedGenre: string;
  films: Films;
  authStatus: AuthStatus;
  isDataLoaded: boolean;
}

const initState: InitState = {
  selectedGenre: 'All Genres',
  films: [],
  authStatus: AuthStatus.Unknown,
  isDataLoaded: false
};

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.selectedGenre = action.payload.genre;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(requireAuth, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(changeIsDataLoading, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});

export {reducer};
