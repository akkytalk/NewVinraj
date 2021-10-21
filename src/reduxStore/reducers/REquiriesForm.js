import * as actionType from "../actions/actionType";

const initialState = {
  enquiriesForm: [],
  postEnquiriesForm: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ENQUIRIES_FORM_SET_DATA:
      return {
        ...state,
        enquiriesForm: action.enquiriesForm,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.ENQUIRIES_FORM_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.ENQUIRIES_FORM_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.ENQUIRIES_FORM_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.ENQUIRIES_FORM_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_ENQUIRIES_FORM_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.ENQUIRIES_FORM_POST_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postEnquiriesForm: action.postEnquiriesForm,
      };
    case actionType.UPDATE_ENQUIRIES_FORM_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
