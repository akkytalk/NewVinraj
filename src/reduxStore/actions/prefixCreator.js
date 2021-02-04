import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";

export const prefixSetData = (prefix) => {
  return {
    type: actionType.PREFIX_SET_DATA,
    prefix: prefix,
  };
};

export const prefixFailData = () => {
  return {
    type: actionType.PREFIX_FAIL_DATA,
  };
};

export const prefixGetData = () => {
  return (dispatch) => {
    axios
      .get("prefixs")
      .then((res) => {
        console.log(res.data, "prefix res");
        dispatch(prefixSetData(res.data));
      })

      .catch((error) => dispatch(prefixFailData()));
  };
};

export const deletePrefixFail = () => {
  return {
    type: actionType.DELETE_PREFIX_FAIL,
  };
};

export const deletePrefix = (id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(`prefixs/${id}`)
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

export const postPrefixDataFail = () => {
  return {
    type: actionType.POST_PREFIX_DATA_FAIL,
  };
};

export const postPrefixData = (user) => {
  return (dispatch) => {
    if (!user.form_id || !user.department_id || !user.prefix) return;

    dispatch(postPrefixDataStart());

    axios
      .post("prefixs", user)
      .then(() => {
        console.log("swal");
        swal("Successfully Created Prefix!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => dispatch(postPrefixDataFail()));
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editPrefixRowStart = () => {
  return {
    type: actionType.EDIT_PREFIX_ROW_START,
  };
};

export const failEditPrefix = () => {
  return {
    type: actionType.FAIL_EDIT_PREFIX,
  };
};

export const editPrefixRow = (
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
      .get(`prefixs/${id}`)
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
      .catch((error) => dispatch(failEditPrefix()));
  };
};

export const updatePrefixDataStart = () => {
  return {
    type: actionType.UPDATE_PREFIX_DATA_START,
  };
};

export const updatePrefixData = (
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
      .put(`prefixs/${id}`, currentUser)
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Prefix!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
