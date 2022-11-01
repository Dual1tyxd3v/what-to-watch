import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { AppDispatch, State } from '../types/store';

export const useAppDiapatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
