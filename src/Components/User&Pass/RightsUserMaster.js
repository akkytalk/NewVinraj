/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { departmentGetData, formGetData } from "../../reduxStore/actions";
import * as actions from "../../reduxStore/actions";
import {
  Button,
  Col,
  FormGroup,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { InputGroupAddon, Label } from "reactstrap";
import CustomInput from "../../views/Custom/CustomInput";

// const FormTitle = styled(Label)`
//   font-size: 12px;
// `;

function RightsUserMaster(props) {
  let data = {
    token: props.login?.login?.token,
  };

  useEffect(() => {
    props.onDepartmentGetData(data);
    props.onFormGetData(data);
    props.onRightGetData(data);
    props.onPageGetData(data);
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Bio Data:", values);

    let user = {
      id: values.user_id,
      rights: values.right,
    };
    console.log("Data of User of rights:", user);
    props.updateRightData(data, user, setSubmitting);
    setSubmitting(true);
    values.user_id = "";
    values.right = [];
    return;
  };

  console.log("users", props.users);

  return (
    <Fragment>
      <Formik
        initialValues={{
          user_id: "",
          right: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          user_id: Yup.string().required("User is required"),
        })}
      >
        {(formProps) => (
          <Form>
            <Row className="form-group">
              <Col md={6}>
                <Label for="user_id">Select User</Label>
                <InputGroup>
                  <Field
                    component={CustomInput}
                    type="text"
                    list="userdatalist"
                    name="user_id"
                    id="user_id"
                    placeholder="Enter User Name"
                    className={
                      "form-control" +
                      (formProps.errors.user_id && formProps.touched.user_id
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <datalist id="userdatalist" style={{ width: "100%" }}>
                    {props.users?.map((user, index) => {
                      if (user.role == "user")
                        return (
                          <option key={index} value={user.id}>
                            User id : {user.id} Name :{user.name}
                          </option>
                        );
                    })}
                  </datalist>
                  <ErrorMessage
                    name="user_id"
                    component="div"
                    className="invalid-feedback"
                  />
                </InputGroup>
              </Col>

              <Col md={6}>
                <Label for="discount">User Name</Label>
                <InputGroup>
                  <select
                    component={CustomInput}
                    type="text"
                    list="userdatalist"
                    name="user_name"
                    id="user_name"
                    placeholder="Enter Student Name"
                    className={"form-control"}
                    disabled
                  >
                    {props.users?.map((user, index) => {
                      if (user.id == formProps.values.user_id)
                        return (
                          <option key={index} value={user.name}>
                            {user.name}
                          </option>
                        );
                    })}
                  </select>
                </InputGroup>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <FieldArray
                  name="right"
                  render={(arrayHelpers) => (
                    <div>
                      <Row>
                        <Col md={10}>
                          <FormGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="append">
                                <Button
                                  block
                                  className="btn-success"
                                  disabled={
                                    formProps.values.user_id == "" ||
                                    formProps.values.right.length > 0
                                  }
                                  onClick={() => {
                                    let obj = props.right.find((right, i) => {
                                      if (
                                        right.user_id ==
                                        formProps.values.user_id
                                      ) {
                                        arrayHelpers.push(right);
                                      }
                                    });
                                  }}
                                >
                                  Add Rights
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                      <table
                        size="sm"
                        className="table table-sm text-center f-12"
                      >
                        <thead>
                          <tr>
                            <th>Sr No</th>
                            <th>Forms</th>
                            <th>Department</th>
                            <th>View</th>
                            <th>Create</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Print</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {console.log("values", formProps?.values?.right)}
                          {formProps?.values?.right?.map((right, index) => {
                            return (
                              <tr key={index} className="text-center">
                                <td>
                                  <th scope="row">{index + 1}</th>
                                </td>
                                <td>
                                  <th scope="row">{right.form?.name}</th>
                                </td>
                                <td>
                                  <th scope="row">
                                    {right.form?.department?.name}
                                  </th>
                                </td>
                                <td>
                                  <Field
                                    component={CustomInput}
                                    type="checkbox"
                                    name={`rights.${index}.view_status`}
                                    id="view_status"
                                    placeholder="Enter Marks"
                                    checked={
                                      right?.view_status == 1 ? true : false
                                    }
                                    onChange={(event) => {
                                      formProps.setFieldValue(
                                        `right.${index}.view_status`,
                                        event.target.value
                                      );
                                    }}
                                    value={right?.view_status == 1 ? "0" : "1"}
                                  />
                                </td>
                                <td>
                                  <Field
                                    component={CustomInput}
                                    type="checkbox"
                                    name={`right.${index}.create_status`}
                                    id={`right.${index}.create_status`}
                                    checked={
                                      right?.create_status == 1 ? true : false
                                    }
                                    onChange={(event) => {
                                      formProps.setFieldValue(
                                        `right.${index}.create_status`,
                                        event.target.value
                                      );
                                    }}
                                    value={
                                      right?.create_status == 1 ? "0" : "1"
                                    }
                                  />
                                </td>

                                <td>
                                  <Field
                                    component={CustomInput}
                                    type="checkbox"
                                    name={`rights.${index}.update_status`}
                                    // id="index_update_status"
                                    checked={
                                      right?.update_status == 1 ? true : false
                                    }
                                    onChange={(event) => {
                                      formProps.setFieldValue(
                                        `right.${index}.update_status`,
                                        event.target.value
                                      );
                                    }}
                                    value={
                                      right?.update_status == 1 ? "0" : "1"
                                    }
                                  />
                                </td>

                                <td>
                                  <Field
                                    component={CustomInput}
                                    type="checkbox"
                                    name={`rights.${index}.delete_status`}
                                    id="index_delete_status"
                                    checked={
                                      right?.delete_status == 1 ? true : false
                                    }
                                    onChange={(event) => {
                                      formProps.setFieldValue(
                                        `right.${index}.delete_status`,
                                        event.target.value
                                      );
                                    }}
                                    value={
                                      right?.delete_status == 1 ? "0" : "1"
                                    }
                                  />
                                </td>
                                <td>
                                  <Field
                                    component={CustomInput}
                                    type="checkbox"
                                    name={`rights.${index}.print_status`}
                                    id="index_print_status"
                                    checked={
                                      right?.print_status == 1 ? true : false
                                    }
                                    onChange={(event) => {
                                      formProps.setFieldValue(
                                        `right.${index}.print_status`,
                                        event.target.value
                                      );
                                    }}
                                    value={right?.print_status == 1 ? "0" : "1"}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                />
              </Col>
            </Row>
            <br />
            <Row style={{ justifyContent: "center" }}>
              <Col md={4}>
                <Button type="reset" className="btn-danger" block>
                  <b>Reset</b>
                </Button>
              </Col>
              <Col md={4}>
                <Button
                  type="submit"
                  disabled={formProps.isSubmitting}
                  color="primary"
                  block
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    department: state.department.department,
    form: state.form.form,
    prefix: state.prefix.prefix,
    login: state.login,
    page: state.page,
    right: state.right.right,
    users: state.userMaster.userMaster,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDepartmentGetData: (data) => dispatch(departmentGetData(data)),
    onFormGetData: (data) => dispatch(formGetData(data)),
    onRightGetData: (data) => dispatch(actions.rightGetData(data)),
    onPageGetData: (data) => dispatch(actions.pageGetData(data)),
    updateRightData: (data, user, setSubmitting) =>
      dispatch(actions.updateRightData(data, user, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RightsUserMaster);
