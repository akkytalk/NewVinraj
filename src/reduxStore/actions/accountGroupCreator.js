import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";

export const accountGroupSetData = (accountGroup) => {
  return {
    type: actionType.ACCOUNT_GROUP_SET_DATA,
    accountGroup: accountGroup,
  };
};

export const accountGroupFailData = () => {
  return {
    type: actionType.ACCOUNT_GROUP_FAIL_DATA,
  };
};

export const accountGroupGetData = () => {
  return (dispatch) => {
    axios
      .get("accountGroups")
      .then((res) => {
        console.log(res.data, "res");
        dispatch(accountGroupSetData(res.data));
      })

      .catch((error) => dispatch(accountGroupFailData()));
  };
};

export const deleteAccountGroupFail = () => {
  return {
    type: actionType.DELETE_ACCOUNT_GROUP_FAIL,
  };
};

export const deleteAccountGroup = (id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(`accountGroups/${id}`)
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Account Group!").then(() => {
            window.location.reload();
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

export const postAccountGroupDataFail = () => {
  return {
    type: actionType.POST_ACCOUNT_GROUP_DATA_FAIL,
  };
};

export const postAccountGroupData = (user) => {
  return (dispatch) => {
    if (!user.name) return;

    dispatch(postAccountGroupDataStart());
    axios
      .post("accountGroups", user)
      .then(() => {
        console.log("swal");
        swal("Successfully Created Account Group!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => dispatch(postAccountGroupDataFail()));
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editAccountGroupRowStart = () => {
  return {
    type: actionType.EDIT_ACCOUNT_GROUP_ROW_START,
  };
};

export const failEditAccountGroup = () => {
  return {
    type: actionType.FAIL_EDIT_ACCOUNT_GROUP,
  };
};

export const editAccountGroupRow = (
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
      .get(`accountGroups/${id}`)
      .then((res) => {
        console.log(res.data, "editing data res");
        setEditing(res.data);
        setCurrentUser({
          id: res.data.id,
          name: res.data.name,
          under_group_name: res.data.under_group_name,
        });
      })
      .catch((error) => dispatch(failEditAccountGroup()));
  };
};

export const updateAccountGroupDataStart = () => {
  return {
    type: actionType.UPDATE_ACCOUNT_GROUP_DATA_START,
  };
};

export const updateAccountGroupData = (
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
      .put(`accountGroups/${id}`, currentUser)
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Account Group!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
