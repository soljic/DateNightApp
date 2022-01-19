import React from "react";
import ReactDOM from "react-dom";
import 'react-calendar/dist/Calendar.css'
import "../src/app/layout/index.css";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css'
import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";
import { store, StoreContext } from "./app/layout/stores/store";
import { BrowserRouter, Router } from "react-router-dom";
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <Router history={history}>
        <App />
      </Router>
    </StoreContext.Provider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
