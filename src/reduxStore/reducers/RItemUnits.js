import * as actionType from "../actions/actionType";

const initialState = {
  itemUnits: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ITEM_UNITS_SET_DATA:
      return {
        ...state,
        itemUnits: action.itemUnits,
        error: false,
      };

    case actionType.ITEM_UNITS_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_ITEM_UNITS_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_ITEM_UNITS_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_ITEM_UNITS_DATA_START:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
