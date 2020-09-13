import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
// const express = require('express');
// const cors = require('cors');
// const app = express();
import defaultStore from "./store/Store";
import { connect, Provider } from "react-redux";
import MonthlyFinanceAssigner from "./MonthlyFinanceAssigner";

ReactDOM.render(
  <Provider store={defaultStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
