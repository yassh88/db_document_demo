import navDataSlice from "./navData";
import filesSlice from "./files";

const reducers = {
  tabs: navDataSlice.reducer,
  files: filesSlice.reducer,
};
export default reducers;
