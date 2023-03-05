import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
import { Home } from "./Home";
import * as reactRedux from "react-redux";
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe("App Component", function () {
  const dummyDispatch = jest.fn();
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });
  it("should have hello dom ", function () {
    useSelectorMock.mockReturnValue({
      loading: true,
      error: "",
      isAlertDone: true,
    });
    render(<Home />);
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });
  it("should useDispatch not called", function () {
    useSelectorMock.mockReturnValue({
      loading: true,
      error: "",
      isAlertDone: true,
    });
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);
    console.log("SDAF", JSON.stringify(useDispatchMock));
    render(<Home />);
    expect(useDispatchMock).toHaveBeenCalledTimes(0);
  });
});
