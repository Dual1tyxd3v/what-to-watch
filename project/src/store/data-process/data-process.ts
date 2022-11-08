import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace } from '../../const';
import { fetchCommentsAction, fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarFilmsAction, postCommentAction } from '../../services/api-actions';
import { Film } from '../../types/film';
import { DataProcess } from '../../types/store';

const initialState: DataProcess = {
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

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setFilm: (state, action: {type: string; payload: null | Film}) => {
      state.film = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.isDataLoaded = false;
        state.film = action.payload;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.isDataLoaded = false;
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchFavoriteFilmsAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.isDataLoaded = false;
        state.promoFilm = action.payload;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.isPostLoading = false;
        state.comments = action.payload;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isPostLoading = false;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isPostLoading = true;
      });
  }
});

export const {setFilm} = dataProcess.actions;
