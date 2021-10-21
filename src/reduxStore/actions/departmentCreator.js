import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const departmentSetData = (department) => {
  return {
    type: actionType.DEPARTMENT_SET_DATA,
    department: department,
  };
};

export const departmentFailData = (error) => {
  return {
    type: actionType.DEPARTMENT_FAIL_DATA,
    error: error,
  };
};

export const departmentGetData = (data) => {
  return (dispatch) => {
    dispatch(departmentLoading(true));
    axios
      .get(baseUrl + "departments", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(departmentSetData(res.data));
      })

      .catch((error) => dispatch(departmentFailData(error)));
  };
};

export const deleteDepartmentFail = (error) => {
  return {
    type: actionType.DELETE_DEPARTMENT_FAIL,
    error: error,
  };
};

export const deleteDepartment = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `departments/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Department!").then(() => {
            dispatch(departmentGetData(data));
          });
        })
        .catch((error) => dispatch(deleteDepartmentFail(error)));
    }
  };
};

export const postDepartmentDataStart = () => {
  return {
    type: actionType.POST_DEPARTMENT_DATA_START,
  };
};

export const postDepartmentDataFail = (error) => {
  return {
    type: actionType.POST_DEPARTMENT_DATA_FAIL,
    error: error,
  };
};

export const departmentLoading = () => ({
  type: actionType.DEPARTMENT_LOADING,
});

export const postDepartmentData = (data, user, setSubmit) => {
  return (dispatch) => {
    if (!user.name) return;
    console.log("data department", data);
    dispatch(postDepartmentDataStart());
    axios
      .post(baseUrl + "departments", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Department!").then(() => {
          dispatch(departmentGetData(data));
          if (setSubmit) {
            setSubmit(false);
          }
        });
      })
      .catch((error) => {
        dispatch(postDepartmentDataFail(error));
        if (setSubmit) {
          setSubmit(false);
        }
      });
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editDepartmentRowStart = () => {
  return {
    type: actionType.EDIT_DEPARTMENT_ROW_START,
  };
};

export const failEditDepartment = (error) => {
  return {
    type: actionType.FAIL_EDIT_DEPARTMENT,
    error: error,
  };
};

export const editDepartmentRow = (
  data,
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
      .get(baseUrl + `departments/${id}`, {
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
  data,
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
      .put(baseUrl + `departments/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated department!").then(() => {
          dispatch(departmentGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
