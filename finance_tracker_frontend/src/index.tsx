import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

import { connect, Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import itemApp from "./store/items/reducers";
import { addItemAction } from "./store/items/actions";
import thunk from "redux-thunk";

const store = createStore(itemApp, applyMiddleware(thunk));
console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(addItemAction("kyle"));
store.dispatch(addItemAction("tromster"));
unsubscribe();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
