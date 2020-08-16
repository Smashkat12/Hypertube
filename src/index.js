import React from "react";
import "materialize-css";
import { render } from "react-dom";
import MainRouter from "./routes";

render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>,
  document.getElementById("root")
);