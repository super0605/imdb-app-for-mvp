import { RootState } from '../types';

export const getMovieState = (state: RootState) => state.movieState;
export const getFavoritesState = (state: RootState) => state.favoritesState;

