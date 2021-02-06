import * as actionType from "../actions/actionType";

const initialState = {
  userMaster: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_MASTER_SET_DATA:
      return {
        ...state,
        userMaster: action.userMaster,
        error: false,
        editing: false,
      };

    case actionType.USER_MASTER_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_USER_MASTER_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_USER_MASTER_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_USER_MASTER_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_USER_MASTER:
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
