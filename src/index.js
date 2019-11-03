import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from 'redux-devtools-extension';

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import authReducer from "./store/reducers/auth";

import "./index.css";

const rootReducers = combineReducers({
  auth: authReducer
});

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
);

serviceWorker.unregister();
