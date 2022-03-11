import {
  GET_ALL_MOVIES_REQUEST,
  GET_ALL_MOVIES_SUCCESS,
  GET_ALL_MOVIES_FAILURE,
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  SELECTED_MOVIE_REQUEST,
  SELECTED_MOVIE_SUCCESS,
  SELECTED_MOVIE_FAILURE,
} from "../constants";
import { MovieState } from "../types";

const initialState: MovieState = {
  movies: [],
  nowPlayingCollections: [],
  featuredTodayCollections: [],
  fanFavoritesCollections: [],
  selectedMovie: null,
  isFetching: false,
  errorMessage: undefined,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_MOVIES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_ALL_MOVIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        movies: action.payload,
      };
    case GET_ALL_MOVIES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case GET_MOVIES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_MOVIES_SUCCESS:
      if (action.url.includes("/now_playing")) {
        state.nowPlayingCollections = action.payload;
      }
      if (action.url.includes("/trending")) {
        state.featuredTodayCollections = action.payload;
      }
      if (action.url.includes("/popular")) {
        state.fanFavoritesCollections = action.payload;
      }

      return {
        ...state,
        isFetching: false,
        nowPlayingCollections: state.nowPlayingCollections,
        featuredTodayCollections: state.featuredTodayCollections,
        fanFavoritesCollections: state.fanFavoritesCollections,
      };
    case GET_MOVIES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case SELECTED_MOVIE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SELECTED_MOVIE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selectedMovie: action.payload,
      };
    case SELECTED_MOVIE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
