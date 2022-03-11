import { combineReducers } from "redux";

import movieReducer from "./reducer/movie.reducers";
import favoriteReducer from "./reducer/favorite.reducers";

import { RootState } from "./types";

const rootReducer = combineReducers<RootState>({
  movieState: movieReducer,
  favoritesState: favoriteReducer,
});

export default rootReducer;
