import React from "react";
import { useDispatch, useSelector } from "react-redux";
import navDataSlice from "../data/reducer/navData";
import { PAGE_TYPE } from "../utils/constant";

export const NavBar = () => {
  const dispatch = useDispatch();

  const activeTab = useSelector((state) =>
    state.tabs.activeTab ? state.tabs.activeTab : 1
  );

  const navChangeHandler = (activePage) => {
    dispatch(navDataSlice.actions.setActiveTab(activePage));
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={
              PAGE_TYPE.HOME === activeTab ? "nav-link active" : "nav-link"
            }
            onClick={() => navChangeHandler(PAGE_TYPE.HOME)}
            href="#"
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a
            className={
              PAGE_TYPE.DOCUMENT === activeTab ? "nav-link active" : "nav-link"
            }
            aria-current="page"
            onClick={() => navChangeHandler(PAGE_TYPE.DOCUMENT)}
            href="#"
          >
            Document
          </a>
        </li>
        <li className="nav-item">
          <a
            className={
              PAGE_TYPE.ABOUT === activeTab ? "nav-link active" : "nav-link"
            }
            href="#"
            onClick={() => navChangeHandler(PAGE_TYPE.ABOUT)}
          >
            About
          </a>
        </li>
      </ul>
    </div>
  );
};
