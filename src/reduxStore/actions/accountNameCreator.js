import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const accountNameSetData = (accountName) => {
  return {
    type: actionType.ACCOUNT_NAME_SET_DATA,
    accountName: accountName,
  };
};

export const accountNameFailData = (error) => {
  return {
    type: actionType.ACCOUNT_NAME_FAIL_DATA,
    error: error,
  };
};

export const accountNameGetData = (data) => {
  return (dispatch) => {
    axios
      .get(baseUrl + "accounts", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(accountNameSetData(res.data));
      })

      .catch((error) => dispatch(accountNameFailData(error)));
  };
};

export const deleteAccountNameFail = (error) => {
  return {
    type: actionType.DELETE_ACCOUNT_NAME_FAIL,
    error: error,
  };
};

export const deleteAccountName = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `accounts/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted AccountName!").then(() => {
            window.location.reload();
          });
        })
        .catch((error) => dispatch(deleteAccountNameFail()));
    }
  };
};

export const postAccountNameDataStart = () => {
  return {
    type: actionType.POST_ACCOUNT_NAME_DATA_START,
  };
};

export const postAccountNameDataFail = (error) => {
  return {
    type: actionType.POST_ACCOUNT_NAME_DATA_FAIL,
    error: error,
  };
};

export const postAccountNameData = (data, user) => {
  return (dispatch) => {
    //if (!user.name) return;
    // console.log("data", data);
    console.log("user", user);
    dispatch(postAccountNameDataStart());
    axios
      .post(baseUrl + "accounts", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created AccountName!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => dispatch(postAccountNameDataFail(error)));
    // props.addUser(user);
    // setUser(initialAccountNameState);
  };
};

export const editAccountNameRowStart = () => {
  return {
    type: actionType.EDIT_ACCOUNT_NAME_ROW_START,
  };
};

export const failEditAccountName = (error) => {
  return {
    type: actionType.FAIL_EDIT_ACCOUNT_NAME,
    error: error,
  };
};

export const editAccountNameRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editAccountNameRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `accounts/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "editing data res");
        setEditing(res.data);
        setCurrentUser({
          id: res.data.id,
          name: res.data.name,
          account_group_id: res.data.account_group.id,
          group_name: res.data.account_group.name,
        });
      })
      .catch((error) => dispatch(failEditAccountName(error)));
  };
};

export const updateAccountNameDataStart = () => {
  return {
    type: actionType.UPDATE_ACCOUNT_NAME_DATA_START,
  };
};

export const updateAccountNameData = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateAccountNameDataStart());
    setEditing(false);

    axios
      .put(baseUrl + `accounts/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated accountName!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
