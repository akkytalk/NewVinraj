import * as actionType from "../actions/actionType";

const initialState = {
  process: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PROCESS_SET_DATA:
      return {
        ...state,
        process: action.process,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.PROCESS_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.PROCESS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.PROCESS_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.PROCESS_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_PROCESS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.UPDATE_PROCESS_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
