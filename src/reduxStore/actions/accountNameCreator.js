import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";

export const accountNameSetData = (accountName) => {
  return {
    type: actionType.ACCOUNT_NAME_SET_DATA,
    accountName: accountName,
  };
};

export const accountNameFailData = () => {
  return {
    type: actionType.ACCOUNT_NAME_FAIL_DATA,
  };
};

export const accountNameGetData = () => {
  return (dispatch) => {
    axios
      .get("accounts")
      .then((res) => {
        console.log(res.data, "res");
        dispatch(accountNameSetData(res.data));
      })

      .catch((error) => dispatch(accountNameFailData()));
  };
};

export const deleteAccountNameFail = () => {
  return {
    type: actionType.DELETE_ACCOUNT_NAME_FAIL,
  };
};

export const deleteAccountName = (id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(`accounts/${id}`)
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Account Name!").then(() => {
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

export const postAccountNameDataFail = () => {
  return {
    type: actionType.POST_ACCOUNT_NAME_DATA_FAIL,
  };
};

export const postAccountNameData = (user) => {
  return (dispatch) => {
    if (!user.name) return;

    dispatch(postAccountNameDataStart());
    axios
      .post("accounts", user)
      .then(() => {
        console.log("swal");
        swal("Successfully Created Account Name!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => dispatch(postAccountNameDataFail()));
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editAccountNameRowStart = () => {
  return {
    type: actionType.EDIT_ACCOUNT_NAME_ROW_START,
  };
};

export const failEditAccountName = () => {
  return {
    type: actionType.FAIL_EDIT_ACCOUNT_NAME,
  };
};

export const editAccountNameRow = (
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
      .get(`accounts/${id}`)
      .then((res) => {
        // console.log(res.data, "editing data res");
        setEditing(res.data);
        setCurrentUser({
          id: res.data.id,
          name: res.data.name,
          account_group_id: res.data.account_group.id,
          group_name: res.data.account_group.name,
        });
      })
      .catch((error) => dispatch(failEditAccountName()));
  };
};

export const updateAccountNameDataStart = () => {
  return {
    type: actionType.UPDATE_ACCOUNT_NAME_DATA_START,
  };
};

export const updateAccountNameData = (
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
      .put(`accounts/${id}`, currentUser)
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Account Name!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
