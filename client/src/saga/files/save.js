import { call, takeEvery, put } from "redux-saga/effects";
import filesSlice from "../../data/reducer/files";
import { callAPI } from "../utils";

export const { updateRow, failedTOUpload } = filesSlice.actions;

export function* postNewFileData({ payload }) {
  let result = [];
  try {
    for (const file of payload.selectedFiles) {
      let formData = new FormData();
      formData.append("file", file);
      const response = yield call(() =>
        callAPI({
          url: "http://localhost:8080/upload",
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      );
      result.push(response.data);
    }
    console.log("result", result);
    const data = { ...payload.value, fileDetails: result };
    const res = yield call(() =>
      callAPI({
        url: "http://localhost:8080/fileMetaData",
        method: "POST",
        data,
      })
    );
    console.log("res", res);
    yield put(updateRow(res.data.obj));
  } catch (e) {
    yield put(failedTOUpload(e));
  }
}

export default function* todoSaga() {
  yield takeEvery(filesSlice.actions.setNewRow().type, postNewFileData);
}
