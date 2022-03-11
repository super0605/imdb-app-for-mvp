import { put, all, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import {
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAILURE,
  REMOVE_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAILURE,
} from "../constants";
import { PayloadType } from "../types";

function* addFavorite({ payload }: PayloadType): SagaIterator {
  if (payload.movie && payload.movie.hasOwnProperty("id")) {
    yield put({
      type: ADD_FAVORITE_SUCCESS,
      payload: payload.movie,
    });
  } else {
    yield put({
      type: ADD_FAVORITE_FAILURE,
      payload: "Add Favorite Movie Error!",
    });
  }
}

function* removeFavorite({ payload }: PayloadType): SagaIterator {
  if (payload.movie && payload.movie.hasOwnProperty("id")) {
    yield put({
      type: REMOVE_FAVORITE_SUCCESS,
      payload: payload.movie,
    });
  } else {
    yield put({
      type: REMOVE_FAVORITE_FAILURE,
      payload: "Remove Favorite Movie Error!",
    });
  }
}

export function* favoriteSaga(): SagaIterator {
  yield all([
    takeEvery(REMOVE_FAVORITE_REQUEST, removeFavorite),
    takeEvery(ADD_FAVORITE_REQUEST, addFavorite),
  ]);
}
