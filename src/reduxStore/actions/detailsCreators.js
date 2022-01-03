import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";
import { formGetData } from ".";

export const detailsSetData = (details) => {
  return {
    type: actionType.DETAILS_SET_DATA,
    details: details,
  };
};

export const detailsFailData = (error) => {
  return {
    type: actionType.DETAILS_FAIL_DATA,
    error: error,
  };
};

export const detailsLoading = () => {
  return {
    type: actionType.DETAILS_LOADING,
  };
};

export const detailsGetData = (data) => {
  return (dispatch) => {
    dispatch(detailsLoading());
    axios
      .get(baseUrl + "requistions", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(detailsSetData(res.data));
      })

      .catch((error) => dispatch(detailsFailData(error)));
  };
};

export const deleteDetailsFail = (error) => {
  return {
    type: actionType.DELETE_DETAILS_FAIL,
    error: error,
  };
};

export const deleteDetails = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `requistions/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted requistions!").then(() => {
            dispatch(detailsGetData(data));
          });
        })
        .catch((error) => dispatch(deleteDetailsFail()));
    }
  };
};

export const postDetailsDataStart = () => {
  return {
    type: actionType.POST_DETAILS_DATA_START,
  };
};

export const postDetailsDataFail = (error) => {
  return {
    type: actionType.POST_DETAILS_DATA_FAIL,
    error: error,
  };
};

export const detailsPostLoading = () => {
  return {
    type: actionType.DETAILS_POST_LOADING,
  };
};

export const detailsPostSuccess = (postDetails) => {
  return {
    type: actionType.DETAILS_POST_SUCCESS,
    postDetails: postDetails,
  };
};

export const postDetailsData = (
  data,
  user,
  toggle,
  setSubmitting,
  setShowTable
) => {
  return (dispatch) => {
    dispatch(postDetailsDataStart());
    dispatch(detailsPostLoading());
    axios
      .post(baseUrl + "requistions", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log("swal");
        console.log("res", res.data);
        swal("Successfully Created requistions!").then(() => {
          dispatch(detailsGetData(data));
          // dispatch(formGetData(data));
          dispatch(detailsPostSuccess(res.data));
          // if (toggle) {
          //   toggle();
          // }
          if (setSubmitting) {
            setSubmitting(false);
          }
          if (setShowTable) {
            setShowTable(true);
          }
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(postDetailsDataFail(error));
      });
  };
};

export const postEnquiriesData = (
  data,
  user,
  toggle,
  setSubmitting,
  setShowTable
) => {
  return (dispatch) => {
    dispatch(postDetailsDataStart());
    dispatch(detailsPostLoading());
    axios
      .post(baseUrl + "enquires", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log("swal");
        console.log("res", res.data);
        swal("Successfully Created Details!").then(() => {
          // dispatch(detailsGetData(data));
          dispatch(formGetData(data));
          dispatch(detailsPostSuccess(res.data));
          // if (toggle) {
          //   toggle();
          // }
          if (setSubmitting) {
            setSubmitting(false);
          }
          if (setShowTable) {
            setShowTable(true);
          }
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(postDetailsDataFail(error));
      });
  };
};

export const updateDetailsDataStart = () => {
  return {
    type: actionType.UPDATE_DETAILS_DATA_START,
  };
};

export const detailsUpdateLoading = () => {
  return {
    type: actionType.DETAILS_UPDATE_LOADING,
  };
};
export const updateDetailsData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateDetailsDataStart());
    dispatch(detailsUpdateLoading());

    axios
      .put(baseUrl + `requistions/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated requistions!").then(() => {
          dispatch(detailsGetData(data));
          if (toggle) {
            toggle();
          }
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
