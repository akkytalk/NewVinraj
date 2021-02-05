import * as actionType from "../actions/actionType";

const initialState = {
  accountGroup: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ACCOUNT_GROUP_SET_DATA:
      return {
        ...state,
        accountGroup: action.accountGroup,
        error: false,
      };

    case actionType.ACCOUNT_GROUP_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_ACCOUNT_GROUP_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_ACCOUNT_GROUP_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_ACCOUNT_GROUP_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_ACCOUNT_GROUP:
      return {
        ...state,
        editing: true,
        currentUser: [
          {
            id: action.id,
            name: action.name,
          },
        ],
      };
    default:
      return state;
  }
};

export default reducer;
