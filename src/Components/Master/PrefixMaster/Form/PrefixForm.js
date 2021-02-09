import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import Sidebar from "../../../Home/Sidebar";
import * as actions from "../../../../reduxStore/actions/index";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";

function PrefixForm(props) {
  useEffect(() => {
    console.log("department data from redux ", props.department);
    props.onDepartmentGetData();
    props.onFormGetData();
    props.onDeleteForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [user, setUser] = useState({
    department_id: "",
    name: "",
  });

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: "",
    department_id: "",
    department_name: "",
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


  console.log("User data from redux and prefix Form ", currentUser);

  return (
    <Fragment>
      <div className="wrapper">
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul  className="navbar-nav d-flex align-items-center">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="n"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block ml-2">
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link color="inherit" href="/" >
                  Home
                </Link>
                <Link
                  color="inherit"
                  
                  
                >
                  Master
                </Link>
                <Typography color="textPrimary">Form Name Master</Typography>
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
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        props.onPostFormData(user);
                      }}
                    >
                      <div className="form-row" style={{ fontSize: "12px" }}>
                        <div className="form-group col-md-3">
                          <label htmlFor="inputPassword4">
                            Department Name
                          </label>
                          <select
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            name="department_id"
                            value={
                              editing
                                ? currentUser.department_id
                                : props.department.id
                            }
                            onChange={
                              editing
                                ? currentUserInputChange
                                : handleInputChange
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
                              editing
                                ? currentUserInputChange
                                : handleInputChange
                            }
                          />
                        </div>

                        <div className="form-group col-md-3 mt-4">
                          {!editing ? (
                            <button className="btn btn-primary " type="submit">
                              Add
                            </button>
                          ) : (
                            <div>
                              <button
                                className="btn btn-success"
                                type="button"
                                onClick={() =>
                                  props.onUpdateFormData(
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
                    <table className="table" style={{ fontSize: "12px" }}>
                      <thead>
                        <tr>
                          {/* <th>ID</th> */}
                          <th scope="col">form Name</th>
                          <th scope="col">Department Name</th>

                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.form.length > 0 ? (
                          props.form.map((user) => (
                            <tr key={user.id}>
                              {/* <td>{user.id}</td> */}
                              <td>{user.name}</td>
                              <td>
                                {user.department ? user.department.name : null}
                              </td>

                              <td className="d-flex">
                                <button
                                  onClick={() =>
                                    props.onEditFormRow(
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
                                  className="ml-3"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Are you sure you wish to delete this Form Name?"
                                      )
                                    )
                                      props.onDeleteForm(user.id);
                                  }}
                                >
                                  <i
                                    className="fa fa-trash-alt "
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
    form: state.form.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDepartmentGetData: () => dispatch(actions.departmentGetData()),
    onFormGetData: () => dispatch(actions.formGetData()),
    onDeleteForm: (id) => dispatch(actions.deleteForm(id)),
    onPostFormData: (user) => dispatch(actions.postFormData(user)),
    onUpdateFormData: (id, editing, setEditing, currentUser, setCurrentUser) =>
      dispatch(
        actions.updateFormData(
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
    onEditFormRow: (id, editing, setEditing, currentUser, setCurrentUser) =>
      dispatch(
        actions.editFormRow(
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
