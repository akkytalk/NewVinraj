import * as ActionTypes from "../actions/actionType";

const Login = (
  state = { isLoading: false, errMess: null, login: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_LOGIN:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        login: action.login,
      };

    case ActionTypes.LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        login: [],
      };

    case ActionTypes.REMOVE_LOGIN:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        login: [],
      };

    default:
      return state;
  }
};

export default Login;
