import * as actionType from "../actions/actionType";

const initialState = {
  department: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.DEPARTMENT_SET_DATA:
      return {
        ...state,
        department: action.department,
        error: false,
        editing: false,
      };

    case actionType.DEPARTMENT_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_DEPARTMENT_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_DEPARTMENT_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_DEPARTMENT_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_DEPARTMENT:
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
