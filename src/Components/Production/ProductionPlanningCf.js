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
  FormGroup,
  InputGroupAddon,
  Table,
  ModalFooter,
} from "reactstrap";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import CustomInput from "../../views/Custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../reduxStore/actions";
import CustomSelect from "../../views/Custom/CustomSelect";
import Loader2 from "../loader/Loader2";
import planningImg from "../../assets/img/planning.png";
import ViewProductionPlanningCf from "./views/ViewProductionPlanningCf";

import printJS from "print-js";
import "../../css/Format.css";

function ProductionPlanningCf(props) {
  let data = {
    token: props.login?.login?.token,
  };

  const [modal, setModal] = useState(false);
  const [showtable, setShowTable] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setShowTable(false);
  };

  const [prefix, setPrefix] = useState([]);

  const [deleteStatus, setDeleteStatus] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [printStatus, setPrintStatus] = useState(false);

  useEffect(() => {
    props.onDepartmentGetData(data);
    props.onFormGetData(data);
    props.onProdPlanCfGetData(data);
    props.onPrefixGetData(data);
    props.onAccountNameGetData(data);
    props.onItemNameGetData(data);
    settingPrefix();
    status();
  }, []);

  function settingPrefix() {
    props.prefix?.map((pre) => {
      if (pre.form_id == 19 && pre.department_id == 7) {
        setPrefix(pre);
      }
    });
  }

  console.log(`prefix`, prefix);

  function status() {
    props.login?.login?.user?.rights?.map((right) => {
      if (right.form_id == 19) {
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

  const printMutliple = () => {
    console.log("print");
    printJS({
      printable: "htmlToPdf2",
      type: "html",
      scanStyles: true,
      targetStyles: "[*]",
      honorMarginPadding: false,
      maxWidth: 1080,
      font_size: "8pt",
      // style: "@page { size: Letter landscape; }",
    });
  };

  let user;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Bio Data:", values);

    user = {
      // form_id: values.form_id,
      // title: values.title,
      // rev_no: values.rev_no,
      // department_id: values.department_id,
      // di_no: values.di_no,
      details: values.details,
    };
    console.log("Data of User of details:", user);
    props.postProdPlanCfData(data, user, toggle, setSubmitting, setShowTable);
    setSubmitting(true);
    // setShowTable(true);
    return;
  };

  if (props.login?.login?.user?.role == "admin")
    return (
      <Card>
        <CardHeader className="bg-warning text-white">
          <div className="">
            <strong>Production Planning Cf</strong>

            <Button
              className="btn-success  float-right"
              onClick={() => {
                toggle();
              }}
            >
              Add Production Planning Cf
            </Button>
          </div>
          <Modal className="modal-info modal-xl" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Add New Production Planning Cf
            </ModalHeader>
            {props.prodPlanCf?.isPostLoading ? <Loader2 /> : ""}
            <ModalBody>
              <Formik
                initialValues={{
                  form_id: 19,
                  department_id: 7,
                  prefix_id: "",
                  di_no: "",
                  title: "",
                  rev_no: "",
                  rev_date: "",
                  date: "",
                  // ref_no: "",
                  details: [],
                  row: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  date: Yup.string().required("Date is required"),
                })}
              >
                {(formProps) => {
                  props.prefix?.map((pre) => {
                    if (
                      pre.form_id == formProps.values.form_id &&
                      pre.department_id == formProps.values.department_id
                    ) {
                      formProps.values.title = pre.title;
                      formProps.values.di_no = pre.di_no;
                      formProps.values.rev_no = pre.rev_no;
                      formProps.values.prefix_id = pre.id;
                      formProps.values.rev_date = pre.rev_date;
                    }
                  });

                  return !showtable ? (
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
                                if (dep.id == 11)
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
                          <Label for="rev_date">Rev Date</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="date"
                              name="rev_date"
                              id="rev_date"
                              disabled
                              className={
                                "form-control" +
                                (formProps.errors.rev_date &&
                                formProps.touched.rev_date
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="rev_date"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="date">Date</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="date"
                              name="date"
                              id="date"
                              placeholder="Enter date"
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
                      </Row>
                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="row">Add Table Rows</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="number"
                              name="row"
                              id="row"
                              placeholder="Enter Table rows"
                              className={
                                "form-control" +
                                (formProps.errors.row && formProps.touched.row
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="row"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12}>
                          <FieldArray
                            name="details"
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
                                            onClick={() => {
                                              for (
                                                let i = 1;
                                                i <= formProps.values.row;
                                                i++
                                              ) {
                                                arrayHelpers.push({
                                                  form_id:
                                                    formProps.values.form_id,
                                                  prefix_id:
                                                    formProps.values.prefix_id,
                                                  date: formProps.values.date,
                                                  customer_name: "",
                                                  so_no: "",
                                                  grade: "",
                                                  colour: "",
                                                  width: "",
                                                  thickness: "",
                                                  length: "",
                                                  slitt_size: "",
                                                  no_of_rolls: "",
                                                  qty: "",
                                                  actual_production: "",
                                                  balance: "",
                                                  cf: "",
                                                  remarks: "",
                                                });
                                              }
                                            }}
                                          >
                                            Add Rows
                                          </Button>
                                        </InputGroupAddon>
                                      </InputGroup>
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <div style={{ overflow: "scroll" }}>
                                  <Table size="sm" className="text-center">
                                    <thead>
                                      <tr>
                                        <th>Customer Name</th>
                                        <th>SO.NO</th>
                                        <th>Grade</th>
                                        <th>Colour</th>
                                        <th>Width (MM)</th>
                                        <th>Thickness (MM)</th>
                                        <th>Length (Metre)</th>
                                        <th>No. of Rolls</th>
                                        <th>Quantity (kG)</th>
                                        <th>Slitt Size (MM)</th>
                                        <th>Actual Production</th>
                                        <th>Balance</th>
                                        <th>C/F</th>
                                        <th>Remarks</th>
                                      </tr>
                                    </thead>
                                    <tbody className="text-center">
                                      {console.log(
                                        "values",
                                        formProps?.values?.details
                                      )}
                                      {formProps?.values?.details?.map(
                                        (detail, index) => {
                                          return (
                                            <tr
                                              key={index}
                                              className="text-center"
                                            >
                                              <td>
                                                <Field
                                                  component={CustomSelect}
                                                  type="select"
                                                  name={`details.${index}.customer_name`}
                                                  id="customer_name"
                                                  style={{ width: "150px" }}
                                                >
                                                  <option value="">
                                                    Select Customer Name
                                                  </option>
                                                  {props.accountName?.map(
                                                    (acc) => (
                                                      <option
                                                        key={acc.id}
                                                        value={acc.name}
                                                      >
                                                        {acc.name}
                                                      </option>
                                                    )
                                                  )}
                                                </Field>
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.so_no`}
                                                  id={`details.${index}.so_no`}
                                                  style={{ width: "50px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomSelect}
                                                  type="select"
                                                  name={`details.${index}.grade`}
                                                  id={`details.${index}.grade`}
                                                  style={{ width: "100px" }}
                                                >
                                                  <option value="">
                                                    Select Grade
                                                  </option>
                                                  {props.itemName?.map(
                                                    (item) => (
                                                      <option
                                                        key={item.id}
                                                        value={item.name}
                                                      >
                                                        {item.name}
                                                      </option>
                                                    )
                                                  )}
                                                </Field>
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.colour`}
                                                  id={`details.${index}.colour`}
                                                  style={{ width: "100px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.width`}
                                                  id={`details.${index}.width`}
                                                  style={{ width: "50px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.thickness`}
                                                  id={`details.${index}.thickness`}
                                                  style={{ width: "50px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.length`}
                                                  id={`details.${index}.length`}
                                                  style={{ width: "50px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.slitt_size`}
                                                  id={`details.${index}.slitt_size`}
                                                  style={{ width: "50px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.no_of_rolls`}
                                                  id={`details.${index}.no_of_rolls`}
                                                  style={{ width: "100px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="number"
                                                  name={`details.${index}.qty`}
                                                  id={`details.${index}.qty`}
                                                  style={{ width: "100px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.actual_production`}
                                                  id={`details.${index}.actual_production`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.balance`}
                                                  id={`details.${index}.balance`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.cf`}
                                                  id={`details.${index}.cf`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.remarks`}
                                                  id={`details.${index}.remarks`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                    </tbody>
                                  </Table>
                                </div>
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
                  ) : (
                    <>
                      <div
                        id="htmlToPdf2"
                        className="d-flex flex-column flex-wrap f-10 w-100"
                      >
                        <div className="d-flex test">
                          <div className="w-25 test-r p-1 text-center">
                            <img
                              src="https://uditsolutions.in/vinraj.png"
                              alt=""
                            />
                          </div>
                          <div className="w-50 test-r">
                            <img
                              src={planningImg}
                              alt="DAILY PRODUCTION PLANNING SHEET."
                              style={{
                                objectFit: "contain",
                                maxWidth: "600px",
                                position: "relative",
                                top: "15px",
                                left: "-140px",
                              }}
                            />
                          </div>
                          <div className="w-25 f-12 p-0 text-center d-flex flex-column justify-content-between">
                            <div className="d-flex">
                              <th className="w-40">Di.No: </th>
                              <td className="w-60">
                                {formProps.values?.di_no}
                              </td>
                            </div>
                            <div className="d-flex">
                              <th className="w-40">Rev. No.: </th>
                              <td className="w-60">
                                {formProps.values?.rev_no}
                              </td>
                            </div>
                            <div className="d-flex">
                              <th className="w-50">Rev. Date: </th>
                              <td className="w-60">
                                {formProps.values?.rev_date}
                              </td>
                            </div>
                          </div>
                        </div>

                        <div className="test w-100">
                          <div className="d-flex mb-1 w-100">
                            <div className="ml-3 w-50">
                              <span className="">Date: </span>
                              <span>
                                {props.prodPlanCf?.postProdPlanCf?.date}
                              </span>
                            </div>
                            <div className="ml-3 w-50">
                              <span className="">Ref No: </span>
                              <span>
                                {props.prodPlanCf?.postProdPlanCf?.ref_no}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-100">
                          <table className="table-sm w-100">
                            <thead className="w-50">
                              <tr className="w-100">
                                <th className="test">Sr No.</th>
                                <th className="test">Customer Name</th>
                                <th className="test">SO NO</th>
                                <th className="test">GRADE</th>
                                <th className="test">COLOUR</th>
                                <th className="test">WIDTH (MM)</th>
                                <th className="test">THICKNESS (MM)</th>
                                <th className="test">LENGTH (METRE)</th>
                                <th className="test">NO. OF ROLLS</th>

                                <th className="test">QUANTITY (KG)</th>
                                <th className="test">SLITT SIZE (MM)</th>
                                <th className="test">ACTUAL PRODUCTION</th>
                                <th className="test">BALANCE</th>
                                <th className="test">C/F</th>
                                <th className="test">REMARKS</th>
                              </tr>
                            </thead>
                            <tbody className="w-50">
                              {formProps.values?.details?.map((de, index) => {
                                return (
                                  <tr key={index} className="w-100">
                                    <td className="test">{index + 1}</td>

                                    <td className="test">{de.customer_name}</td>
                                    <td className="test">{de.so_no}</td>
                                    <td className="test"> {de.grade}</td>
                                    <td className="test">{de.colour} </td>

                                    <td className="test">{de.width}</td>
                                    <td className="test">{de.thickness}</td>
                                    <td className="test">{de.length}</td>
                                    <td className="test">{de.no_rolls}</td>
                                    <td className="test">{de.qty}</td>
                                    <td className="test">{de.slitt_size}</td>
                                    <td className="test">
                                      {de.actual_production}
                                    </td>
                                    <td className="test">{de.balance}</td>
                                    <td className="test">{de.cf}</td>

                                    <td className="test">{de.remarks}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {(printStatus ||
                        props.login?.login?.user?.role == "admin") && (
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={() => setModal(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={printMutliple}
                          >
                            Print
                          </button>
                        </div>
                      )}
                    </>
                  );
                }}
              </Formik>
            </ModalBody>
            <ModalFooter>
              {props.prodPlanCf?.isPostLoading ? <Loader2 /> : ""}
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
                {/* <th>ID</th> */}

                <th scope="col">Title</th>
                <th scope="col">Rev no</th>
                <th scope="col">Rev Date</th>
                <th scope="col">Date</th>
                <th scope="col">Ref no</th>
                {/* <th scope="col">Customer Name</th>
                <th scope="col">Contact No</th>
                <th scope="col">Email</th> */}
                <th scope="col">View</th>

                {/* <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {props.prodPlanCf?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader2 color={"primary"} />
                  </td>
                </tr>
              ) : props.prodPlanCf?.prodPlanCf?.length > 0 ? (
                props.prodPlanCf?.prodPlanCf.map((user, index) => {
                  if (user.ref_no !== null)
                    return (
                      <tr key={index}>
                        <td>{prefix?.title}</td>
                        <td>{prefix?.rev_no}</td>
                        <td>{prefix?.rev_date}</td>
                        <td>{user?.data[0]?.date}</td>
                        <td>{user.ref_no}</td>
                        <td>
                          <ViewProductionPlanningCf
                            data={prefix}
                            formdata={user}
                            printStatus={printStatus}
                            ref_no={user.ref_no}
                            date={user?.data[index]?.date}
                          />{" "}
                        </td>
                        {/* <td className="d-flex justify-content-center">
                            {updateStatus ||
                              (props.login?.login?.user?.role == "admin" && (
                                <EditPurchaseRequisition
                                  data={form}
                                  formdata={user}
                                />
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
                                    props.deleteDetails(data);
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
                         */}
                      </tr>
                    );
                  // });
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
            <strong>Production Planning Cf</strong>
            {createStatus && (
              <Button
                className="btn-success  float-right"
                onClick={() => {
                  toggle();
                }}
              >
                Add Production Planning Cf
              </Button>
            )}
          </div>
          <Modal className="modal-info modal-xl" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Add New Production Planning Cf
            </ModalHeader>
            {props.prodPlanCf?.isPostLoading ? <Loader2 /> : ""}
            <ModalBody>
              <Formik
                initialValues={{
                  form_id: 19,
                  department_id: 7,
                  prefix_id: "",
                  di_no: "",
                  title: "",
                  rev_no: "",
                  rev_date: "",
                  date: "",
                  // ref_no: "",
                  details: [],
                  row: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  date: Yup.string().required("Date is required"),
                })}
              >
                {(formProps) => {
                  props.prefix?.map((pre) => {
                    if (
                      pre.form_id == formProps.values.form_id &&
                      pre.department_id == formProps.values.department_id
                    ) {
                      formProps.values.title = pre.title;
                      formProps.values.di_no = pre.di_no;
                      formProps.values.rev_no = pre.rev_no;
                      formProps.values.prefix_id = pre.id;
                      formProps.values.rev_date = pre.rev_date;
                    }
                  });

                  return !showtable ? (
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
                                if (dep.id == 11)
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
                          <Label for="rev_date">Rev Date</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="date"
                              name="rev_date"
                              id="rev_date"
                              disabled
                              className={
                                "form-control" +
                                (formProps.errors.rev_date &&
                                formProps.touched.rev_date
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="rev_date"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="date">Date</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="date"
                              name="date"
                              id="date"
                              placeholder="Enter date"
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
                      </Row>
                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="row">Add Table Rows</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="number"
                              name="row"
                              id="row"
                              placeholder="Enter Table rows"
                              className={
                                "form-control" +
                                (formProps.errors.row && formProps.touched.row
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="row"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12}>
                          <FieldArray
                            name="details"
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
                                            onClick={() => {
                                              for (
                                                let i = 1;
                                                i <= formProps.values.row;
                                                i++
                                              ) {
                                                arrayHelpers.push({
                                                  form_id:
                                                    formProps.values.form_id,
                                                  prefix_id:
                                                    formProps.values.prefix_id,
                                                  date: formProps.values.date,
                                                  customer_name: "",
                                                  so_no: "",
                                                  grade: "",
                                                  colour: "",
                                                  width: "",
                                                  thickness: "",
                                                  length: "",
                                                  slitt_size: "",
                                                  no_of_rolls: "",
                                                  qty: "",
                                                  actual_production: "",
                                                  balance: "",
                                                  cf: "",
                                                  remarks: "",
                                                });
                                              }
                                            }}
                                          >
                                            Add Rows
                                          </Button>
                                        </InputGroupAddon>
                                      </InputGroup>
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <div style={{ overflow: "scroll" }}>
                                  <Table size="sm" className="text-center">
                                    <thead>
                                      <tr>
                                        <th>Customer Name</th>
                                        <th>SO.NO</th>
                                        <th>Grade</th>
                                        <th>Colour</th>
                                        <th>Width (MM)</th>
                                        <th>Thickness (MM)</th>
                                        <th>Length (Metre)</th>
                                        <th>No. of Rolls</th>
                                        <th>Quantity (kG)</th>
                                        <th>Slitt Size (MM)</th>
                                        <th>Actual Production</th>
                                        <th>Balance</th>
                                        <th>C/F</th>
                                        <th>Remarks</th>
                                      </tr>
                                    </thead>
                                    <tbody className="text-center">
                                      {console.log(
                                        "values",
                                        formProps?.values?.details
                                      )}
                                      {formProps?.values?.details?.map(
                                        (detail, index) => {
                                          return (
                                            <tr
                                              key={index}
                                              className="text-center"
                                            >
                                              <td>
                                                <Field
                                                  component={CustomSelect}
                                                  type="select"
                                                  name={`details.${index}.customer_name`}
                                                  id="customer_name"
                                                  style={{ width: "150px" }}
                                                >
                                                  <option value="">
                                                    Select Customer Name
                                                  </option>
                                                  {props.accountName?.map(
                                                    (acc) => (
                                                      <option
                                                        key={acc.id}
                                                        value={acc.name}
                                                      >
                                                        {acc.name}
                                                      </option>
                                                    )
                                                  )}
                                                </Field>
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.so_no`}
                                                  id={`details.${index}.so_no`}
                                                  style={{ width: "50px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomSelect}
                                                  type="select"
                                                  name={`details.${index}.grade`}
                                                  id={`details.${index}.grade`}
                                                  style={{ width: "100px" }}
                                                >
                                                  <option value="">
                                                    Select Grade
                                                  </option>
                                                  {props.itemName?.map(
                                                    (item) => (
                                                      <option
                                                        key={item.id}
                                                        value={item.name}
                                                      >
                                                        {item.name}
                                                      </option>
                                                    )
                                                  )}
                                                </Field>
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.colour`}
                                                  id={`details.${index}.colour`}
                                                  style={{ width: "100px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.width`}
                                                  id={`details.${index}.width`}
                                                  style={{ width: "50px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.thickness`}
                                                  id={`details.${index}.thickness`}
                                                  style={{ width: "50px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.length`}
                                                  id={`details.${index}.length`}
                                                  style={{ width: "50px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.slitt_size`}
                                                  id={`details.${index}.slitt_size`}
                                                  style={{ width: "50px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.no_of_rolls`}
                                                  id={`details.${index}.no_of_rolls`}
                                                  style={{ width: "100px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="number"
                                                  name={`details.${index}.qty`}
                                                  id={`details.${index}.qty`}
                                                  style={{ width: "100px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.actual_production`}
                                                  id={`details.${index}.actual_production`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.balance`}
                                                  id={`details.${index}.balance`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.cf`}
                                                  id={`details.${index}.cf`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.remarks`}
                                                  id={`details.${index}.remarks`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                    </tbody>
                                  </Table>
                                </div>
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
                  ) : (
                    <>
                      <div
                        id="htmlToPdf2"
                        className="d-flex flex-column flex-wrap f-10 w-100"
                      >
                        <div className="d-flex test">
                          <div className="w-25 test-r p-1 text-center">
                            <img
                              src="https://uditsolutions.in/vinraj.png"
                              alt=""
                            />
                          </div>
                          <div className="w-50 test-r d-flex justify-content-center align-items-center">
                            <h5 className="font-weight-bold text-underline">
                              DAILY PRODUCTION PLANNING SHEET.
                            </h5>
                          </div>
                          <div className="w-25 f-12 p-0 text-center d-flex flex-column justify-content-between">
                            <div className="d-flex">
                              <th className="w-40">Di.No: </th>
                              <td className="w-60">
                                {formProps.values?.di_no}
                              </td>
                            </div>
                            <div className="d-flex">
                              <th className="w-40">Rev. No.: </th>
                              <td className="w-60">
                                {formProps.values?.rev_no}
                              </td>
                            </div>
                            <div className="d-flex">
                              <th className="w-50">Rev. Date: </th>
                              <td className="w-60">
                                {formProps.values?.rev_date}
                              </td>
                            </div>
                          </div>
                        </div>

                        <div className="test w-100">
                          <div className="d-flex mb-1 w-100">
                            <div className="ml-3 w-50">
                              <span className="">Date: </span>
                              <span>
                                {props.prodPlanCf?.postProdPlanCf?.date}
                              </span>
                            </div>
                            <div className="ml-3 w-50">
                              <span className="">Ref No: </span>
                              <span>
                                {props.prodPlanCf?.postProdPlanCf?.ref_no}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-100">
                          <table className="table-sm w-100">
                            <thead className="w-50">
                              <tr className="w-100">
                                <th className="test">Sr No.</th>
                                <th className="test">Customer Name</th>
                                <th className="test">SO NO</th>
                                <th className="test">GRADE</th>
                                <th className="test">COLOUR</th>
                                <th className="test">WIDTH (MM)</th>
                                <th className="test">THICKNESS (MM)</th>
                                <th className="test">LENGTH (METRE)</th>
                                <th className="test">NO. OF ROLLS</th>

                                <th className="test">QUANTITY (KG)</th>
                                <th className="test">SLITT SIZE (MM)</th>
                                <th className="test">ACTUAL PRODUCTION</th>
                                <th className="test">BALANCE</th>
                                <th className="test">C/F</th>
                                <th className="test">REMARKS</th>
                              </tr>
                            </thead>
                            <tbody className="w-50">
                              {formProps.values?.details?.map((de, index) => {
                                return (
                                  <tr key={index} className="w-100">
                                    <td className="test">{index + 1}</td>

                                    <td className="test">{de.customer_name}</td>
                                    <td className="test">{de.so_no}</td>
                                    <td className="test"> {de.grade}</td>
                                    <td className="test">{de.colour} </td>

                                    <td className="test">{de.width}</td>
                                    <td className="test">{de.thickness}</td>
                                    <td className="test">{de.length}</td>
                                    <td className="test">{de.no_rolls}</td>
                                    <td className="test">{de.qty}</td>
                                    <td className="test">{de.slitt_size}</td>
                                    <td className="test">
                                      {de.actual_production}
                                    </td>
                                    <td className="test">{de.balance}</td>
                                    <td className="test">{de.cf}</td>

                                    <td className="test">{de.remarks}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {(printStatus ||
                        props.login?.login?.user?.role == "admin") && (
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={() => setModal(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={printMutliple}
                          >
                            Print
                          </button>
                        </div>
                      )}
                    </>
                  );
                }}
              </Formik>
            </ModalBody>
            <ModalFooter>
              {props.prodPlanCf?.isPostLoading ? <Loader2 /> : ""}
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
                {/* <th>ID</th> */}

                <th scope="col">Title</th>
                <th scope="col">Rev no</th>
                <th scope="col">Rev Date</th>
                <th scope="col">Date</th>
                <th scope="col">Ref no</th>
                {/* <th scope="col">Customer Name</th>
                <th scope="col">Contact No</th>
                <th scope="col">Email</th> */}
                <th scope="col">View</th>

                {/* <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {props.prodPlanCf?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader2 color={"primary"} />
                  </td>
                </tr>
              ) : props.prodPlanCf?.prodPlanCf?.length > 0 ? (
                props.prodPlanCf?.prodPlanCf.map((user, index) => {
                  if (user.ref_no !== null)
                    return (
                      <tr key={index}>
                        <td>{prefix?.title}</td>
                        <td>{prefix?.rev_no}</td>
                        <td>{prefix?.rev_date}</td>
                        <td>{user?.data[0]?.date}</td>
                        <td>{user.ref_no}</td>
                        <td>
                          <ViewProductionPlanningCf
                            data={prefix}
                            formdata={user}
                            printStatus={printStatus}
                            ref_no={user.ref_no}
                            date={user?.data[index]?.date}
                          />{" "}
                        </td>
                        {/* <td className="d-flex justify-content-center">
                            {updateStatus ||
                              (props.login?.login?.user?.role == "admin" && (
                                <EditPurchaseRequisition
                                  data={form}
                                  formdata={user}
                                />
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
                                    props.deleteDetails(data);
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
                         */}
                      </tr>
                    );
                  // });
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
    prefix: state.prefix.prefix,
    department: state.department.department,
    form: state.form.form,
    details: state.details,
    prodPlanCf: state.prodPlanCf,
    accountName: state.accountName.accountName,
    itemName: state.itemName.itemName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAccountNameGetData: (data) => dispatch(actions.accountNameGetData(data)),
    onItemNameGetData: (data) => dispatch(actions.itemNameGetData(data)),
    onDepartmentGetData: (data) => dispatch(actions.departmentGetData(data)),
    onFormGetData: (data) => dispatch(actions.formGetData(data)),
    onPrefixGetData: (data) => dispatch(actions.prefixGetData(data)),
    onProdPlanCfGetData: (data) => dispatch(actions.prodPlanCfGetData(data)),
    onDeleteProdPlanCf: (data, id) =>
      dispatch(actions.deleteProdPlanCf(data, id)),

    postProdPlanCfData: (data, user, toggle, setSubmitting, setShowTable) =>
      dispatch(
        actions.postProdPlanCfData(
          data,
          user,
          toggle,
          setSubmitting,
          setShowTable
        )
      ),
    updateProdPlanCfData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateProdPlanCfData(data, user, toggle, setSubmitting)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductionPlanningCf);
