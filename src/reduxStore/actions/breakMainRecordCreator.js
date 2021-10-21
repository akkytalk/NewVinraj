import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const breakMainRecordSetData = (breakMainRecord) => {
  return {
    type: actionType.BREAK_MAIN_RECORD_SET_DATA,
    breakMainRecord: breakMainRecord,
  };
};

export const breakMainRecordFailData = (error) => {
  return {
    type: actionType.BREAK_MAIN_RECORD_FAIL_DATA,
    error: error,
  };
};

export const breakMainRecordLoading = () => {
  return {
    type: actionType.BREAK_MAIN_RECORD_LOADING,
  };
};

export const breakMainRecordGetData = (data) => {
  return (dispatch) => {
    dispatch(breakMainRecordLoading());
    axios
      .get(baseUrl + "maintRecords", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(breakMainRecordSetData(res.data));
      })

      .catch((error) => dispatch(breakMainRecordFailData(error)));
  };
};

export const deleteBreakMainRecordFail = (error) => {
  return {
    type: actionType.DELETE_BREAK_MAIN_RECORD_FAIL,
    error: error,
  };
};

export const deleteBreakMainRecord = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `maintRecords/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted BreakMainRecord!").then(() => {
            dispatch(breakMainRecordGetData(data));
          });
        })
        .catch((error) => dispatch(deleteBreakMainRecordFail()));
    }
  };
};

export const postBreakMainRecordDataStart = () => {
  return {
    type: actionType.POST_BREAK_MAIN_RECORD_DATA_START,
  };
};

export const postBreakMainRecordDataFail = (error) => {
  return {
    type: actionType.POST_BREAK_MAIN_RECORD_DATA_FAIL,
    error: error,
  };
};

export const breakMainRecordPostLoading = () => {
  return {
    type: actionType.BREAK_MAIN_RECORD_POST_LOADING,
  };
};

export const postBreakMainRecordData = (
  data,
  user,
  toggle,
  setSubmitting,
  setShowTable
) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postBreakMainRecordDataStart());
    dispatch(breakMainRecordPostLoading());
    axios
      .post(baseUrl + "maintRecords", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created BreakMainRecord!").then(() => {
          dispatch(breakMainRecordGetData(data));
          if (toggle) {
            toggle();
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
        dispatch(postBreakMainRecordDataFail(error));
      });
  };
};

export const updateBreakMainRecordDataStart = () => {
  return {
    type: actionType.UPDATE_BREAK_MAIN_RECORD_DATA_START,
  };
};

export const breakMainRecordUpdateLoading = () => {
  return {
    type: actionType.BREAK_MAIN_RECORD_UPDATE_LOADING,
  };
};
export const updateBreakMainRecordData = (
  data,
  user,
  toggle,
  setSubmitting
) => {
  return (dispatch) => {
    dispatch(updateBreakMainRecordDataStart());
    dispatch(breakMainRecordUpdateLoading());

    axios
      .put(baseUrl + `maintRecords/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated breakMainRecord!").then(() => {
          dispatch(breakMainRecordGetData(data));
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
