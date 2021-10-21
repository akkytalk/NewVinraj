import * as actionType from "../actions/actionType";

const initialState = {
  right: [],
  error: false,
  editright: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.RIGHT_SET_DATA:
      return {
        ...state,
        right: action.right,
        isLoading: false,
        error: false,
      };

    case actionType.RIGHT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.RIGHT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_RIGHT_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.RIGHT_EDIT_SET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        editright: action.editright,
      };
    case actionType.RIGHT_EDIT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        editright: [],
      };
    case actionType.UPDATE_RIGHT_DATA_START:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
