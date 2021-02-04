import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";

export const formSetData = (form) => {
  return {
    type: actionType.FORM_SET_DATA,
    form: form,
  };
};

export const formFailData = () => {
  return {
    type: actionType.FORM_FAIL_DATA,
  };
};

export const formGetData = () => {
  return (dispatch) => {
    axios
      .get("forms")
      .then((res) => {
        console.log(res.data, "res");
        dispatch(formSetData(res.data));
      })

      .catch((error) => dispatch(formFailData()));
  };
};

export const deleteFormFail = () => {
  return {
    type: actionType.DELETE_FORM_FAIL,
  };
};

export const deleteForm = (id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(`forms/${id}`)
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Form Name!").then(() => {
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

export const postFormDataFail = () => {
  return {
    type: actionType.POST_FORM_DATA_FAIL,
  };
};

export const postFormData = (user) => {
  return (dispatch) => {
    if (!user.name) return;

    dispatch(postFormDataStart());
    axios
      .post("forms", user)
      .then(() => {
        console.log("swal");
        swal("Successfully Created Form Name!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => dispatch(postFormDataFail()));
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editFormRowStart = () => {
  return {
    type: actionType.EDIT_FORM_ROW_START,
  };
};

export const failEditForm = () => {
  return {
    type: actionType.FAIL_EDIT_FORM,
  };
};

export const editFormRow = (
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
      .get(`forms/${id}`)
      .then((res) => {
        console.log(res.data, "editing data res");
        setEditing(res.data);
        setCurrentUser({
          id: res.data.id,
          department_id: res.data.department.id,
          department_name: res.data.department.name,
          name: res.data.name,
        });
      })
      .catch((error) => dispatch(failEditForm()));
  };
};

export const updateFormDataStart = () => {
  return {
    type: actionType.UPDATE_FORM_DATA_START,
  };
};

export const updateFormData = (
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
      .put(`forms/${id}`, currentUser)
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Form Name!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
