import { createAction } from '@reduxjs/toolkit';
import { Film, Films } from '../types/film';
import { AuthStatus } from '../const';
import { UserData } from '../types/user-data';
import { Comments } from '../types/comments';

export const changeGenre = createAction<{genre: string}>('app/changeGenre',);

export const setFilms = createAction<Films>('data/loadFilms');

export const changeIsDataLoading = createAction<boolean>('data/changeIsDataLoading');

export const setAuthStatus = createAction<AuthStatus>('user/setAuthStatus');

export const setUserInfo = createAction<UserData | null>('user/setUserInfo');

export const setFilm = createAction<Film | null>('data/setFilm');

export const setSimilarFilms = createAction<Films>('data/setSimilarFilms');

export const setComments = createAction<Comments>('data/setComments');
