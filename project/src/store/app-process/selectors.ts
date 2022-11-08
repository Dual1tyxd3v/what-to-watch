import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getError = (state: State) => state[NameSpace.App].error;
export const getGenre = (state: State) => state[NameSpace.App].selectedGenre;
