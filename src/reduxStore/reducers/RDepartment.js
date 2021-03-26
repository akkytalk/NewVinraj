import * as actionType from "../actions/actionType";

const initialState = {
  isLoading: false,
  department: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.DEPARTMENT_SET_DATA:
      return {
        ...state,
        isLoading: false,
        department: action.department,
        error: false,
      };
    case actionType.DEPARTMENT_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case actionType.DEPARTMENT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionType.POST_DEPARTMENT_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionType.EDIT_DEPARTMENT_ROW_START:
      return {
        ...state,
        isLoading: false,
      };

    case actionType.UPDATE_DEPARTMENT_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_DEPARTMENT:
      return {
        ...state,
        editing: action.error,
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
