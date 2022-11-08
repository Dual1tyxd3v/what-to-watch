import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appProcess } from './app-process/app-process';
import { reducer } from './reducer';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.App]: appProcess.reducer,
  All: reducer
});
