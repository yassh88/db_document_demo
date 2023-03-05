import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import filesSlice from "../../data/reducer/files";

export const { setData } = filesSlice.actions;
let callAPI = async ({ url, method, data }) => {
  return await Axios({
    url,
    method,
    data,
  });
};

export function* fetchTodoDataSaga() {
  console.log("filesSlice.actions", filesSlice.actions);
  console.log("filesSlice.actions", setData());
  try {
    let result = yield call(() =>
      callAPI({ url: "http://localhost:8080/fileMetaData" })
    );
    let res = yield call(() =>
      callAPI({ url: "http://localhost:8080/currentDocSize" })
    );
    yield put(
      setData({ fileData: result.data, currentDocSize: res.data.currentSize })
    );
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export default function* todoSaga() {
  yield takeEvery(filesSlice.actions.fetchData().type, fetchTodoDataSaga);
}
