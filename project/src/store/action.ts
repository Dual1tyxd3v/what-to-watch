import { createAction } from '@reduxjs/toolkit';
import { Film, Films } from '../types/film';
import { Comments } from '../types/comments';

export const setFilms = createAction<Films>('data/loadFilms');

export const changeIsDataLoading = createAction<boolean>('data/changeIsDataLoading');

export const setFilm = createAction<Film | null>('data/setFilm');

export const setSimilarFilms = createAction<Films>('data/setSimilarFilms');

export const setComments = createAction<Comments>('data/setComments');

export const setCommentPostLoading = createAction<boolean>('data/setCommentPostLoading');

export const setPromoFilm = createAction<Film>('data/setPromoFilm');

export const redirectToRoute = createAction<string>('app/redirectToRoute');

export const setFavoriteFilms = createAction<Films>('data/setFavoriteFilms');
