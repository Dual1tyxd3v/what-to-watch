import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus } from '../const';
import { Comments } from '../types/comments';
import { Film, Films } from '../types/film';
import { changeIsDataLoading, setFilms, setFilm, setSimilarFilms, setComments, setCommentPostLoading, setPromoFilm, setFavoriteFilms, } from './action';

type InitState = {
  films: Films;
  authStatus: AuthStatus;
  isDataLoaded: boolean;
  film: Film | null;
  similarFilms: Films;
  comments: Comments;
  isPostLoading: boolean;
  promoFilm: Film | null;
  favoriteFilms: Films;
}

const initState: InitState = {
  films: [],
  authStatus: AuthStatus.Unknown,
  isDataLoaded: false,
  film: null,
  similarFilms: [],
  comments: [],
  isPostLoading: false,
  promoFilm: null,
  favoriteFilms: []
};

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(changeIsDataLoading, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(setSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setCommentPostLoading, (state, action) => {
      state.isPostLoading = action.payload;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
    });
});

export {reducer};
