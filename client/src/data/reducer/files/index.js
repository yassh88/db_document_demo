import { createSlice, createAction } from "@reduxjs/toolkit";
export const files = createAction("fetchTodo");
const todoSlice = createSlice({
  name: "files",
  initialState: {
    data: [],
    currentDocSize: 0,
    isAlertDone: true,
    loading: true,
    error: "",
  },
  reducers: {
    fetchData: (state, action) => {
      console.log("action", action.payload);
      state.loading = true;
      return state;
    },
    setData: (state, action) => {
      console.log("action", action.payload);
      state.data = action.payload.fileData;
      state.currentDocSize = action.payload.currentDocSize;
      return state;
    },
    setNewRow: (state, action) => {
      state.data.table = [...state.data.table, action.payload.value];
      state.isAlertDone = false;
      state.loading = true;
      return state;
    },
    updateRow: (state, action) => {
      let object = state.data.table.find((obj) => obj.id === "");
      object.id = action.payload.id;
      object.fileDetails = action.payload.fileDetails;
      state.loading = false;
      state.error = "";
      return state;
    },
    setAlert: (state) => {
      state.isAlertDone = false;
      state.error = false;
      return state;
    },
    failedTOUpload: (state, action) => {
      state.data.table = state.data.table.filter((obj) => obj.id !== "");
      state.loading = false;
      state.error = action.payload;
      return state;
    },
  },
});
export default todoSlice;
