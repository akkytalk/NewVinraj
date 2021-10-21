import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const itemNameSetData = (itemName) => {
  return {
    type: actionType.ITEM_NAME_SET_DATA,
    itemName: itemName,
  };
};

export const itemNameFailData = (error) => {
  return {
    type: actionType.ITEM_NAME_FAIL_DATA,
    error: error,
  };
};

export const itemNameGetData = (data) => {
  return (dispatch) => {
    axios
      .get(baseUrl + "items", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(itemNameSetData(res.data));
      })

      .catch((error) => dispatch(itemNameFailData(error)));
  };
};

export const deleteItemNameFail = (error) => {
  return {
    type: actionType.DELETE_ITEM_NAME_FAIL,
    error: error,
  };
};

export const deleteItemName = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `items/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted ItemName!").then(() => {
            dispatch(itemNameGetData(data));
          });
        })
        .catch((error) => dispatch(deleteItemNameFail()));
    }
  };
};

export const postItemNameDataStart = () => {
  return {
    type: actionType.POST_ITEM_NAME_DATA_START,
  };
};

export const postItemNameDataFail = (error) => {
  return {
    type: actionType.POST_ITEM_NAME_DATA_FAIL,
    error: error,
  };
};

export const postItemNameData = (data, user) => {
  return (dispatch) => {
    //if (!user.name) return;
    // console.log("data", data);
    console.log("user", user);
    dispatch(postItemNameDataStart());
    axios
      .post(baseUrl + "items", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created ItemName!").then(() => {
          dispatch(itemNameGetData(data));
        });
      })
      .catch((error) => dispatch(postItemNameDataFail(error)));
    // props.addUser(user);
    // setUser(initialItemNameState);
  };
};

export const editItemNameRowStart = () => {
  return {
    type: actionType.EDIT_ITEM_NAME_ROW_START,
  };
};

export const failEditItemName = (error) => {
  return {
    type: actionType.FAIL_EDIT_ITEM_NAME,
    error: error,
  };
};

export const editItemNameRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editItemNameRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `items/${id}`, {
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
          item_group_id: res.data.item_group.id,
          group_name: res.data.item_group.name,
          unit_id: res.data.unit_id,
          unit_name: res.data.unit.unit_name,
        });
      })
      .catch((error) => dispatch(failEditItemName(error)));
  };
};

export const updateItemNameDataStart = () => {
  return {
    type: actionType.UPDATE_ITEM_NAME_DATA_START,
  };
};

export const updateItemNameData = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateItemNameDataStart());
    setEditing(false);

    axios
      .put(baseUrl + `items/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated itemName!").then(() => {
          dispatch(itemNameGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
