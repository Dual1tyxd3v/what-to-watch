import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { reducer } from './reducer';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  All: reducer
});
