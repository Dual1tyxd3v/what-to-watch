import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppProcess } from '../../types/store';

const initialState: AppProcess = {
  error: null,
  selectedGenre: 'All Genres'
};

type AppAction = {
  type: string;
  payload: string | null;
}

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeGenre: (state, action: AppAction) => {
      state.selectedGenre = action.payload ? action.payload : 'All Genres';
    },
    setError: (state, action: AppAction) => {
      state.error = action.payload;
    }
  }
});

export const {changeGenre, setError} = appProcess.actions;
