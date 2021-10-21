import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const itemUnitsSetData = (itemUnits) => {
  return {
    type: actionType.ITEM_UNITS_SET_DATA,
    itemUnits: itemUnits,
  };
};

export const itemUnitsFailData = (error) => {
  return {
    type: actionType.ITEM_UNITS_FAIL_DATA,
    error: error,
  };
};

export const itemUnitsGetData = (data) => {
  return (dispatch) => {
    axios
      .get(baseUrl + "units", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(itemUnitsSetData(res.data));
      })

      .catch((error) => dispatch(itemUnitsFailData(error)));
  };
};

export const deleteItemUnitsFail = (error) => {
  return {
    type: actionType.DELETE_ITEM_UNITS_FAIL,
    error: error,
  };
};

export const deleteItemUnits = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `units/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted ItemUnits!").then(() => {
            dispatch(itemUnitsGetData(data));
          });
        })
        .catch((error) => dispatch(deleteItemUnitsFail()));
    }
  };
};

export const postItemUnitsDataStart = () => {
  return {
    type: actionType.POST_ITEM_UNITS_DATA_START,
  };
};

export const postItemUnitsDataFail = (error) => {
  return {
    type: actionType.POST_ITEM_UNITS_DATA_FAIL,
    error: error,
  };
};

export const postItemUnitsData = (data, user) => {
  return (dispatch) => {
    //if (!user.name) return;
    // console.log("data", data);
    console.log("user", user);
    dispatch(postItemUnitsDataStart());
    axios
      .post(baseUrl + "units", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created ItemUnits!").then(() => {
          dispatch(itemUnitsGetData(data));
        });
      })
      .catch((error) => dispatch(postItemUnitsDataFail(error)));
    // props.addUser(user);
    // setUser(initialItemUnitsState);
  };
};

export const editItemUnitsRowStart = () => {
  return {
    type: actionType.EDIT_ITEM_UNITS_ROW_START,
  };
};

export const failEditItemUnits = (error) => {
  return {
    type: actionType.FAIL_EDIT_ITEM_UNITS,
    error: error,
  };
};

export const editItemUnitsRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editItemUnitsRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `units/${id}`, {
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
          unit_name: res.data.unit_name,
        });
      })
      .catch((error) => dispatch(failEditItemUnits(error)));
  };
};

export const updateItemUnitsDataStart = () => {
  return {
    type: actionType.UPDATE_ITEM_UNITS_DATA_START,
  };
};

export const updateItemUnitsData = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateItemUnitsDataStart());
    setEditing(false);

    axios
      .put(baseUrl + `units/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated itemUnits!").then(() => {
          dispatch(itemUnitsGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
