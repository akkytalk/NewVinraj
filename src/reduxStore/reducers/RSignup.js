import * as ActionTypes from "../actions/actionTypes";

const Signup = (
  state = { isLoading: false, errMess: null, signup: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_SIGNUP:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        signup: action.signup,
      };

    case ActionTypes.SIGNUP_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.SIGNUP_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        signup: [],
      };

    case ActionTypes.REMOVE_SIGNUP:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        signup: [],
      };

    default:
      return state;
  }
};

export default Signup;
