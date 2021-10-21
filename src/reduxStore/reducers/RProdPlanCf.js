import * as actionType from "../actions/actionType";

const initialState = {
  prodPlanCf: [],
  postProdPlanCf: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PROD_PLAN_CF_SET_DATA:
      return {
        ...state,
        prodPlanCf: action.prodPlanCf,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.PROD_PLAN_CF_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.PROD_PLAN_CF_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.PROD_PLAN_CF_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.PROD_PLAN_CF_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_PROD_PLAN_CF_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.PROD_PLAN_CF_POST_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postProdPlanCf: action.postProdPlanCf,
      };
    case actionType.UPDATE_PROD_PLAN_CF_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
