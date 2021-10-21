import * as actionType from "./actionType";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const rightSetData = (right) => {
  return {
    type: actionType.RIGHT_SET_DATA,
    right: right,
  };
};

export const rightFailData = (error) => {
  return {
    type: actionType.RIGHT_FAIL_DATA,
    error: error,
  };
};
export const rightLoading = () => {
  return {
    type: actionType.RIGHT_LOADING,
  };
};
export const rightGetData = (data) => {
  return (dispatch) => {
    dispatch(rightLoading());
    axios
      .get(baseUrl + "rights", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(rightSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(rightFailData(error)));
  };
};

export const rightEditSetData = (editcase) => {
  return {
    type: actionType.RIGHT_EDIT_SET_DATA,
    editcase: editcase,
  };
};

export const rightEditFailData = (error) => {
  return {
    type: actionType.RIGHT_EDIT_FAIL_DATA,
    error: error,
  };
};

export const rightEditGetData = (data) => {
  return (dispatch) => {
    dispatch(rightLoading());
    axios
      .get(baseUrl + `rights/${data?.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(rightEditSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(rightEditFailData(error)));
  };
};

export const deleteRightFail = (error) => {
  return {
    type: actionType.DELETE_RIGHT_FAIL,
    error: error,
  };
};

export const deleteRight = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `rights/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Right!").then(() => {
            dispatch(rightGetData(data));
          });
        })
        .catch((error) => dispatch(deleteRightFail(error)));
    }
  };
};

export const postRightDataStart = () => {
  return {
    type: actionType.POST_RIGHT_DATA_START,
  };
};

export const postRightDataFail = (error) => {
  return {
    type: actionType.POST_RIGHT_DATA_FAIL,
    error: error,
  };
};

export const postRightData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postRightDataStart());

    axios
      .post(baseUrl + "rights", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Right!").then(() => {
          dispatch(rightGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postRightDataFail(error));
      });
  };
};

export const updateRightDataStart = () => {
  return {
    type: actionType.UPDATE_RIGHT_DATA_START,
  };
};

export const updateRightData = (data, user, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateRightDataStart());

    axios
      .put(baseUrl + `rights/${user.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Right!").then(() => {
          dispatch(rightGetData(data));
          // window.location.reload();
          if (setSubmitting) {
            setSubmitting(false);
          }
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        console.log(error);
      });
  };
};
