import * as actionType from "./actionType";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const pageSetData = (page) => {
  return {
    type: actionType.PAGE_SET_DATA,
    page: page,
  };
};

export const pageFailData = (error) => {
  return {
    type: actionType.PAGE_FAIL_DATA,
    error: error,
  };
};
export const pageLoading = () => {
  return {
    type: actionType.PAGE_LOADING,
  };
};
export const pageGetData = (data) => {
  return (dispatch) => {
    dispatch(pageLoading());
    axios
      .get(baseUrl + "pages", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(pageSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(pageFailData(error)));
  };
};

export const pageEditSetData = (editcase) => {
  return {
    type: actionType.PAGE_EDIT_SET_DATA,
    editcase: editcase,
  };
};

export const pageEditFailData = (error) => {
  return {
    type: actionType.PAGE_EDIT_FAIL_DATA,
    error: error,
  };
};

export const pageEditGetData = (data) => {
  return (dispatch) => {
    dispatch(pageLoading());
    axios
      .get(baseUrl + `pages/${data?.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(pageEditSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(pageEditFailData(error)));
  };
};

export const deletePageFail = (error) => {
  return {
    type: actionType.DELETE_PAGE_FAIL,
    error: error,
  };
};

export const deletePage = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `pages/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Page!").then(() => {
            dispatch(pageGetData(data));
          });
        })
        .catch((error) => dispatch(deletePageFail(error)));
    }
  };
};

export const postPageDataStart = () => {
  return {
    type: actionType.POST_PAGE_DATA_START,
  };
};

export const postPageDataFail = (error) => {
  return {
    type: actionType.POST_PAGE_DATA_FAIL,
    error: error,
  };
};

export const postPageData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postPageDataStart());

    axios
      .post(baseUrl + "pages", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Page!").then(() => {
          dispatch(pageGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postPageDataFail(error));
      });
  };
};

export const updatePageDataStart = () => {
  return {
    type: actionType.UPDATE_PAGE_DATA_START,
  };
};

export const updatePageData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updatePageDataStart());

    axios
      .post(baseUrl + `pages/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Page!").then(() => {
          toggle();
          dispatch(pageGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
