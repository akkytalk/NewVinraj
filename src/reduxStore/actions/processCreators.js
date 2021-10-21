import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const processSetData = (process) => {
  return {
    type: actionType.PROCESS_SET_DATA,
    process: process,
  };
};

export const processFailData = (error) => {
  return {
    type: actionType.PROCESS_FAIL_DATA,
    error: error,
  };
};

export const processLoading = () => {
  return {
    type: actionType.PROCESS_LOADING,
  };
};

export const processGetData = (data) => {
  return (dispatch) => {
    dispatch(processLoading());
    axios
      .get(baseUrl + "processes", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(processSetData(res.data));
      })

      .catch((error) => dispatch(processFailData(error)));
  };
};

export const deleteProcessFail = (error) => {
  return {
    type: actionType.DELETE_PROCESS_FAIL,
    error: error,
  };
};

export const deleteProcess = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `processes/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Process!").then(() => {
            dispatch(processGetData(data));
          });
        })
        .catch((error) => dispatch(deleteProcessFail()));
    }
  };
};

export const postProcessDataStart = () => {
  return {
    type: actionType.POST_PROCESS_DATA_START,
  };
};

export const postProcessDataFail = (error) => {
  return {
    type: actionType.POST_PROCESS_DATA_FAIL,
    error: error,
  };
};

export const processPostLoading = () => {
  return {
    type: actionType.PROCESS_POST_LOADING,
  };
};

export const postProcessData = (
  data,
  user,
  toggle,
  setSubmitting,
  setShowTable
) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postProcessDataStart());
    dispatch(processPostLoading());
    axios
      .post(baseUrl + "processes", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Process!").then(() => {
          dispatch(processGetData(data));
          // if (toggle) {
          //   toggle();
          // }
          if (setShowTable) {
            setShowTable(true);
          }
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(postProcessDataFail(error));
      });
  };
};

export const updateProcessDataStart = () => {
  return {
    type: actionType.UPDATE_PROCESS_DATA_START,
  };
};

export const processUpdateLoading = () => {
  return {
    type: actionType.PROCESS_UPDATE_LOADING,
  };
};
export const updateProcessData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateProcessDataStart());
    dispatch(processUpdateLoading());

    axios
      .put(baseUrl + `processes/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated process!").then(() => {
          dispatch(processGetData(data));
          if (toggle) {
            toggle();
          }
        });
      })
      .catch((error) => {
        console.log(error);
        if (setSubmitting) {
          setSubmitting(false);
        }
      });
  };
};
