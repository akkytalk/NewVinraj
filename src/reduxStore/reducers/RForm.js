import * as actionType from "../actions/actionType";

const initialState = {
  form: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FORM_SET_DATA:
      return {
        ...state,
        form: action.form,
        error: false,
        editing: false,
      };

    case actionType.FORM_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_FORM_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_FORM_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_FORM_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_FORM:
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
