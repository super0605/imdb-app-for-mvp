import { put, call, all, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
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
import { fetchSearchMoviesAPI, fetchShowAPI, fetchMoviesAPI } from "../api";
import { PayloadType } from "../types";

function* getAllMovie({ payload }: PayloadType): SagaIterator {
  let movieResponse: any = {};
  let showResponse: any = {};
  let errors;
  try {
    movieResponse = yield call(fetchSearchMoviesAPI, payload.query);
  } catch (err) {
    errors = err;
  }
  try {
    showResponse = yield call(fetchShowAPI, payload.query);
  } catch (err) {
    errors = err;
  }
  yield put({
    type: GET_ALL_MOVIES_SUCCESS,
    payload: [...movieResponse.data.results, ...showResponse.data.results],
  });
  yield put({ type: GET_ALL_MOVIES_FAILURE });
}

function* getMoviesAsync({ payload }: PayloadType): SagaIterator {
  try {
    const movieResponse = yield call(fetchMoviesAPI, payload.url);

    yield put({
      type: GET_MOVIES_SUCCESS,
      payload: movieResponse.data.results,
      url: payload.url,
    });
  } catch (error) {
    yield put({
      type: GET_MOVIES_FAILURE,
      payload: error,
      url: payload.url,
    });
  }
}

function* getSelectedSingleMovie({ payload }: PayloadType): SagaIterator {
  if (payload.movie && payload.movie.hasOwnProperty("id")) {
    yield put({
      type: SELECTED_MOVIE_SUCCESS,
      payload: payload.movie,
    });
  } else {
    yield put({
      type: SELECTED_MOVIE_FAILURE,
      payload: "No Selected Movie!",
    });
  }
}

export function* movieSaga(): SagaIterator {
  yield all([
    takeEvery(GET_ALL_MOVIES_REQUEST, getAllMovie),
    takeEvery(GET_MOVIES_REQUEST, getMoviesAsync),
    takeEvery(SELECTED_MOVIE_REQUEST, getSelectedSingleMovie),
  ]);
}
