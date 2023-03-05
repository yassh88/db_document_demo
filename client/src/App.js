import React from "react";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home";

function App() {
  return (
    <Provider store={store}>
      <div className="container" style={{ width: "100%" }}>
        <div className="my-3">
          <h3>Document Upload Demo</h3>
        </div>
        <Home />
      </div>
    </Provider>
  );
}

export default App;
