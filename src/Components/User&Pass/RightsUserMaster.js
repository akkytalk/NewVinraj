import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { departmentGetData, formGetData } from "../../reduxStore/actions";

function RightsUserMaster(props) {
  const [form, setForm] = useState([]);
  const [department, SetDepartment] = useState([]);

  let data = {
    token: props.login?.login?.success?.token,
  };

  //  console.log("data", data);
  //  console.log("login", props.login?.login);

  useEffect(() => {
    // console.log("prefix data from redux ", props.prefix);
    props.onDepartmentGetData(data);
    props.onFormGetData(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .get("https://uditsolutions.in/vinrajbackend/public/api/departments")
      .then((res) => {
        console.log(res.data, "department res");
        SetDepartment(res.data);
      })

      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("https://uditsolutions.in/vinrajbackend/public/api/forms")
      .then((res) => {
        console.log(res.data, "department res");
        setForm(res.data);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <Fragment>
      <div>
        <label className="form-control">
          Search the user by name or phone number
        </label>
        <input type="search" className="form-control" />{" "}
        <button className="btn btn-primary mt-3 mb-3">Search</button>
        <table className="table" style={{ fontSize: "12px" }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Roles</th>
              <th scope="col">create</th>
              <th scope="col">edit</th>
              <th scope="col">view</th>
              <th scope="col">details</th>
            </tr>
          </thead>
          {props.department.map((dep) => (
            <tbody>
              <h6 className="mt-3">{dep.name}</h6>
              {props.form.map((form) => {
                if (dep.id == form.department_id) {
                  return (
                    <tr>
                      <th scope="row">{form.name}</th>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      {/* <td> <button className="btn btn-primary">save</button></td> */}
                    </tr>
                  );
                }
              })}
            </tbody>
          ))}
        </table>
        <th scope="col">
          <button className="btn btn-primary"> save</button>{" "}
        </th>
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
    onDepartmentGetData: (data) => dispatch(departmentGetData(data)),
    onFormGetData: (data) => dispatch(formGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RightsUserMaster);
