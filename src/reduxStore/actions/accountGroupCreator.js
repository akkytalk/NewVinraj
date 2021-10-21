import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const accountGroupSetData = (accountGroup) => {
  return {
    type: actionType.ACCOUNT_GROUP_SET_DATA,
    accountGroup: accountGroup,
  };
};

export const accountGroupFailData = (error) => {
  return {
    type: actionType.ACCOUNT_GROUP_FAIL_DATA,
    error: error,
  };
};

export const accountGroupGetData = (data) => {
  return (dispatch) => {
    axios
      .get(baseUrl + "accountGroups", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(accountGroupSetData(res.data));
      })

      .catch((error) => dispatch(accountGroupFailData(error)));
  };
};

export const deleteAccountGroupFail = (error) => {
  return {
    type: actionType.DELETE_ACCOUNT_GROUP_FAIL,
    error: error,
  };
};

export const deleteAccountGroup = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `accountGroups/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted AccountGroup!").then(() => {
            dispatch(accountGroupGetData(data));
          });
        })
        .catch((error) => dispatch(deleteAccountGroupFail()));
    }
  };
};

export const postAccountGroupDataStart = () => {
  return {
    type: actionType.POST_ACCOUNT_GROUP_DATA_START,
  };
};

export const postAccountGroupDataFail = (error) => {
  return {
    type: actionType.POST_ACCOUNT_GROUP_DATA_FAIL,
    error: error,
  };
};

export const postAccountGroupData = (data, user) => {
  return (dispatch) => {
    //if (!user.name) return;
    // console.log("data", data);
    console.log("user", user);
    dispatch(postAccountGroupDataStart());
    axios
      .post(baseUrl + "accountGroups", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created AccountGroup!").then(() => {
          dispatch(accountGroupGetData(data));
        });
      })
      .catch((error) => dispatch(postAccountGroupDataFail(error)));
  };
};

export const editAccountGroupRowStart = () => {
  return {
    type: actionType.EDIT_ACCOUNT_GROUP_ROW_START,
  };
};

export const failEditAccountGroup = (error) => {
  return {
    type: actionType.FAIL_EDIT_ACCOUNT_GROUP,
    error: error,
  };
};

export const editAccountGroupRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editAccountGroupRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `accountGroups/${id}`, {
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
          under_group_name: res.data.under_group_name,
        });
      })
      .catch((error) => dispatch(failEditAccountGroup(error)));
  };
};

export const updateAccountGroupDataStart = () => {
  return {
    type: actionType.UPDATE_ACCOUNT_GROUP_DATA_START,
  };
};

export const updateAccountGroupData = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateAccountGroupDataStart());
    setEditing(false);

    axios
      .put(baseUrl + `accountGroups/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated accountGroup!").then(() => {
          dispatch(accountGroupGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
