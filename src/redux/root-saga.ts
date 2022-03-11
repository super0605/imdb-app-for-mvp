import { all } from "redux-saga/effects";
import { movieSaga } from "./sagas/movie.sagas";
import { favoriteSaga } from "./sagas/favorite.sagas";

export default function* rootSaga() {
  yield all([movieSaga(), favoriteSaga()]);
}
