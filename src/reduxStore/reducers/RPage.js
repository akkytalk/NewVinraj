import * as actionType from "../actions/actionType";

const initialState = {
  page: [],
  error: false,
  editpage: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PAGE_SET_DATA:
      return {
        ...state,
        page: action.page,
        isLoading: false,
        error: false,
      };

    case actionType.PAGE_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.PAGE_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_PAGE_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.PAGE_EDIT_SET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        editpage: action.editpage,
      };
    case actionType.PAGE_EDIT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        editpage: [],
      };
    case actionType.UPDATE_PAGE_DATA_START:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
