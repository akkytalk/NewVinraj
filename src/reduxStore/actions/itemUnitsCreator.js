import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";

export const itemUnitsSetData = (itemUnits) => {
  return {
    type: actionType.ITEM_UNITS_SET_DATA,
    itemUnits: itemUnits,
  };
};

export const itemUnitsFailData = () => {
  return {
    type: actionType.ITEM_UNITS_FAIL_DATA,
  };
};

export const itemUnitsGetData = () => {
  return (dispatch) => {
    axios
      .get("units")
      .then((res) => {
        console.log(res.data, "res");
        dispatch(itemUnitsSetData(res.data));
      })

      .catch((error) => dispatch(itemUnitsFailData()));
  };
};

export const deleteItemUnitsFail = () => {
  return {
    type: actionType.DELETE_ITEM_UNITS_FAIL,
  };
};

export const deleteItemUnits = (id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(`units/${id}`)
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Item Units!").then(() => {
            window.location.reload();
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

export const postItemUnitsDataFail = () => {
  return {
    type: actionType.POST_ITEM_UNITS_DATA_FAIL,
  };
};

export const postItemUnitsData = (user) => {
  return (dispatch) => {
    if (!user.unit_name) return;

    dispatch(postItemUnitsDataStart());
    axios
      .post("units", user)
      .then(() => {
        console.log("swal");
        swal("Successfully Created Item Units!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => dispatch(postItemUnitsDataFail()));
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editItemUnitsRowStart = () => {
  return {
    type: actionType.EDIT_ITEM_UNITS_ROW_START,
  };
};

export const failEditItemUnits = () => {
  return {
    type: actionType.FAIL_EDIT_ITEM_UNITS,
  };
};

export const editItemUnitsRow = (
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
      .get(`units/${id}`)
      .then((res) => {
        // console.log(res.data, "editing data res");
        setEditing(res.data);
        setCurrentUser({
          id: res.data.id,
          unit_name: res.data.unit_name,
        });
      })
      .catch((error) => dispatch(failEditItemUnits()));
  };
};

export const updateItemUnitsDataStart = () => {
  return {
    type: actionType.UPDATE_ITEM_UNITS_DATA_START,
  };
};

export const updateItemUnitsData = (
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
      .put(`units/${id}`, currentUser)
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Item Units!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
