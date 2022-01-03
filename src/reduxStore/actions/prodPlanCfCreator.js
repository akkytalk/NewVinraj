import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const prodPlanCfSetData = (prodPlanCf) => {
  return {
    type: actionType.PROD_PLAN_CF_SET_DATA,
    prodPlanCf: prodPlanCf,
  };
};

export const prodPlanCfFailData = (error) => {
  return {
    type: actionType.PROD_PLAN_CF_FAIL_DATA,
    error: error,
  };
};

export const prodPlanCfLoading = () => {
  return {
    type: actionType.PROD_PLAN_CF_LOADING,
  };
};

export const prodPlanCfGetData = (data) => {
  return (dispatch) => {
    dispatch(prodPlanCfLoading());
    axios
      .get(baseUrl + "plannings", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(prodPlanCfSetData(res.data));
      })

      .catch((error) => dispatch(prodPlanCfFailData(error)));
  };
};

export const deleteProdPlanCfFail = (error) => {
  return {
    type: actionType.DELETE_PROD_PLAN_CF_FAIL,
    error: error,
  };
};

export const deleteProdPlanCf = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `plannings/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted ProdPlanCf!").then(() => {
            dispatch(prodPlanCfGetData(data));
          });
        })
        .catch((error) => dispatch(deleteProdPlanCfFail()));
    }
  };
};

export const postProdPlanCfDataStart = () => {
  return {
    type: actionType.POST_PROD_PLAN_CF_DATA_START,
  };
};

export const postProdPlanCfDataFail = (error) => {
  return {
    type: actionType.POST_PROD_PLAN_CF_DATA_FAIL,
    error: error,
  };
};

export const prodPlanCfPostLoading = () => {
  return {
    type: actionType.PROD_PLAN_CF_POST_LOADING,
  };
};

export const equiriesFormPostSuccess = (postProdPlanCf) => {
  return {
    type: actionType.PROD_PLAN_CF_POST_SUCCESS,
    postProdPlanCf: postProdPlanCf,
  };
};

export const postProdPlanCfData = (
  data,
  user,
  toggle,
  setSubmitting,
  setShowTable,
  unique
) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postProdPlanCfDataStart());
    dispatch(prodPlanCfPostLoading());
    axios
      .post(baseUrl + "plannings", user, {
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
        swal("Successfully Created ProdPlanCf!").then(() => {
          dispatch(prodPlanCfGetData(data));
          // if (toggle) {
          //   toggle();
          // }
          if (setShowTable) {
            setShowTable(true);
          }
          if (unique) {
            unique();
          }
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(postProdPlanCfDataFail(error));
      });
  };
};

export const updateProdPlanCfDataStart = () => {
  return {
    type: actionType.UPDATE_PROD_PLAN_CF_DATA_START,
  };
};

export const prodPlanCfUpdateLoading = () => {
  return {
    type: actionType.PROD_PLAN_CF_UPDATE_LOADING,
  };
};
export const updateProdPlanCfData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateProdPlanCfDataStart());
    dispatch(prodPlanCfUpdateLoading());

    axios
      .put(baseUrl + `plannings/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated prodPlanCf!").then(() => {
          dispatch(prodPlanCfGetData(data));
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
