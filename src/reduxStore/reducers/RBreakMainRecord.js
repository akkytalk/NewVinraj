import * as actionType from "../actions/actionType";

const initialState = {
  breakMainRecord: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.BREAK_MAIN_RECORD_SET_DATA:
      return {
        ...state,
        breakMainRecord: action.breakMainRecord,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.BREAK_MAIN_RECORD_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.BREAK_MAIN_RECORD_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.BREAK_MAIN_RECORD_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.BREAK_MAIN_RECORD_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_BREAK_MAIN_RECORD_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.UPDATE_BREAK_MAIN_RECORD_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
