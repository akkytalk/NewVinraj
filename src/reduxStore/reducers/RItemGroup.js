import * as actionType from "../actions/actionType";

const initialState = {
  itemGroup: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ITEM_GROUP_SET_DATA:
      return {
        ...state,
        itemGroup: action.itemGroup,
        error: false,
      };

    case actionType.ITEM_GROUP_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_ITEM_GROUP_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_ITEM_GROUP_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_ITEM_GROUP_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_ITEM_GROUP:
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
