import * as actionType from "./actionType";
import axios from "../../axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const itemGroupSetData = (itemGroup) => {
  return {
    type: actionType.ITEM_GROUP_SET_DATA,
    itemGroup: itemGroup,
  };
};

export const itemGroupFailData = (error) => {
  return {
    type: actionType.ITEM_GROUP_FAIL_DATA,
    error: error,
  };
};

export const itemGroupGetData = (data) => {
  return (dispatch) => {
    axios
      .get(baseUrl + "itemGroups", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(itemGroupSetData(res.data));
      })

      .catch((error) => dispatch(itemGroupFailData(error)));
  };
};

export const deleteItemGroupFail = (error) => {
  return {
    type: actionType.DELETE_ITEM_GROUP_FAIL,
    error: error,
  };
};

export const deleteItemGroup = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `itemGroups/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted ItemGroup!").then(() => {
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

export const postItemGroupDataFail = (error) => {
  return {
    type: actionType.POST_ITEM_GROUP_DATA_FAIL,
    error: error,
  };
};

export const postItemGroupData = (data, user) => {
  return (dispatch) => {
    //if (!user.name) return;
    // console.log("data", data);
    console.log("user", user);
    dispatch(postItemGroupDataStart());
    axios
      .post(baseUrl + "itemGroups", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created ItemGroup!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => dispatch(postItemGroupDataFail(error)));
    // props.addUser(user);
    // setUser(initialItemGroupState);
  };
};

export const editItemGroupRowStart = () => {
  return {
    type: actionType.EDIT_ITEM_GROUP_ROW_START,
  };
};

export const failEditItemGroup = (error) => {
  return {
    type: actionType.FAIL_EDIT_ITEM_GROUP,
    error: error,
  };
};

export const editItemGroupRow = (
  data,
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
      .get(baseUrl + `itemGroups/${id}`, {
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
          under_group_name: res.data.under_group_name,
        });
      })
      .catch((error) => dispatch(failEditItemGroup(error)));
  };
};

export const updateItemGroupDataStart = () => {
  return {
    type: actionType.UPDATE_ITEM_GROUP_DATA_START,
  };
};

export const updateItemGroupData = (
  data,
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
      .put(baseUrl + `itemGroups/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated itemGroup!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
