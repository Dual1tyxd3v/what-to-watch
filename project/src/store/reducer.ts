import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus } from '../const';
import { Films } from '../types/film';
import { UserData } from '../types/user-data';
import { changeGenre, changeIsDataLoading, loadFilms, setAuthStatus, setUserInfo } from './action';

type InitState = {
  selectedGenre: string;
  films: Films;
  authStatus: AuthStatus;
  isDataLoaded: boolean;
  userInfo: UserData | null;
}

const initState: InitState = {
  selectedGenre: 'All Genres',
  films: [],
  authStatus: AuthStatus.Unknown,
  isDataLoaded: false,
  userInfo: null
};

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.selectedGenre = action.payload.genre;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setAuthStatus, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(changeIsDataLoading, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});

export {reducer};
