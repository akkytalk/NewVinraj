import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const enquiriesFormSetData = (enquiriesForm) => {
  return {
    type: actionType.ENQUIRIES_FORM_SET_DATA,
    enquiriesForm: enquiriesForm,
  };
};

export const enquiriesFormFailData = (error) => {
  return {
    type: actionType.ENQUIRIES_FORM_FAIL_DATA,
    error: error,
  };
};

export const enquiriesFormLoading = () => {
  return {
    type: actionType.ENQUIRIES_FORM_LOADING,
  };
};

export const enquiriesFormGetData = (data) => {
  return (dispatch) => {
    dispatch(enquiriesFormLoading());
    axios
      .get(baseUrl + "enquires", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(enquiriesFormSetData(res.data));
      })

      .catch((error) => dispatch(enquiriesFormFailData(error)));
  };
};

export const deleteEnquiriesFormFail = (error) => {
  return {
    type: actionType.DELETE_ENQUIRIES_FORM_FAIL,
    error: error,
  };
};

export const deleteEnquiriesForm = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `enquires/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted EnquiriesForm!").then(() => {
            dispatch(enquiriesFormGetData(data));
          });
        })
        .catch((error) => dispatch(deleteEnquiriesFormFail()));
    }
  };
};

export const postEnquiriesFormDataStart = () => {
  return {
    type: actionType.POST_ENQUIRIES_FORM_DATA_START,
  };
};

export const postEnquiriesFormDataFail = (error) => {
  return {
    type: actionType.POST_ENQUIRIES_FORM_DATA_FAIL,
    error: error,
  };
};

export const enquiriesFormPostLoading = () => {
  return {
    type: actionType.ENQUIRIES_FORM_POST_LOADING,
  };
};

export const equiriesFormPostSuccess = (postEnquiriesForm) => {
  return {
    type: actionType.ENQUIRIES_FORM_POST_SUCCESS,
    postEnquiriesForm: postEnquiriesForm,
  };
};

export const postEnquiriesFormData = (
  data,
  user,
  toggle,
  setSubmitting,
  setShowTable
) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postEnquiriesFormDataStart());
    dispatch(enquiriesFormPostLoading());
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
        dispatch(equiriesFormPostSuccess(res.data));
        swal("Successfully Created EnquiriesForm!").then(() => {
          dispatch(enquiriesFormGetData(data));
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
        dispatch(postEnquiriesFormDataFail(error));
      });
  };
};

export const updateEnquiriesFormDataStart = () => {
  return {
    type: actionType.UPDATE_ENQUIRIES_FORM_DATA_START,
  };
};

export const enquiriesFormUpdateLoading = () => {
  return {
    type: actionType.ENQUIRIES_FORM_UPDATE_LOADING,
  };
};
export const updateEnquiriesFormData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateEnquiriesFormDataStart());
    dispatch(enquiriesFormUpdateLoading());

    axios
      .put(baseUrl + `enquires/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated enquiriesForm!").then(() => {
          dispatch(enquiriesFormGetData(data));
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
