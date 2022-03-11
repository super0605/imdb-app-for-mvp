import {
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAILURE,
  REMOVE_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAILURE,
} from "../constants";
import { FavoritesState } from "../types";

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
  errorMessage: undefined,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_FAVORITE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ADD_FAVORITE_SUCCESS:
      const favoriteList = state.favorites.concat(action.payload);

      return {
        ...state,
        isFetching: false,
        favorites: favoriteList,
      };
    case ADD_FAVORITE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case REMOVE_FAVORITE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REMOVE_FAVORITE_SUCCESS:
      const index = state.favorites.indexOf(action.payload);
      if (index > -1) {
        state.favorites.splice(index, 1);
      }

      return {
        ...state,
        isFetching: false,
        favorites: state.favorites,
      };
    case REMOVE_FAVORITE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
};
