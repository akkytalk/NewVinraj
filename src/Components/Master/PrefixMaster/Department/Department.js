// import axios from "axios";
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
// import swal from "sweetalert";
import Sidebar from "../../../Home/Sidebar";
import * as actions from "../../../../reduxStore/actions/index";
import { connect } from "react-redux";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

function Department(props) {
  let data = {
    token: props.login?.login?.success?.token,
  };

  // console.log("data", data);
  // console.log("login", props.login?.login);
  useEffect(() => {
    console.log("department data from redux ", props.department);
    props.onDepartmentGetData(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="wrapper">
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="n"
                role="button"
              >
                <i className="fas fa-bars"> </i>
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block ml-2">
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link color="inherit" href="/">
                  Home
                </Link>
                <Link color="inherit">Master</Link>
                <Typography color="textPrimary">Department Master</Typography>
              </Breadcrumbs>
            </li>
          </ul>
          {/* SEARCH FORM */}
        </nav>
        {/* /.navbar */}
        {/*  */}

        <Sidebar />
        <div class="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <div className="container">
                <div className="flex-row">
                  <div className="flex-large">
                    {/* Department Form Section Start here */}
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        props.onPostDepartmentData(data, user);
                      }}
                    >
                      <div className="form-row" style={{ fontSize: "12px" }}>
                        <div className="form-group col-md-3">
                          <label htmlFor="inputPassword4">
                            Department Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            placeholder=""
                            value={editing ? currentUser.name : user.name}
                            name="name"
                            onChange={
                              editing
                                ? currentUserInputChange
                                : handleInputChange
                            }
                          />
                        </div>

                        <div className="form-group col-md-3 mt-4">
                          {!editing || !currentUser ? (
                            <button className="btn btn-primary " type="submit">
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
                      className="table"
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
                                <button
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
                                  <i
                                    className="fa fa-edit"
                                    aria-hidden="true"
                                  ></i>
                                </button>

                                <button
                                  className="ml-4"
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
                                </button>
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
            </div>
          </section>
        </div>
      </div>
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
    onPostDepartmentData: (data, user) =>
      dispatch(actions.postDepartmentData(data, user)),
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
