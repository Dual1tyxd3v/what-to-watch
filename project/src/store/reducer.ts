import { createReducer } from '@reduxjs/toolkit';
import { films } from '../mocks/films';
import { changeGenre } from './action';

const initState = {
  selectedGenre: 'All Genres',
  films: films
};

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.selectedGenre = action.payload.genre;
    });
});

export {reducer};
