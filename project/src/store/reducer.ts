import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus } from '../const';
import { Comments } from '../types/comments';
import { Film, Films } from '../types/film';
import { UserData } from '../types/user-data';
import { changeGenre, changeIsDataLoading, setFilms, setAuthStatus, setUserInfo, setFilm, setSimilarFilms, setComments } from './action';

type InitState = {
  selectedGenre: string;
  films: Films;
  authStatus: AuthStatus;
  isDataLoaded: boolean;
  userInfo: UserData | null;
  film: Film | null;
  similarFilms: Films;
  comments: Comments;
}

const initState: InitState = {
  selectedGenre: 'All Genres',
  films: [],
  authStatus: AuthStatus.Unknown,
  isDataLoaded: false,
  userInfo: null,
  film: null,
  similarFilms: [],
  comments: []
};

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.selectedGenre = action.payload.genre;
    })
    .addCase(setFilms, (state, action) => {
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
    })
    .addCase(setFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(setSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    });
});

export {reducer};
