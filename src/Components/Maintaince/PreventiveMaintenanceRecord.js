/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  InputGroup,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../views/Custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../reduxStore/actions";
import CustomSelect from "../../views/Custom/CustomSelect";
import EditPrefix from "../Master/PrefixMaster/Prefix/EditPrefix";
import Loader2 from "../loader/Loader2";

function PreventiveMaintenanceRecord(props) {
  let data = {
    token: props.login?.login?.token,
  };

  const [deleteStatus, setDeleteStatus] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);

  useEffect(() => {
    props.onDepartmentGetData(data);
    props.onFormGetData(data);
    props.onPrefixGetData(data);
    status();
  }, []);

  function status() {
    props.login?.login?.user?.rights?.map((right) => {
      if (right.form_id == 15) {
        if (right.create_status == 1) {
          setCreateStatus(true);
        }
        if (right.update_status == 1) {
          setUpdateStatus(true);
        }
        if (right.delete_status == 1) {
          setDeleteStatus(true);
        }
      }
    });
  }

  console.log(`createStatus`, createStatus);
  console.log(`updateStatus`, updateStatus);
  console.log(`deleteStatus`, deleteStatus);

  const [state, setState] = useState({
    pageSize: 10, // <- 25 items will be shown on single page
    pageIndex: 0, // 0 is a default page to show
    items: props.prefix?.isLoading ? [] : props.prefix?.prefix,
  });

  const handlePrevPageClick = (event) => {
    // console.log(state.items.length);
    setState((prevState) => ({
      ...state,
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0,
    }));
  };

  const handleNextPageClick = (event) => {
    console.log("pageIndex", state.pageIndex);
    console.log("pageSize", state.pageSize);

    setState((prevState) => ({
      ...state,
      pageIndex:
        prevState.pageIndex <
        Math.ceil(prevState.items.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex,
    }));
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Prefix:", values);

    // const user = new FormData();
    let user = {
      department_id: values.department_id,
      form_id: values.form_id,
      prefix: values.prefix,
    };
    // user.append("name", values.name);
    // user.append("department_id", values.department_id);
    // user.append("role", values.role);

    console.log("Data of Prefix:", user);
    props.onPostPrefixData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  if (props.login?.login?.user?.role == "admin")
    return (
      <Card>
        <CardHeader className="bg-warning text-white">
          <div className="">
            <strong>Preventive Maintenance Record</strong>

            <Button
              className="btn-success  float-right"
              onClick={() => {
                toggle();
              }}
            >
              Add Preventive Maintenance Record
            </Button>
          </div>
          <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Add New Preventive Maintenance Record
            </ModalHeader>

            <ModalBody>
              <Formik
                initialValues={{
                  form_id: "",
                  department_id: "",
                  prefix: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  form_id: Yup.string().required("Form Name is required"),
                  department_id: Yup.string().required(
                    "Department is required"
                  ),
                  prefix: Yup.string().required("Prefix is required"),
                })}
              >
                {(formProps) => (
                  <Form>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="department_id">Select Department</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="department_id"
                            id="department_id"
                            className={
                              "form-control" +
                              (formProps.errors.department_id &&
                              formProps.touched.department_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option>select</option>
                            {props.department?.map((dep) => (
                              <option key={dep.id} value={dep.id}>
                                {dep.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="department_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>

                      <Col md={6}>
                        <Label for="discount">Select Form</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="form_id"
                            id="form_id"
                            className={
                              "form-control" +
                              (formProps.errors.form_id &&
                              formProps.touched.form_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option>select Form</option>
                            {props.form?.map((form) => {
                              if (
                                formProps.values.department_id ===
                                form.department_id
                              ) {
                                return (
                                  <option key={form.id} value={form.id}>
                                    {form.name}
                                  </option>
                                );
                              }
                              return <div></div>;
                            })}
                          </Field>

                          <ErrorMessage
                            name="form_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="prefix">Enter Prefix</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="prefix"
                            id="prefix"
                            placeholder="Enter Prefix"
                            className={
                              "form-control" +
                              (formProps.errors.prefix &&
                              formProps.touched.prefix
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="prefix"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row style={{ justifyContent: "center" }}>
                      <Col md={4}>
                        <Button type="reset" color="danger" block>
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
            </ModalBody>
          </Modal>
        </CardHeader>
        <CardBody style={{ overflow: "scroll" }}>
          <table
            className="table table-sm text-center"
            style={{ fontSize: "12px", overflow: "scroll" }}
          >
            <thead>
              <tr>
                <th scope="col">Form Name</th>
                <th scope="col">Department Name</th>

                <th scope="col">Prefix</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody style={{ textTransform: "uppercase" }}>
              {props.prefix?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader2 color={"primary"} />
                  </td>
                </tr>
              ) : props.prefix?.prefix?.length > 0 ? (
                props.prefix?.prefix
                  ?.slice(
                    state.pageIndex * state.pageSize,
                    state.pageIndex * state.pageSize + state.pageSize
                  )
                  .map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.form ? user.form.name : null}</td>
                        <td>{user.department ? user.department.name : null}</td>
                        <td>{user.prefix}</td>

                        <td className="d-flex justify-content-center">
                          <EditPrefix data={user} />

                          <Button
                            className="btn-danger ml-3 p-1"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this Prefix?"
                                )
                              )
                                props.onDeletePrefix(data, user.id);
                            }}
                          >
                            <i
                              className="fa fa-trash-alt "
                              value={user.id}
                              aria-hidden="true"
                            ></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={3}>No Prefixs</td>
                </tr>
              )}
            </tbody>
            <nav>
              <Pagination>
                <PaginationItem>
                  <PaginationLink
                    previous
                    tag="button"
                    onClick={(event) => handlePrevPageClick(event)}
                  >
                    Back
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    next
                    tag="button"
                    onClick={(event) => handleNextPageClick(event)}
                  >
                    Next
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </nav>
          </table>
        </CardBody>
      </Card>
    );
  else if (props.login?.login?.user?.role == "user")
    return (
      <Card>
        <CardHeader className="bg-warning text-white">
          <div className="">
            <strong>Preventive Maintenance Record</strong>
            {createStatus && (
              <Button
                className="btn-success  float-right"
                onClick={() => {
                  toggle();
                }}
              >
                Add Preventive Maintenance Record
              </Button>
            )}
          </div>
          <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Add New Preventive Maintenance Record
            </ModalHeader>

            <ModalBody>
              <Formik
                initialValues={{
                  form_id: "",
                  department_id: "",
                  prefix: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  form_id: Yup.string().required("Form Name is required"),
                  department_id: Yup.string().required(
                    "Department is required"
                  ),
                  prefix: Yup.string().required("Prefix is required"),
                })}
              >
                {(formProps) => (
                  <Form>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="department_id">Select Department</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="department_id"
                            id="department_id"
                            className={
                              "form-control" +
                              (formProps.errors.department_id &&
                              formProps.touched.department_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option>select</option>
                            {props.department?.map((dep) => (
                              <option key={dep.id} value={dep.id}>
                                {dep.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="department_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>

                      <Col md={6}>
                        <Label for="discount">Select Form</Label>
                        <InputGroup>
                          <Field
                            component={CustomSelect}
                            type="select"
                            name="form_id"
                            id="form_id"
                            className={
                              "form-control" +
                              (formProps.errors.form_id &&
                              formProps.touched.form_id
                                ? " is-invalid"
                                : "")
                            }
                          >
                            <option>select Form</option>
                            {props.form?.map((form) => {
                              if (
                                formProps.values.department_id ===
                                form.department_id
                              ) {
                                return (
                                  <option key={form.id} value={form.id}>
                                    {form.name}
                                  </option>
                                );
                              }
                              return <div></div>;
                            })}
                          </Field>

                          <ErrorMessage
                            name="form_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={6}>
                        <Label for="prefix">Enter Prefix</Label>
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="prefix"
                            id="prefix"
                            placeholder="Enter Prefix"
                            className={
                              "form-control" +
                              (formProps.errors.prefix &&
                              formProps.touched.prefix
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="prefix"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row style={{ justifyContent: "center" }}>
                      <Col md={4}>
                        <Button type="reset" color="danger" block>
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
            </ModalBody>
          </Modal>
        </CardHeader>
        <CardBody style={{ overflow: "scroll" }}>
          <table
            className="table table-sm text-center"
            style={{ fontSize: "12px", overflow: "scroll" }}
          >
            <thead>
              <tr>
                <th scope="col">Form Name</th>
                <th scope="col">Department Name</th>

                <th scope="col">Prefix</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody style={{ textTransform: "uppercase" }}>
              {props.prefix?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader2 color={"primary"} />
                  </td>
                </tr>
              ) : props.prefix?.prefix?.length > 0 ? (
                props.prefix?.prefix
                  ?.slice(
                    state.pageIndex * state.pageSize,
                    state.pageIndex * state.pageSize + state.pageSize
                  )
                  .map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.form ? user.form.name : null}</td>
                        <td>{user.department ? user.department.name : null}</td>
                        <td>{user.prefix}</td>

                        <td className="d-flex justify-content-center">
                          {updateStatus && <EditPrefix data={user} />}
                          {deleteStatus && (
                            <Button
                              className="btn-danger ml-3 p-1"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you wish to delete this Prefix?"
                                  )
                                )
                                  props.onDeletePrefix(data, user.id);
                              }}
                            >
                              <i
                                className="fa fa-trash-alt "
                                value={user.id}
                                aria-hidden="true"
                              ></i>
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={3}>No Prefixs</td>
                </tr>
              )}
            </tbody>
            <nav>
              <Pagination>
                <PaginationItem>
                  <PaginationLink
                    previous
                    tag="button"
                    onClick={(event) => handlePrevPageClick(event)}
                  >
                    Back
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    next
                    tag="button"
                    onClick={(event) => handleNextPageClick(event)}
                  >
                    Next
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </nav>
          </table>
        </CardBody>
      </Card>
    );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    prefix: state.prefix,
    department: state.department.department,
    form: state.form.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDepartmentGetData: (data) => dispatch(actions.departmentGetData(data)),
    onFormGetData: (data) => dispatch(actions.formGetData(data)),
    onPrefixGetData: (data) => dispatch(actions.prefixGetData(data)),
    onDeletePrefix: (data, id) => dispatch(actions.deletePrefix(data, id)),
    onPostPrefixData: (data, user, toggle) =>
      dispatch(actions.postPrefixData(data, user, toggle)),
    updatePrefixDataToggle: (data, user, toggle) =>
      dispatch(actions.updatePrefixDataToggle(data, user, toggle)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreventiveMaintenanceRecord);
