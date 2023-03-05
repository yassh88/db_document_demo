import React, { useEffect } from "react";
import { NavBar } from "./NavBar";
import filesSlice from "../data/reducer/files";
import { useDispatch, useSelector } from "react-redux";
import UploadFiles from "./FileUpload";
import { PAGE_TYPE } from "../utils/constant";

export const Home = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) =>
    state.tabs.activeTab ? state.tabs.activeTab : 1
  );

  const { loading, error, isAlertDone } = useSelector((state) => state.files);
  console.log(
    " { loading, error, isAlertDone }",
    JSON.stringify({ loading, error, isAlertDone })
  );

  useEffect(() => {
    dispatch(filesSlice.actions.fetchData());
  }, []);

  useEffect(() => {
    if (!loading && error && !isAlertDone) {
      alert("Opps! Error while save data on server");
      dispatch(filesSlice.actions.setAlert());
    } else if (!loading && !error && !isAlertDone) {
      alert("Your data saved successfully");
      dispatch(filesSlice.actions.setAlert());
    }
  }, [loading]);
  const activePage = () => {
    if (PAGE_TYPE.DOCUMENT === activeTab) {
      return <UploadFiles />;
    }
    return <div>Other page</div>;
  };

  return (
    <div data-testid="home">
      <NavBar />
      {activePage()}
    </div>
  );
};
