/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import * as actions from "../../../../reduxStore/actions/index";

function PrefixForm(props) {
  let data = {
    token: props.login?.login?.token,
  };

  const [isSubmit, setSubmit] = useState(false);

  useEffect(() => {
    props.onDepartmentGetData(data);
    props.onFormGetData(data);
  }, []);

  const [user, setUser] = useState({
    department_id: "",
    name: "",
    url: "",
  });

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: "",
    department_id: "",
    department_name: "",
    name: "",
    url: "",
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

  console.log("User data from redux and prefix Form ", currentUser);

  return (
    <Fragment>
      <div className="container">
        <div className="flex-row">
          <div className="flex-large">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmit(true);
                props.onPostFormData(data, user, setSubmit);
              }}
              className="p-2"
            >
              <div className="form-row" style={{ fontSize: "12px" }}>
                <div className="form-group col-md-3">
                  <label htmlFor="inputPassword4">Department Name</label>
                  <select
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    name="department_id"
                    value={
                      editing ? currentUser.department_id : props.department.id
                    }
                    onChange={
                      editing ? currentUserInputChange : handleInputChange
                    }
                  >
                    <option>select</option> &&
                    {props.department?.map((dep) => (
                      <option key={dep.id} value={dep.id}>
                        {dep.name}
                      </option>
                    ))}
                    {/* {!editing
                              ? props.department?.map((dep) => (
                                  <option key={dep.id} value={dep.id}>
                                    {dep.name}
                                  </option>
                                ))
                              : currentUser
                              ? // (
                                //     <option>{currentUser.department_name}</option>
                                //   ) &&
                                props.department?.map((dep) => (
                                  <option key={dep.id} value={dep.id}>
                                    {dep.name}
                                  </option>
                                ))
                              : null} */}
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label htmlFor="inputPassword4"> Form name </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder=""
                    value={!editing ? user.name : currentUser.name}
                    name="name"
                    onChange={
                      editing ? currentUserInputChange : handleInputChange
                    }
                  />
                </div>

                {/* <div className="form-group col-md-3">
                  <label htmlFor="inputPassword4"> Form Route </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder=""
                    value={!editing ? user.url : currentUser.url}
                    name="url"
                    onChange={
                      editing ? currentUserInputChange : handleInputChange
                    }
                  />
                </div> */}

                <div className="form-group col-md-3 mt-4">
                  {!editing ? (
                    <button
                      className="btn btn-primary "
                      type="submit"
                      disabled={isSubmit}
                    >
                      Add
                    </button>
                  ) : (
                    <div>
                      <button
                        className="btn btn-success"
                        type="button"
                        onClick={() =>
                          props.onUpdateFormData(
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
                </div>
              </div>
            </form>
          </div>
          <div className="flex-large">
            <table className="table table-sm" style={{ fontSize: "12px" }}>
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th scope="col">Sr No</th>
                  <th scope="col">form Name</th>
                  <th scope="col">Department Name</th>
                  {/* <th scope="col">Route</th> */}

                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {props.form.length > 0 ? (
                  props.form.map((user, index) => (
                    <tr key={user.id}>
                      {/* <td>{user.id}</td> */}
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.department ? user.department.name : null}</td>
                      {/* <td>{user.url}</td> */}

                      <td className="d-flex">
                        <Button
                          className="btn-warning p-1"
                          onClick={() =>
                            props.onEditFormRow(
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

                        {/* <Button
                          className="btn-danger p-1 ml-4"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Form Name?"
                              )
                            )
                              props.onDeleteForm(user.id, data);
                          }}
                        >
                          <i
                            className="fa fa-trash-alt "
                            value={user.id}
                            aria-hidden="true"
                          ></i>
                        </Button> */}
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
    department: state.department.department,
    form: state.form.form,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDepartmentGetData: (data) => dispatch(actions.departmentGetData(data)),
    onFormGetData: (data) => dispatch(actions.formGetData(data)),
    onDeleteForm: (id, data) => dispatch(actions.deleteForm(id, data)),
    onPostFormData: (data, user, setSubmit) =>
      dispatch(actions.postFormData(data, user, setSubmit)),
    onUpdateFormData: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.updateFormData(
          data,
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
    onEditFormRow: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editFormRow(
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
export default connect(mapStateToProps, mapDispatchToProps)(PrefixForm);
