import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";

export const itemNameSetData = (itemName) => {
  return {
    type: actionType.ITEM_NAME_SET_DATA,
    itemName: itemName,
  };
};

export const itemNameFailData = () => {
  return {
    type: actionType.ITEM_NAME_FAIL_DATA,
  };
};

export const itemNameGetData = () => {
  return (dispatch) => {
    axios
      .get("items")
      .then((res) => {
        console.log(res.data, "res");
        dispatch(itemNameSetData(res.data));
      })

      .catch((error) => dispatch(itemNameFailData()));
  };
};

export const deleteItemNameFail = () => {
  return {
    type: actionType.DELETE_ITEM_NAME_FAIL,
  };
};

export const deleteItemName = (id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(`items/${id}`)
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Item Name!").then(() => {
            window.location.reload();
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

export const postItemNameDataFail = () => {
  return {
    type: actionType.POST_ITEM_NAME_DATA_FAIL,
  };
};

export const postItemNameData = (user) => {
  return (dispatch) => {
    if (!user.name) return;

    dispatch(postItemNameDataStart());
    axios
      .post("items", user)
      .then(() => {
        console.log("swal");
        swal("Successfully Created Item Name!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => dispatch(postItemNameDataFail()));
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editItemNameRowStart = () => {
  return {
    type: actionType.EDIT_ITEM_NAME_ROW_START,
  };
};

export const failEditItemName = () => {
  return {
    type: actionType.FAIL_EDIT_ITEM_NAME,
  };
};

export const editItemNameRow = (
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
      .get(`items/${id}`)
      .then((res) => {
        // console.log(res.data, "editing data res");
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
      .catch((error) => dispatch(failEditItemName()));
  };
};

export const updateItemNameDataStart = () => {
  return {
    type: actionType.UPDATE_ITEM_NAME_DATA_START,
  };
};

export const updateItemNameData = (
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
      .put(`items/${id}`, currentUser)
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Item Name!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
