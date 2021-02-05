import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";

export const itemGroupSetData = (itemGroup) => {
  return {
    type: actionType.ITEM_GROUP_SET_DATA,
    itemGroup: itemGroup,
  };
};

export const itemGroupFailData = () => {
  return {
    type: actionType.ITEM_GROUP_FAIL_DATA,
  };
};

export const itemGroupGetData = () => {
  return (dispatch) => {
    axios
      .get("itemGroups")
      .then((res) => {
        console.log(res.data, "res");
        dispatch(itemGroupSetData(res.data));
      })

      .catch((error) => dispatch(itemGroupFailData()));
  };
};

export const deleteItemGroupFail = () => {
  return {
    type: actionType.DELETE_ITEM_GROUP_FAIL,
  };
};

export const deleteItemGroup = (id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(`itemGroups/${id}`)
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Item Group!").then(() => {
            window.location.reload();
          });
        })
        .catch((error) => dispatch(deleteItemGroupFail()));
    }
  };
};

export const postItemGroupDataStart = () => {
  return {
    type: actionType.POST_ITEM_GROUP_DATA_START,
  };
};

export const postItemGroupDataFail = () => {
  return {
    type: actionType.POST_ITEM_GROUP_DATA_FAIL,
  };
};

export const postItemGroupData = (user) => {
  return (dispatch) => {
    if (!user.name) return;

    dispatch(postItemGroupDataStart());
    axios
      .post("itemGroups", user)
      .then(() => {
        console.log("swal");
        swal("Successfully Created Item Group!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => dispatch(postItemGroupDataFail()));
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editItemGroupRowStart = () => {
  return {
    type: actionType.EDIT_ITEM_GROUP_ROW_START,
  };
};

export const failEditItemGroup = () => {
  return {
    type: actionType.FAIL_EDIT_ITEM_GROUP,
  };
};

export const editItemGroupRow = (
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editItemGroupRowStart());
    setEditing(true);
    axios
      .get(`itemGroups/${id}`)
      .then((res) => {
        console.log(res.data, "editing data res");
        setEditing(res.data);
        setCurrentUser({
          id: res.data.id,
          name: res.data.name,
          under_group_name: res.data.under_group_name,
        });
      })
      .catch((error) => dispatch(failEditItemGroup()));
  };
};

export const updateItemGroupDataStart = () => {
  return {
    type: actionType.UPDATE_ITEM_GROUP_DATA_START,
  };
};

export const updateItemGroupData = (
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateItemGroupDataStart());
    setEditing(false);

    axios
      .put(`itemGroups/${id}`, currentUser)
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Item Group!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
