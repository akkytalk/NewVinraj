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
  ModalFooter,
} from "reactstrap";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../views/Custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../reduxStore/actions";
import CustomSelect from "../../views/Custom/CustomSelect";

import Loader2 from "../loader/Loader2";
import EditBreakdownMaintenanceRecord from "./Edit/EditBreakdownMaintenanceRecord";

function BreakdownMaintenanceRecord(props) {
  let data = {
    token: props.login?.login?.token,
  };

  const [deleteStatus, setDeleteStatus] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [printStatus, setPrintStatus] = useState(false);

  useEffect(() => {
    props.onDepartmentGetData(data);
    props.onFormGetData(data);
    props.onPrefixGetData(data);
    props.onBreakMainRecordGetData(data);
    status();
  }, []);

  function status() {
    props.login?.login?.user?.rights?.map((right) => {
      if (right.form_id == 17) {
        if (right.create_status == 1) {
          setCreateStatus(true);
        }
        if (right.update_status == 1) {
          setUpdateStatus(true);
        }
        if (right.delete_status == 1) {
          setDeleteStatus(true);
        }
        if (right.print_status == 1) {
          setPrintStatus(true);
        }
      }
    });
  }

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  let user;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Bio Data:", values);

    user = {
      form_id: values.form_id,

      date: values.date,
      machine: values.machine,
      equipments: values.equipment,
      action: values.action,
      components: values.component,
      problem: values.problem,
      parts_spec: values.parts_specs,
      vendor: values.vendor,
      amount: values.amount,
      attend_by: values.attend_by,
      remarks: values.remarks,
    };
    console.log(
      "Data of User of Breakdown Maintenance Record Post Data:",
      user
    );
    props.onPostBreakMainRecordData(data, user, toggle, setSubmitting);
    setSubmitting(true);

    return;
  };

  if (props.login?.login?.user?.role == "admin")
    return (
      <Card>
        <CardHeader className="bg-warning text-white">
          <div className="">
            <strong>Breakdown Maintenance Record</strong>

            <Button
              className="btn-success  float-right"
              onClick={() => {
                toggle();
              }}
            >
              Add Breakdown Maintenance Record
            </Button>
          </div>
          <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Add New Breakdown Maintenance Record
            </ModalHeader>
            {props.breakMainRecord?.isPostLoading && <Loader2 />}
            <ModalBody>
              <Formik
                initialValues={{
                  form_id: 17,
                  department_id: 6,
                  di_no: "",
                  title: "",
                  rev_no: "",
                  date: "",
                  machine: "",
                  equipment: "",
                  component: "",
                  problem: "",
                  action: "",
                  parts_specs: "",
                  vendor: "",
                  amount: "",
                  attend_by: "",
                  remarks: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({})}
              >
                {(formProps) => {
                  props.prefix?.map((pre) => {
                    if (pre.form_id == 17 && pre.department_id == 6) {
                      formProps.values.title = pre.title;
                      formProps.values.di_no = pre.prefix;
                      formProps.values.rev_no = pre.rev_no;
                    }
                  });

                  return (
                    <Form>
                      <Row className="form-group">
                        <Col md={3}>
                          <Label for="department_id">Department</Label>
                          <InputGroup>
                            <Field
                              component={CustomSelect}
                              type="select"
                              list="userdatalist"
                              name="department_id"
                              id="department_id"
                              placeholder="Enter Title"
                              disabled
                              className={
                                "form-control" +
                                (formProps.errors.department_id &&
                                formProps.touched.department_id
                                  ? " is-invalid"
                                  : "")
                              }
                            >
                              {props.department?.map((dep) => {
                                if (dep.id == 6)
                                  return (
                                    <option value={dep.id}>{dep.name}</option>
                                  );
                              })}
                            </Field>
                          </InputGroup>
                        </Col>

                        <Col md={3}>
                          <Label for="di_no">Di No</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="di_no"
                              id="di_no"
                              placeholder="Enter di_no"
                              disabled
                              className={
                                "form-control" +
                                (formProps.errors.di_no &&
                                formProps.touched.di_no
                                  ? " is-invalid"
                                  : "")
                              }
                            ></Field>

                            <ErrorMessage
                              name="di_no"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={3}>
                          <Label for="title">Title</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="title"
                              id="title"
                              disabled
                              placeholder="Enter Title"
                              className={
                                "form-control" +
                                (formProps.errors.title &&
                                formProps.touched.title
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="title"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={3}>
                          <Label for="rev_no">Rev no</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="rev_no"
                              id="rev_no"
                              placeholder="Enter rev_no"
                              disabled
                              className={
                                "form-control" +
                                (formProps.errors.rev_no &&
                                formProps.touched.rev_no
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="rev_no"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="date">Date</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="date"
                              name="date"
                              id="date"
                              placeholder="Enter Customer Name"
                              className={
                                "form-control" +
                                (formProps.errors.date && formProps.touched.date
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="date"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="machine">Machine</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="machine"
                              id="machine"
                              placeholder="Enter Machine"
                              className={
                                "form-control" +
                                (formProps.errors.machine &&
                                formProps.touched.machine
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="machine"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="equipment">Equipment</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="equipment"
                              id="equipment"
                              placeholder="Enter Equipment"
                              className={
                                "form-control" +
                                (formProps.errors.equipment &&
                                formProps.touched.equipment
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="equipment"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="component">Component</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="component"
                              id="component"
                              placeholder="Enter Component"
                              className={
                                "form-control" +
                                (formProps.errors.component &&
                                formProps.touched.component
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="component"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="problem">Problem</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="problem"
                              id="problem"
                              placeholder="Enter Problem"
                              className={
                                "form-control" +
                                (formProps.errors.problem &&
                                formProps.touched.problem
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="problem"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="action">Action</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="action"
                              id="action"
                              placeholder="Enter Action"
                              className={
                                "form-control" +
                                (formProps.errors.action &&
                                formProps.touched.action
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="action"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="parts_specs">Parts Spec./make</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="parts_specs"
                              id="parts_specs"
                              placeholder="Enter Parts Spec./make"
                              className={
                                "form-control" +
                                (formProps.errors.parts_specs &&
                                formProps.touched.parts_specs
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="parts_specs"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="vendor">Vendor</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="vendor"
                              id="vendor"
                              placeholder="Enter Vendor"
                              className={
                                "form-control" +
                                (formProps.errors.vendor &&
                                formProps.touched.vendor
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="vendor"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="amount">Amount</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="amount"
                              id="amount"
                              placeholder="Enter Amount"
                              className={
                                "form-control" +
                                (formProps.errors.amount &&
                                formProps.touched.amount
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="amount"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="attend_by">Attend By</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="attend_by"
                              id="attend_by"
                              placeholder="Enter Attend By"
                              className={
                                "form-control" +
                                (formProps.errors.attend_by &&
                                formProps.touched.attend_by
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="attend_by"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="remarks">Remarks</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="remarks"
                              id="remarks"
                              placeholder="Enter Remarks"
                              className={
                                "form-control" +
                                (formProps.errors.remarks &&
                                formProps.touched.remarks
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="remarks"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
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
                  );
                }}
              </Formik>
            </ModalBody>
            <ModalFooter>
              {props.breakMainRecord?.isPostLoading && <Loader2 />}
            </ModalFooter>
          </Modal>
        </CardHeader>
        <CardBody style={{ overflow: "scroll" }}>
          <table
            className="table table-sm text-center"
            style={{ fontSize: "12px" }}
          >
            <thead className="table-sticky">
              <tr>
                <th scope="col">Sr no</th>
                <th scope="col">Date</th>
                <th scope="col">Machine</th>
                <th scope="col">Equipment</th>
                <th scope="col">Component:</th>
                <th scope="col">Problem</th>
                <th scope="col">Action</th>
                <th scope="col">Parts Spec./make</th>
                <th scope="col">Vendor</th>
                <th scope="col">Amount</th>
                <th scope="col">Attend by</th>
                <th scope="col">Remarks</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {props.breakMainRecord?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader2 color={"primary"} />
                  </td>
                </tr>
              ) : props.breakMainRecord?.breakMainRecord?.length > 0 ? (
                props.breakMainRecord?.breakMainRecord.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.date}</td>
                      <td>{user.machine}</td>
                      <td>{user.equipments}</td>
                      <td>{user.components}</td>
                      <td>{user.problem}</td>
                      <td>{user.action}</td>
                      <td>{user.parts_spec}</td>
                      <td>{user.vendor}</td>
                      <td>{user.amount}</td>
                      <td>{user.attend_by}</td>
                      <td>{user.remarks}</td>

                      <td className="d-flex justify-content-center">
                        {updateStatus ||
                          (props.login?.login?.user?.role == "admin" && (
                            <EditBreakdownMaintenanceRecord data={user} />
                          ))}
                        {(deleteStatus ||
                          props.login?.login?.user?.role == "admin") && (
                          <Button
                            className="btn-danger ml-3 p-1"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this Purchase Requisition?"
                                )
                              )
                                props.onDeleteBreakMainRecord(data, user.id);
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
                  <td colSpan={3}>No Forms Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    );
  else if (props.login?.login?.user?.role == "user")
    return (
      <Card>
        <CardHeader className="bg-warning text-white">
          <div className="">
            <strong>Breakdown Maintenance Record</strong>
            {createStatus && (
              <Button
                className="btn-success  float-right"
                onClick={() => {
                  toggle();
                }}
              >
                Add Breakdown Maintenance Record
              </Button>
            )}
          </div>
          <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Add New Breakdown Maintenance Record
            </ModalHeader>
            {props.breakMainRecord?.isPostLoading && <Loader2 />}
            <ModalBody>
              <Formik
                initialValues={{
                  form_id: 17,
                  department_id: 6,
                  di_no: "",
                  title: "",
                  rev_no: "",
                  date: "",
                  machine: "",
                  equipment: "",
                  component: "",
                  problem: "",
                  action: "",
                  parts_specs: "",
                  vendor: "",
                  amount: "",
                  attend_by: "",
                  remarks: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({})}
              >
                {(formProps) => {
                  props.breakMainRecord?.map((pre) => {
                    if (pre.form_id == 17 && pre.department_id == 6) {
                      formProps.values.title = pre.title;
                      formProps.values.di_no = pre.breakMainRecord;
                      formProps.values.rev_no = pre.rev_no;
                    }
                  });

                  return (
                    <Form>
                      <Row className="form-group">
                        <Col md={3}>
                          <Label for="department_id">Department</Label>
                          <InputGroup>
                            <Field
                              component={CustomSelect}
                              type="select"
                              list="userdatalist"
                              name="department_id"
                              id="department_id"
                              placeholder="Enter Title"
                              disabled
                              className={
                                "form-control" +
                                (formProps.errors.department_id &&
                                formProps.touched.department_id
                                  ? " is-invalid"
                                  : "")
                              }
                            >
                              {props.department?.map((dep) => {
                                if (dep.id == 6)
                                  return (
                                    <option value={dep.id}>{dep.name}</option>
                                  );
                              })}
                            </Field>
                          </InputGroup>
                        </Col>

                        <Col md={3}>
                          <Label for="di_no">Di No</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="di_no"
                              id="di_no"
                              placeholder="Enter di_no"
                              disabled
                              className={
                                "form-control" +
                                (formProps.errors.di_no &&
                                formProps.touched.di_no
                                  ? " is-invalid"
                                  : "")
                              }
                            ></Field>

                            <ErrorMessage
                              name="di_no"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={3}>
                          <Label for="title">Title</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="title"
                              id="title"
                              disabled
                              placeholder="Enter Title"
                              className={
                                "form-control" +
                                (formProps.errors.title &&
                                formProps.touched.title
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="title"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={3}>
                          <Label for="rev_no">Rev no</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="rev_no"
                              id="rev_no"
                              placeholder="Enter rev_no"
                              disabled
                              className={
                                "form-control" +
                                (formProps.errors.rev_no &&
                                formProps.touched.rev_no
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="rev_no"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="date">Date</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="date"
                              name="date"
                              id="date"
                              placeholder="Enter Customer Name"
                              className={
                                "form-control" +
                                (formProps.errors.date && formProps.touched.date
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="date"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="machine">Machine</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="machine"
                              id="machine"
                              placeholder="Enter Machine"
                              className={
                                "form-control" +
                                (formProps.errors.machine &&
                                formProps.touched.machine
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="machine"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="equipment">Equipment</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="equipment"
                              id="equipment"
                              placeholder="Enter Equipment"
                              className={
                                "form-control" +
                                (formProps.errors.equipment &&
                                formProps.touched.equipment
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="equipment"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="component">Component</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="component"
                              id="component"
                              placeholder="Enter Component"
                              className={
                                "form-control" +
                                (formProps.errors.component &&
                                formProps.touched.component
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="component"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="problem">Problem</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="problem"
                              id="problem"
                              placeholder="Enter Problem"
                              className={
                                "form-control" +
                                (formProps.errors.problem &&
                                formProps.touched.problem
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="problem"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="action">Action</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="action"
                              id="action"
                              placeholder="Enter Action"
                              className={
                                "form-control" +
                                (formProps.errors.action &&
                                formProps.touched.action
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="action"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="parts_specs">Parts Spec./make</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="parts_specs"
                              id="parts_specs"
                              placeholder="Enter Parts Spec./make"
                              className={
                                "form-control" +
                                (formProps.errors.parts_specs &&
                                formProps.touched.parts_specs
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="parts_specs"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="vendor">Vendor</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="vendor"
                              id="vendor"
                              placeholder="Enter Vendor"
                              className={
                                "form-control" +
                                (formProps.errors.vendor &&
                                formProps.touched.vendor
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="vendor"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="amount">Amount</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="amount"
                              id="amount"
                              placeholder="Enter Amount"
                              className={
                                "form-control" +
                                (formProps.errors.amount &&
                                formProps.touched.amount
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="amount"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="attend_by">Attend By</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="attend_by"
                              id="attend_by"
                              placeholder="Enter Attend By"
                              className={
                                "form-control" +
                                (formProps.errors.attend_by &&
                                formProps.touched.attend_by
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="attend_by"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="remarks">Remarks</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="remarks"
                              id="remarks"
                              placeholder="Enter Remarks"
                              className={
                                "form-control" +
                                (formProps.errors.remarks &&
                                formProps.touched.remarks
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="remarks"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
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
                  );
                }}
              </Formik>
            </ModalBody>
            <ModalFooter>
              {props.breakMainRecord?.isPostLoading && <Loader2 />}
            </ModalFooter>
          </Modal>
        </CardHeader>
        <CardBody style={{ overflow: "scroll" }}>
          <table
            className="table table-sm text-center"
            style={{ fontSize: "12px" }}
          >
            <thead className="table-sticky">
              <tr>
                <th scope="col">Sr no</th>
                <th scope="col">Date</th>
                <th scope="col">Machine</th>
                <th scope="col">Equipment</th>
                <th scope="col">Component:</th>
                <th scope="col">Problem</th>
                <th scope="col">Action</th>
                <th scope="col">Parts Spec./make</th>
                <th scope="col">Vendor</th>
                <th scope="col">Amount</th>
                <th scope="col">Attend by</th>
                <th scope="col">Remarks</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {props.breakMainRecord?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader2 color={"primary"} />
                  </td>
                </tr>
              ) : props.breakMainRecord?.breakMainRecord?.length > 0 ? (
                props.breakMainRecord?.breakMainRecord.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.date}</td>
                      <td>{user.machine}</td>
                      <td>{user.equipments}</td>
                      <td>{user.components}</td>
                      <td>{user.problem}</td>
                      <td>{user.action}</td>
                      <td>{user.parts_spec}</td>
                      <td>{user.vendor}</td>
                      <td>{user.amount}</td>
                      <td>{user.attend_by}</td>
                      <td>{user.remarks}</td>

                      <td className="d-flex justify-content-center">
                        {updateStatus && (
                          <EditBreakdownMaintenanceRecord data={user} />
                        )}
                        {deleteStatus && (
                          <Button
                            className="btn-danger ml-3 p-1"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this Purchase Requisition?"
                                )
                              )
                                props.onDeleteBreakMainRecord(data, user.id);
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
                  <td colSpan={3}>No Forms Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    breakMainRecord: state.breakMainRecord,
    department: state.department.department,
    form: state.form.form,
    prefix: state.prefix.prefix,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDepartmentGetData: (data) => dispatch(actions.departmentGetData(data)),
    onFormGetData: (data) => dispatch(actions.formGetData(data)),
    onPrefixGetData: (data) => dispatch(actions.prefixGetData(data)),
    onBreakMainRecordGetData: (data) =>
      dispatch(actions.breakMainRecordGetData(data)),
    onDeleteBreakMainRecord: (data, id) =>
      dispatch(actions.deleteBreakMainRecord(data, id)),
    onPostBreakMainRecordData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postBreakMainRecordData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreakdownMaintenanceRecord);
