import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const userMasterSetData = (userMaster) => {
  return {
    type: actionType.USER_MASTER_SET_DATA,
    userMaster: userMaster,
  };
};

export const userMasterFailData = (error) => {
  return {
    type: actionType.USER_MASTER_FAIL_DATA,
    error: error,
  };
};

export const userMasterGetData = (data) => {
  return (dispatch) => {
    axios
      .get(baseUrl + "users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(userMasterSetData(res.data));
      })

      .catch((error) => dispatch(userMasterFailData(error)));
  };
};

export const deleteUserMasterFail = (error) => {
  return {
    type: actionType.DELETE_USER_MASTER_FAIL,
    error: error,
  };
};

export const deleteUserMaster = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `users/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted User!").then(() => {
            dispatch(userMasterGetData(data));
          });
        })
        .catch((error) => dispatch(deleteUserMasterFail(error)));
    }
  };
};

export const postUserMasterDataStart = () => {
  return {
    type: actionType.POST_USER_MASTER_DATA_START,
  };
};

export const postUserMasterDataFail = (error) => {
  return {
    type: actionType.POST_USER_MASTER_DATA_FAIL,
    error: error,
  };
};

export const postUserMasterData = (data, user) => {
  return (dispatch) => {
    //if (!userMaster.name) return;
    // console.log("data", data);
    console.log("userMaster", user);
    dispatch(postUserMasterDataStart());
    axios
      .post(baseUrl + "users", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created User!").then(() => {
          dispatch(userMasterGetData(data));
        });
      })
      .catch((error) => dispatch(postUserMasterDataFail(error)));
    // props.addUserMasterMaster(userMaster);
    // setUserMaster(initialUserMasterState);
  };
};

export const editUserMasterRowStart = () => {
  return {
    type: actionType.EDIT_USER_MASTER_ROW_START,
  };
};

export const failEditUserMaster = (error) => {
  return {
    type: actionType.FAIL_EDIT_USER_MASTER,
    error: error,
  };
};

export const editUserMasterRow = (
  data,
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
      .get(baseUrl + `users/${id}`, {
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
          email: res.data.email,
          password: res.data.password,
          address: res.data.address,
          phone: res.data.phone,
          city: res.data.city,
          state: res.data.state,
          pincode: res.data.pincode,
        });
      })
      .catch((error) => dispatch(failEditUserMaster(error)));
  };
};

export const updateUserMasterDataStart = () => {
  return {
    type: actionType.UPDATE_USER_MASTER_DATA_START,
  };
};

export const updateUserMasterData = (
  data,
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
      .put(baseUrl + `users/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated user!").then(() => {
          dispatch(userMasterGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
