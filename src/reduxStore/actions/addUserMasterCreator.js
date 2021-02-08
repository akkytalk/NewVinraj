import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";

export const userMasterSetData = (userMaster) => {
  return {
    type: actionType.USER_MASTER_SET_DATA,
    userMaster: userMaster,
  };
};

export const userMasterFailData = () => {
  return {
    type: actionType.USER_MASTER_FAIL_DATA,
  };
};

export const userMasterGetData = () => {
  return (dispatch) => {
    axios
      .get("users")
      .then((res) => {
        console.log(res.data, "userMaster res");
        dispatch(userMasterSetData(res.data));
      })

      .catch((error) => dispatch(userMasterFailData()));
  };
};

export const deleteUserMasterFail = () => {
  return {
    type: actionType.DELETE_USER_MASTER_FAIL,
  };
};

export const deleteUserMaster = (id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(`users/${id}`)
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted UserMaster!").then(() => {
            window.location.reload();
          });
        })
        .catch((error) => dispatch(deleteUserMasterFail()));
    }
  };
};

export const postUserMasterDataStart = () => {
  return {
    type: actionType.POST_USER_MASTER_DATA_START,
  };
};

export const postUserMasterDataFail = () => {
  return {
    type: actionType.POST_USER_MASTER_DATA_FAIL,
  };
};

export const postUserMasterData = (user) => {
  return (dispatch) => {
    if (!user.name || !user.email || !user.password) return;

    dispatch(postUserMasterDataStart());

    axios
      .post("users", user)
      .then(() => {
        console.log("swal");
        swal("Successfully Created UserMaster!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => dispatch(postUserMasterDataFail()));
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editUserMasterRowStart = () => {
  return {
    type: actionType.EDIT_USER_MASTER_ROW_START,
  };
};

export const failEditUserMaster = () => {
  return {
    type: actionType.FAIL_EDIT_USER_MASTER,
  };
};

export const editUserMasterRow = (
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editUserMasterRowStart());
    setEditing(true);
    axios
      .get(`users/${id}`)
      .then((res) => {
        console.log(res.data, "editing data res");
        setEditing(res.data);
        setCurrentUser({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          password: res.data.password,
          address: res.data.address,
          phone: res.data.phone,
          city: res.data.city,
          state: res.data.state,
          pincode: res.data.pincode,
        });
      })
      .catch((error) => dispatch(failEditUserMaster()));
  };
};

export const updateUserMasterDataStart = () => {
  return {
    type: actionType.UPDATE_USER_MASTER_DATA_START,
  };
};

export const updateUserMasterData = (
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateUserMasterDataStart());
    setEditing(false);

    axios
      .put(`users/${id}`, currentUser)
      .then(() => {
        console.log("swal");
        swal("Successfully Updated UserMaster!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
