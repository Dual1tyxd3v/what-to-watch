import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthStatus } from '../const';
import { changeIsDataLoading, loadFilms, requireAuth } from '../store/action';
import { AuthData } from '../types/auth-data';
import { Films } from '../types/film';
import { AppDispatch, State } from '../types/store';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from './token';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'DATA/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(changeIsDataLoading(true));
    const {data} = await api.get<Films>(APIRoute.Films);
    dispatch(loadFilms(data));
    dispatch(changeIsDataLoading(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'USER/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.LogIn);
      dispatch(requireAuth(AuthStatus.Auth));
    }
    catch {
      dispatch(requireAuth(AuthStatus.NoAuth));
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'USER/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.LogOut);
    dropToken();
    dispatch(requireAuth(AuthStatus.NoAuth));
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'USER/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.LogIn, {email, password});
    saveToken(token);
    dispatch(requireAuth(AuthStatus.Auth));
  }
);
