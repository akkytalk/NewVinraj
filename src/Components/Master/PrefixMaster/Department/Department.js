/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import * as actions from "../../../../reduxStore/actions/index";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

function Department(props) {
  let data = {
    token: props.login?.login?.token,
  };

  const [isSubmit, setSubmit] = useState(false);

  useEffect(() => {
    props.onDepartmentGetData(data);
  }, []);

  const [user, setUser] = useState({
    name: "",
  });

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    name: "",
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

  // console.log("editing", editing);
  // console.log("Current User", currentUser);

  return (
    <Fragment>
      <div className="container">
        <div className="flex-row">
          <div className="flex-large">
            {/* Department Form Section Start here */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmit(true);
                props.onPostDepartmentData(data, user, setSubmit);
              }}
            >
              <div className="form-row " style={{ fontSize: "12px" }}>
                <div className="form-group col-md-3 p-1">
                  <label htmlFor="inputPassword4">Department Name</label>
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

                <div className="form-group col-md-3 mt-4">
                  {!editing || !currentUser ? (
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
                          props.onUpdateDepartmentData(
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
            {/* Department Form Section End here */}
          </div>
          <div className="flex-large">
            <table
              className="table table-sm"
              style={{
                fontSize: "12px",
              }}
            >
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th scope="col">Department Name</th>

                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {props.department?.length > 0 ? (
                  props.department?.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>

                      <td>
                        <Button
                          className="btn-warning p-1"
                          onClick={() =>
                            props.onEditDepartmentRow(
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
                                "Are you sure you wish to delete this Department?"
                              )
                            )
                              props.onDeleteDepartment(user.id, data);
                          }}
                        >
                          <i
                            className="fa fa-trash-alt"
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
      {/* </div>
          </section>
        </div>
      </div> */}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    department: state.department.department,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDepartmentGetData: (data) => dispatch(actions.departmentGetData(data)),
    onDeleteDepartment: (id, data) =>
      dispatch(actions.deleteDepartment(id, data)),
    onPostDepartmentData: (data, user, setSubmit) =>
      dispatch(actions.postDepartmentData(data, user, setSubmit)),
    onUpdateDepartmentData: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.updateDepartmentData(
          data,
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
    onEditDepartmentRow: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editDepartmentRow(
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
export default connect(mapStateToProps, mapDispatchToProps)(Department);
