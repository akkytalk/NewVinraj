/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import Sidebar from "../../../Home/Sidebar";
import * as actions from "../../../../reduxStore/actions/index";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import ExportCSV from "../../../ExcelFile/ExportCSV";

function Prefix(props) {
  let data = {
    token: props.login?.login?.token,
  };

  //  console.log("data", data);
  //  console.log("login", props.login?.login);

  const [user, setUser] = useState({
    form_id: "",
    department_id: "",
    prefix: "",
  });

  const [editing, setEditing] = useState(false);
  const [dep2, setDep2] = useState([]);

  const initialFormState = {
    id: "",
    form_id: "",
    form_name: "",
    department_id: "",
    department_name: "",
    prefix: "",
  };

  const [currentUser, setCurrentUser] = useState(initialFormState);

  const selectHandleInputChange = (event) => {
    setDep2(event.target.value);
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const currentUserInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  useEffect(() => {
    props.onDepartmentGetData(data);
    props.onFormGetData(data);
    props.onPrefixGetData(data);
  }, []);

  const [csv, setCsv] = useState([]);

  useEffect(() => {
    props.prefix?.map((prefix) => {
      csv.push({
        FormName: prefix.form?.name,
        DepartmentName: prefix.department?.name,
        Prefix: prefix.prefix,
      });
    });
  }, []);

  console.log("csv", csv);

  return (
    <Fragment>
      <div className="container">
        <div className="flex-row">
          <div className="flex-large">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                props.onPostPrefixData(data, user);
              }}
            >
              <div className="form-row" style={{ fontSize: "12px" }}>
                <div className="form-group col-md-3">
                  <label htmlFor="inputPassword4"> Department</label>
                  <select
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    name="department_id"
                    value={
                      editing ? currentUser.department_id : props.department.id
                    }
                    onChange={
                      editing ? currentUserInputChange : selectHandleInputChange
                    }
                  >
                    {" "}
                    <option>select</option> &&
                    {!editing
                      ? props.department?.map((dep) => (
                          <option key={dep.id} value={dep.id}>
                            {dep.name}
                          </option>
                        ))
                      : currentUser
                      ? <option>{currentUser.department_name}</option> &&
                        props.department?.map((dep) => (
                          <option key={dep.id} value={dep.id}>
                            {dep.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label htmlFor="inputPassword4"> Form name </label>

                  <select
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    name="form_id"
                    value={editing ? currentUser.form_id : props.form.id}
                    onChange={
                      editing ? currentUserInputChange : handleInputChange
                    }
                  >
                    {" "}
                    <option>select</option> &&
                    {!editing
                      ? props.form?.map((form) => {
                          if (dep2 === form.department_id) {
                            //  console.log("Dep2", dep2);
                            //  console.log("department value", form.department_id);

                            return (
                              <option key={form.id} value={form.id}>
                                {form.name}
                              </option>
                            );
                          }
                          return <div></div>;
                        })
                      : currentUser
                      ? <option>{currentUser.form_name}</option> &&
                        props.form?.map((form) => {
                          if (
                            currentUser.department_id === form.department_id
                          ) {
                            console.log("Dep2", props.department.id);
                            console.log("department value", form.department_id);

                            return (
                              <option key={form.id} value={form.id}>
                                {form.name}
                              </option>
                            );
                          }
                          return <div></div>;
                        })
                      : null}
                    {/* {form.map((form) => <option key={form.id}  value={form.id}>{form.name}</option>)} */}
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label htmlFor="inputPassword4">Prefix</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder=""
                    value={!editing ? user.prefix : currentUser.prefix}
                    name="prefix"
                    onChange={
                      editing ? currentUserInputChange : handleInputChange
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
                          props.onUpdatePrefixData(
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
            <table className="table" style={{ fontSize: "12px" }}>
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th scope="col">Form Name</th>
                  <th scope="col">Department Name</th>
                  <th scope="col">Prefix</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {props.prefix.length > 0 ? (
                  props.prefix.map((user) => (
                    <tr key={user.id}>
                      {/* <td>{user.id}</td> */}
                      <td>{user.form ? user.form.name : null}</td>
                      <td>{user.department ? user.department.name : null}</td>
                      <td>{user.prefix}</td>
                      <td className="d-flex">
                        <button
                          onClick={() =>
                            props.onEditPrefixRow(
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
                        </button>

                        <button
                          className="ml-4 "
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Prefix?"
                              )
                            )
                              props.onDeletePrefix(user.id, data);
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
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    department: state.department.department,
    form: state.form.form,
    prefix: state.prefix.prefix,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDepartmentGetData: (data) => dispatch(actions.departmentGetData(data)),
    onFormGetData: (data) => dispatch(actions.formGetData(data)),
    onPrefixGetData: (data) => dispatch(actions.prefixGetData(data)),
    onDeletePrefix: (id, data) => dispatch(actions.deletePrefix(id, data)),
    onPostPrefixData: (data, user) =>
      dispatch(actions.postPrefixData(data, user)),
    onUpdatePrefixData: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.updatePrefixData(
          data,
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
    onEditPrefixRow: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editPrefixRow(
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
export default connect(mapStateToProps, mapDispatchToProps)(Prefix);
