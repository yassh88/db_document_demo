import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
  name: "post",
  initialState: {
    activeTab: 2,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      return state;
    },
  },
});
export default postSlice;
