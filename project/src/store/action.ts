import { createAction } from '@reduxjs/toolkit';
import { Films } from '../types/film';
import { AuthStatus } from '../const';

export const changeGenre = createAction<{genre: string}>('app/changeGenre',);

export const loadFilms = createAction<Films>('data/loadFilms');

export const requireAuth = createAction<AuthStatus>('user/requireAuth');

export const changeIsDataLoading = createAction<boolean>('data/changeIsDataLoading');
