import { createAction } from '@reduxjs/toolkit';
import { Films } from '../types/film';
import { AuthStatus } from '../const';
import { UserData } from '../types/user-data';

export const changeGenre = createAction<{genre: string}>('app/changeGenre',);

export const loadFilms = createAction<Films>('data/loadFilms');

export const changeIsDataLoading = createAction<boolean>('data/changeIsDataLoading');

export const setAuthStatus = createAction<AuthStatus>('user/setAuthStatus');

export const setUserInfo = createAction<UserData | null>('user/setUserInfo');
