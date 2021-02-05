import * as actionType from "../actions/actionType";

const initialState = {
  itemName: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ITEM_NAME_SET_DATA:
      return {
        ...state,
        itemName: action.itemName,
        error: false,
      };

    case actionType.ITEM_NAME_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_ITEM_NAME_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_ITEM_NAME_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_ITEM_NAME_DATA_START:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
