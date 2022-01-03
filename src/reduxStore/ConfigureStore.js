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
import RRight from "./reducers/RRights";
import RPage from "./reducers/RPage";
import RDetails from "./reducers/RDetails";
import RProcess from "./reducers/RProcess";
import RBreakMainRecord from "./reducers/RBreakMainRecord";
import REnquiriesForm from "./reducers/REquiriesForm";
import RProdPlanCf from "./reducers/RProdPlanCf";

const config = {
  key: "vinraj",
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
      right: RRight,
      page: RPage,
      details: RDetails,
      process: RProcess,
      breakMainRecord: RBreakMainRecord,
      enquiriesForm: REnquiriesForm,
      prodPlanCf: RProdPlanCf,
    }),
    applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
