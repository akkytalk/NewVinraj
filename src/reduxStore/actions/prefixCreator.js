import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const prefixSetData = (prefix) => {
  return {
    type: actionType.PREFIX_SET_DATA,
    prefix: prefix,
  };
};

export const prefixFailData = (error) => {
  return {
    type: actionType.PREFIX_FAIL_DATA,
    error: error,
  };
};

export const prefixGetData = (data) => {
  return (dispatch) => {
    axios
      .get(baseUrl + "prefixs", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(prefixSetData(res.data));
      })

      .catch((error) => dispatch(prefixFailData(error)));
  };
};

export const deletePrefixFail = (error) => {
  return {
    type: actionType.DELETE_PREFIX_FAIL,
    error: error,
  };
};

export const deletePrefix = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `prefixs/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Prefix!").then(() => {
            window.location.reload();
          });
        })
        .catch((error) => dispatch(deletePrefixFail()));
    }
  };
};

export const postPrefixDataStart = () => {
  return {
    type: actionType.POST_PREFIX_DATA_START,
  };
};

export const postPrefixDataFail = (error) => {
  return {
    type: actionType.POST_PREFIX_DATA_FAIL,
    error: error,
  };
};

export const postPrefixData = (data, user) => {
  return (dispatch) => {
    //if (!user.name) return;
    // console.log("data", data);
    console.log("user", user);
    dispatch(postPrefixDataStart());
    axios
      .post(baseUrl + "prefixs", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Prefix!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => dispatch(postPrefixDataFail(error)));
    // props.addUser(user);
    // setUser(initialPrefixState);
  };
};

export const editPrefixRowStart = () => {
  return {
    type: actionType.EDIT_PREFIX_ROW_START,
  };
};

export const failEditPrefix = (error) => {
  return {
    type: actionType.FAIL_EDIT_PREFIX,
    error: error,
  };
};

export const editPrefixRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editPrefixRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `prefixs/${id}`, {
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
          form_id: res.data.form_id,
          form_name: res.data.form.name,
          department_id: res.data.department_id,
          department_name: res.data.department.name,
          prefix: res.data.prefix,
        });
      })
      .catch((error) => dispatch(failEditPrefix(error)));
  };
};

export const updatePrefixDataStart = () => {
  return {
    type: actionType.UPDATE_PREFIX_DATA_START,
  };
};

export const updatePrefixData = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updatePrefixDataStart());
    setEditing(false);

    axios
      .put(baseUrl + `prefixs/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated prefix!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
