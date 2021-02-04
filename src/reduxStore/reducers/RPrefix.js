import * as actionType from "../actions/actionType";

const initialState = {
  prefix: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PREFIX_SET_DATA:
      return {
        ...state,
        prefix: action.prefix,
        error: false,
        editing: false,
      };

    case actionType.PREFIX_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_PREFIX_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_PREFIX_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_PREFIX_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_PREFIX:
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
