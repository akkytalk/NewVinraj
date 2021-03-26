import * as ActionTypes from "./actionType";
import { baseUrl } from "../../shared/baseUrl";
import { addLogin, loginFailed, loginLoading } from "./LoginCreators";
//import { toast } from "react-toastify";

const myheader = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
});

export const postSignup = (data) => (dispatch) => {
  dispatch(loginLoading(true));
  console.log(data, myheader);
  return fetch(baseUrl + "register", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + " " + response.statusText
      );
      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((signup) => {
      console.log(signup);
      if (signup.error) {
        //  toast.error("UnAuthorized");
        dispatch(loginFailed(signup.error));
      } else {
        // toast.success("Signup Successfull!");
        dispatch(addLogin(signup));
      }
    })
    .catch((error) => {
      dispatch(loginFailed(error));
    });
};

// export const addSignup = (signup) => ({
//   type: ActionTypes.ADD_SIGNUP,
//   signup: signup,
// });

// export const signupLoading = () => ({
//   type: ActionTypes.SIGNUP_LOADING,
// });

// export const signupFailed = (errMess) => ({
//   type: ActionTypes.SIGNUP_FAILED,
//   payload: errMess,
// });

export const removeSignup = () => ({
  type: ActionTypes.REMOVE_SIGNUP,
  signup: [],
});
