import { fork, all } from "redux-saga/effects";
import filesSaga from "./files/get";
import filesSaveSaga from "./files/save";

export default function* rootSaga() {
  try {
    yield all([fork(filesSaga), fork(filesSaveSaga)]);
  } catch (e) {
    console.log(e);
  }
}
