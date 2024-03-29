import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import * as actions from "../../reduxStore/actions/index";

function AddUserMaster(props) {
  let data = {
    token: props.login?.login?.token,
  };

  useEffect(() => {
    console.log("currentUser data from redux ", currentUser);

    props.onUserMasterGetData(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    role: "user",
  });

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: "",
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    role: "user",
  };

  const [currentUser, setCurrentUser] = useState(initialFormState);

  const currentUserInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Fragment>
      <div className="container">
        <div className="flex-row">
          <div className="flex-large">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                props.onPostUserMasterData(data, user);
              }}
            >
              <div className="form-row" style={{ fontSize: "12px" }}>
                <div className="form-group col-md-3">
                  <label htmlFor="inputPassword4"> Name </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder=""
                    value={editing ? currentUser.name : user.name}
                    name="name"
                    onChange={
                      editing ? currentUserInputChange : handleInputChange
                    }
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputPassword4">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder=""
                    value={editing ? currentUser.email : user.email}
                    name="email"
                    onChange={
                      editing ? currentUserInputChange : handleInputChange
                    }
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
                    value={editing ? currentUser.password : user.password}
                    name="password"
                    onChange={
                      editing ? currentUserInputChange : handleInputChange
                    }
                  />
                </div>

                <div className="form-group col-md-3">
                  <label htmlFor="inputAddress">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="D-20 Main St"
                    value={editing ? currentUser.address : user.address}
                    name="address"
                    onChange={
                      editing ? currentUserInputChange : handleInputChange
                    }
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
                    value={editing ? currentUser.phone : user.phone}
                    name="phone"
                    onChange={
                      editing ? currentUserInputChange : handleInputChange
                    }
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputCity">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editing ? currentUser.city : user.city}
                    name="city"
                    onChange={
                      editing ? currentUserInputChange : handleInputChange
                    }
                    id="inputCity"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputState">State</label>
                  <select
                    id="inputState"
                    value={editing ? currentUser.state : user.state}
                    name="state"
                    onChange={
                      editing ? currentUserInputChange : handleInputChange
                    }
                    className="form-control"
                  >
                    <option selected>Choose...</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Dadar and Nagar Haveli">
                      Dadar and Nagar Haveli
                    </option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputZip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    value={editing ? currentUser.pincode : user.pincode}
                    name="pincode"
                    onChange={
                      editing ? currentUserInputChange : handleInputChange
                    }
                  />
                </div>
              </div>

              {!editing || !currentUser ? (
                <button className="btn btn-primary mb-3" type="submit">
                  Add
                </button>
              ) : (
                <div>
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={() =>
                      props.onUpdateUserMasterData(
                        data,
                        currentUser.id,
                        editing,
                        setEditing,
                        currentUser,
                        setCurrentUser
                      )
                    }
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-primary ml-3"
                    type="button"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}

              <br />
            </form>
          </div>
          <div className="flex-large">
            <table className="table table-sm" style={{ fontSize: "12px" }}>
              <thead>
                <tr>
                  <th scope="col">User Name</th>
                  <th scope="col">E-mail</th>
                  {/* <th scope="col"> Phone</th> */}
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {props.userMaster?.length > 0 ? (
                  props.userMaster?.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      {/* <td>{user.phone}</td> */}
                      <td className="d-flex">
                        <Button
                          className="btn-warning p-1"
                          onClick={() =>
                            props.onEditUserMasterRow(
                              data,
                              user.id,
                              editing,
                              setEditing,
                              currentUser,
                              setCurrentUser
                            )
                          }
                        >
                          <i className="fa fa-edit" aria-hidden="true"></i>
                        </Button>

                        <Button
                          className="btn-danger p-1 ml-3"
                          onClick={() =>
                            props.onDeleteUserMaster(user.id, data)
                          }
                        >
                          <i
                            className="fa fa-trash-alt"
                            value={user.id}
                            aria-hidden="true"
                          ></i>
                        </Button>
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
    userMaster: state.userMaster.userMaster,
    form: state.form.form,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserMasterGetData: (data) => dispatch(actions.userMasterGetData(data)),
    onDeleteUserMaster: (id, data) =>
      dispatch(actions.deleteUserMaster(id, data)),
    onPostUserMasterData: (data, user) =>
      dispatch(actions.postUserMasterData(data, user)),
    onUpdateUserMasterData: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.updateUserMasterData(
          data,
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
    onEditUserMasterRow: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editUserMasterRow(
          data,
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
