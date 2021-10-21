import * as actionType from "../actions/actionType";

const initialState = {
  prefix: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PREFIX_SET_DATA:
      return {
        ...state,
        prefix: action.prefix,
        error: false,
        editing: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.PREFIX_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.PREFIX_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.PREFIX_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.PREFIX_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_PREFIX_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.EDIT_PREFIX_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_PREFIX_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
