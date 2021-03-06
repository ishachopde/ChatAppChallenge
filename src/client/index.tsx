/**
 * React entry page.
 * @author  Isha CHopde
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import {Provider} from "react-redux";
import initialState from "./initialState";
import { configure } from "./store";

// Configure the redux store.
const store = configure(initialState);

const ROOT = document.querySelector(".container");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, ROOT);
