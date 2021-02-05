import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../reduxStore/actions/index";

function AddUserMaster(props) {
  const initialFormState = { id: null, name: "", username: "" };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const usersData = [
    { id: 1, name: "AAA", username: "aiueo", phone: "9967258482" },
    { id: 2, name: "BBB", username: "kakikukeko", phone: "1234567898" },
    { id: 3, name: "CCC", username: "sasisuseso", phone: "7584986321" },
  ];

  const [users, setUsers] = useState(usersData);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const [editing, setEditing] = useState(false);
  const initialFormStates = { id: null, name: "", username: "" };

  const [currentUser, setCurrentUser] = useState(initialFormStates);

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const updateUser = (id, updateUser) => {
    setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updateUser : user)));
  };
  //   useEffect(() => {
  //     console.log("currentUser data from redux ", currentUser);

  //     props.onAccountGroupGetData();
  //     props.onAccountGroupGetData();
  //     props.onDeleteAccountGroup();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   const [user, setUser] = useState({
  //     name: "",
  //     under_group_name: "",
  //   });

  //   const [editing, setEditing] = useState(false);

  //   const initialFormState = {
  //     id: "",
  //     name: "",
  //     under_group_name: "",
  //   };

  //   const [currentUser, setCurrentUser] = useState(initialFormState);

  //   const currentUserInputChange = (event) => {
  //     const { name, value } = event.target;
  //     setCurrentUser({ ...currentUser, [name]: value });
  //   };

  //   const handleInputChange = (event) => {
  //     const { name, value } = event.target;
  //     setUser({ ...user, [name]: value });
  //   };

  return (
    <Fragment>
      <div className="container">
        <div className="flex-row">
          <div className="flex-large">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (!user.name || !user.username) return;
                addUser(user);
                setUser(initialFormState);
              }}
            >
              <div className="form-row" style={{ fontSize: "10px" }}>
                <div className="form-group col-md-3">
                  <label htmlFor="inputPassword4"> Name </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder=""
                    value={user.name}
                    name="name"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputPassword4">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder=""
                    value={user.username}
                    name="username"
                    onChange={handleInputChange}
                  />
                </div>
                {/*  */}
                <div className="form-group col-md-3">
                  <label htmlFor="inputPassword4">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="password"
                  />
                </div>

                <div className="form-group col-md-3">
                  <label htmlFor="inputAddress">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="D-20 Main St"
                  />
                </div>
              </div>
              <div className="form-row" style={{ fontSize: "10px" }}>
                <div className="form-group col-md-3">
                  <label htmlFor="inputCity">Phone</label>
                  <input
                    type="phone"
                    className="form-control"
                    id="inputCity"
                    value={user.phone}
                    name="phone"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputCity">City</label>
                  <input type="text" className="form-control" id="inputCity" />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputState">State</label>
                  <select id="inputState" className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputZip">Zip</label>
                  <input type="text" className="form-control" id="inputZip" />
                </div>
              </div>
              <button className="btn btn-primary">Add</button>
              <br />
            </form>
          </div>
          <div className="flex-large">
            <table className="table" style={{ fontSize: "10px" }}>
              <thead>
                <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Under Item Single</th>
                  <th scope="col"> Phone</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.length > 0 ? (
                  users?.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.phone}</td>
                      <td>
                        {/* <button
                                className="btn btn-primary"
                                onClick={() => editRow(user)}
                            >
                                Edit
              </button> */}
                        <i
                          className="fa fa-minus"
                          aria-hidden="true"
                          onClick={() => deleteUser(user.id)}
                        ></i>
                        {/* <button

                                className="btn btn-primary ml-5"
                                onClick={() => props.deleteUser(user.id)}
                            >
                                Delete
              </button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No users</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    accountGroup: state.accountGroup.accountGroup,
    form: state.form.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAccountGroupGetData: () => dispatch(actions.accountGroupGetData()),
    onDeleteAccountGroup: (id) => dispatch(actions.deleteAccountGroup(id)),
    onPostAccountGroupData: (user) =>
      dispatch(actions.postAccountGroupData(user)),
    onUpdateAccountGroupData: (
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.updateAccountGroupData(
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
    onEditAccountGroupRow: (
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editAccountGroupRow(
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddUserMaster);
