import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import departmentReducer from "./reduxStore/reducers/RDepartment";
import formReducer from "./reduxStore/reducers/RForm";
import prefixReducer from "./reduxStore/reducers/RPrefix";
import accountGroupReducer from "./reduxStore/reducers/RAccountGroup";
import accountNameReducer from "./reduxStore/reducers/RAccountName";
import itemGroupReducer from "./reduxStore/reducers/RItemGroup";
import itemNameReducer from "./reduxStore/reducers/RItemName";
import itemUnitsReducer from "./reduxStore/reducers/RItemUnits";
import userMasterReducer from "./reduxStore/reducers/RAddUserMaster";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  department: departmentReducer,
  form: formReducer,
  prefix: prefixReducer,
  accountGroup: accountGroupReducer,
  accountName: accountNameReducer,
  itemName: itemNameReducer,
  itemGroup: itemGroupReducer,
  itemUnits: itemUnitsReducer,
  userMaster: userMasterReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
