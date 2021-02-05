import * as actionType from "../actions/actionType";

const initialState = {
  accountName: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ACCOUNT_NAME_SET_DATA:
      return {
        ...state,
        accountName: action.accountName,
        error: false,
      };

    case actionType.ACCOUNT_NAME_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_ACCOUNT_NAME_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_ACCOUNT_NAME_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_ACCOUNT_NAME_DATA_START:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
