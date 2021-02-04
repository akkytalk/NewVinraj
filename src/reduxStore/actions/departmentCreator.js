import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";

export const departmentSetData = (department) => {
  return {
    type: actionType.DEPARTMENT_SET_DATA,
    department: department,
  };
};

export const departmentFailData = () => {
  return {
    type: actionType.DEPARTMENT_FAIL_DATA,
  };
};

export const departmentGetData = () => {
  return (dispatch) => {
    axios
      .get("departments")
      .then((res) => {
        console.log(res.data, "res");
        dispatch(departmentSetData(res.data));
      })

      .catch((error) => dispatch(departmentFailData()));
  };
};

export const deleteDepartmentFail = () => {
  return {
    type: actionType.DELETE_DEPARTMENT_FAIL,
  };
};

export const deleteDepartment = (id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(`departments/${id}`)
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Department!").then(() => {
            window.location.reload();
          });
        })
        .catch((error) => dispatch(deleteDepartmentFail()));
    }
  };
};

export const postDepartmentDataStart = () => {
  return {
    type: actionType.POST_DEPARTMENT_DATA_START,
  };
};

export const postDepartmentDataFail = () => {
  return {
    type: actionType.POST_DEPARTMENT_DATA_FAIL,
  };
};

export const postDepartmentData = (user) => {
  return (dispatch) => {
    if (!user.name) return;

    dispatch(postDepartmentDataStart());
    axios
      .post("departments", user)
      .then(() => {
        console.log("swal");
        swal("Successfully Created Department!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => dispatch(postDepartmentDataFail()));
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editDepartmentRowStart = () => {
  return {
    type: actionType.EDIT_DEPARTMENT_ROW_START,
  };
};

export const failEditDepartment = () => {
  return {
    type: actionType.FAIL_EDIT_DEPARTMENT,
  };
};

export const editDepartmentRow = (
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editDepartmentRowStart());
    setEditing(true);
    axios
      .get(`departments/${id}`)
      .then((res) => {
        console.log(res.data, "editing data res");
        setEditing(res.data);
        setCurrentUser({
          id: res.data.id,
          name: res.data.name,
        });
      })
      .catch((error) => dispatch(failEditDepartment()));
  };
};

export const updateDepartmentDataStart = () => {
  return {
    type: actionType.UPDATE_DEPARTMENT_DATA_START,
  };
};

export const updateDepartmentData = (
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateDepartmentDataStart());
    setEditing(false);

    axios
      .put(`departments/${id}`, currentUser)
      .then(() => {
        console.log("swal");
        swal("Successfully Updated department!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
