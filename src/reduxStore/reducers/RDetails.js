import * as actionType from "../actions/actionType";

const initialState = {
  details: [],
  postDetails: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.DETAILS_SET_DATA:
      return {
        ...state,
        details: action.details,
        error: false,
        editing: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.DETAILS_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.DETAILS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.DETAILS_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.DETAILS_POST_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postDetails: action.postDetails,
      };
    case actionType.DETAILS_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_DETAILS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.UPDATE_DETAILS_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
