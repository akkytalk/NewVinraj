import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import Login from "./reducers/login";
import accountGroupReducer from "./reducers/RAccountGroup";
import departmentReducer from "./reducers/RDepartment";
import formReducer from "./reducers/RForm";
import prefixReducer from "./reducers/RPrefix";

import accountNameReducer from "./reducers/RAccountName";
import itemGroupReducer from "./reducers/RItemGroup";
import itemNameReducer from "./reducers/RItemName";
import itemUnitsReducer from "./reducers/RItemUnits";
import userMasterReducer from "./reducers/RAddUserMaster";

const config = {
  key: "root",
  storage,
  debug: true,
};

export const configureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      login: Login,
      department: departmentReducer,
      form: formReducer,
      prefix: prefixReducer,
      accountGroup: accountGroupReducer,
      accountName: accountNameReducer,
      itemName: itemNameReducer,
      itemGroup: itemGroupReducer,
      itemUnits: itemUnitsReducer,
      userMaster: userMasterReducer,
    }),
    applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
