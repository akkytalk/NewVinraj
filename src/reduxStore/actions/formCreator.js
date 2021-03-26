import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const formSetData = (form) => {
  return {
    type: actionType.FORM_SET_DATA,
    form: form,
  };
};

export const formFailData = (error) => {
  return {
    type: actionType.FORM_FAIL_DATA,
    error: error,
  };
};

export const formGetData = (data) => {
  return (dispatch) => {
    axios
      .get(baseUrl + "forms", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(formSetData(res.data));
      })

      .catch((error) => dispatch(formFailData(error)));
  };
};

export const deleteFormFail = (error) => {
  return {
    type: actionType.DELETE_FORM_FAIL,
    error: error,
  };
};

export const deleteForm = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `forms/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Form!").then(() => {
            window.location.reload();
          });
        })
        .catch((error) => dispatch(deleteFormFail()));
    }
  };
};

export const postFormDataStart = () => {
  return {
    type: actionType.POST_FORM_DATA_START,
  };
};

export const postFormDataFail = (error) => {
  return {
    type: actionType.POST_FORM_DATA_FAIL,
    error: error,
  };
};

export const postFormData = (data, user) => {
  return (dispatch) => {
    //if (!user.name) return;
    // console.log("data", data);
    console.log("user", user);
    dispatch(postFormDataStart());
    axios
      .post(baseUrl + "forms", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Form!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => dispatch(postFormDataFail(error)));
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editFormRowStart = () => {
  return {
    type: actionType.EDIT_FORM_ROW_START,
  };
};

export const failEditForm = (error) => {
  return {
    type: actionType.FAIL_EDIT_FORM,
    error: error,
  };
};

export const editFormRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editFormRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `forms/${id}`, {
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
          department_id: res.data.department_id,
        });
      })
      .catch((error) => dispatch(failEditForm(error)));
  };
};

export const updateFormDataStart = () => {
  return {
    type: actionType.UPDATE_FORM_DATA_START,
  };
};

export const updateFormData = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateFormDataStart());
    setEditing(false);

    axios
      .put(baseUrl + `forms/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated form!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
