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
  ModalFooter,
} from "reactstrap";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import CustomInput from "../../views/Custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../reduxStore/actions";
import CustomSelect from "../../views/Custom/CustomSelect";
import Loader2 from "../loader/Loader2";
import ViewSales from "./View/ViewSales";
import printJS from "print-js";

function EnquiryForm(props) {
  let data = {
    token: props.login?.login?.token,
  };

  const [modal, setModal] = useState(false);
  const [showtable, setShowTable] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setShowTable(false);
  };

  const [deleteStatus, setDeleteStatus] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [printStatus, setPrintStatus] = useState(false);

  useEffect(() => {
    props.onDepartmentGetData(data);
    props.onFormGetData(data);
    props.onEnquiriesFormGetData(data);
    props.onPrefixGetData(data);
    status();
  }, []);

  function status() {
    props.login?.login?.user?.rights?.map((right) => {
      if (right.form_id == 34) {
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
      CSS: "",
      type: "html",
      scanStyles: true,
      targetStyles: "[*]",
      honorMarginPadding: false,
      font_size: "12pt",
      maxWidth: 1080,
    });
  };
  let user;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Bio Data:", values);

    user = {
      form_id: values.form_id,
      title: values.title,
      rev_no: values.rev_no,
      rev_date: values.rev_date,
      date: values.date,
      customer_name: values.customer_name,
      prefix_id: values.prefix_id,

      contact_name: values.contact_name,
      contact_no: values.contact_no,
      payment_term: values.payment_term,
      reference: values.reference,
      address: values.h_o_address,
      remark: values.remarks,
      email: values.email,
      details: values.details,
      department_id: values.department_id,
      di_no: values.di_no,
    };
    console.log("Data of User of details:", user);
    props.onPostEnquiriesFormData(
      data,
      user,
      toggle,
      setSubmitting,
      setShowTable
    );
    setSubmitting(true);
    // setShowTable(true);
    return;
  };

  if (props.login?.login?.user?.role == "admin")
    return (
      <Card>
        <CardHeader className="bg-warning text-white">
          <div className="">
            <strong>Enquiry Form</strong>

            <Button
              className="btn-success  float-right"
              onClick={() => {
                toggle();
              }}
            >
              Add Enquiry Form
            </Button>
          </div>
          <Modal className="modal-info modal-xl" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add New Enquiry Form</ModalHeader>
            {props.enquiriesForm?.isPostLoading && <Loader2 />}
            <ModalBody>
              <Formik
                initialValues={{
                  form_id: 34,
                  department_id: 11,
                  prefix_id: "",
                  di_no: "",
                  title: "",
                  rev_no: "",
                  rev_date: "",
                  date: "",

                  customer_name: "",
                  h_o_address: "",
                  contact_name: "",
                  contact_no: "",
                  payment_term: "",
                  reference: "",
                  remarks: "",
                  email: "",
                  details: [],
                  row: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  customer_name: Yup.string().required(
                    "Customer Name is required"
                  ),
                  h_o_address: Yup.string().required("Address is required"),
                  contact_name: Yup.string().required(
                    "Contact Name is required"
                  ),
                  contact_no: Yup.string().required("Contact No is required"),
                  payment_term: Yup.string().required(
                    "Payment Term is required"
                  ),
                  reference: Yup.string().required("Reference is required"),
                  remarks: Yup.string().required("Remarks is required"),
                  email: Yup.string().required("Email is required"),
                })}
              >
                {(formProps) => {
                  props.prefix?.map((pre) => {
                    if (pre.form_id == 34 && pre.department_id == 11) {
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

                            {/* <ErrorMessage
                          name="department_id"
                          component="div"
                          className="invalid-feedback"
                        /> */}
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
                          <Label for="customer_name">Customer Name</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="customer_name"
                              id="customer_name"
                              placeholder="Enter Customer Name"
                              className={
                                "form-control" +
                                (formProps.errors.customer_name &&
                                formProps.touched.customer_name
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="customer_name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="h_o_address">H.O. Address</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="h_o_address"
                              id="h_o_address"
                              placeholder="Enter H.O. Address"
                              className={
                                "form-control" +
                                (formProps.errors.h_o_address &&
                                formProps.touched.h_o_address
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="h_o_address"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="contact_name">Contact Name</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="contact_name"
                              id="contact_name"
                              placeholder="Enter Contact Name"
                              className={
                                "form-control" +
                                (formProps.errors.contact_name &&
                                formProps.touched.contact_name
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="contact_name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="contact_no">Contact No</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="number"
                              name="contact_no"
                              id="contact_no"
                              placeholder="Enter Contact No."
                              className={
                                "form-control" +
                                (formProps.errors.contact_no &&
                                formProps.touched.contact_no
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="contact_no"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="email">Email Id</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Enter Email Id"
                              className={
                                "form-control" +
                                (formProps.errors.email &&
                                formProps.touched.email
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="payment_term">Payment Term</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="payment_term"
                              id="payment_term"
                              placeholder="Enter Payment Term."
                              className={
                                "form-control" +
                                (formProps.errors.payment_term &&
                                formProps.touched.payment_term
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="payment_term"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="reference">Reference</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="reference"
                              name="reference"
                              id="reference"
                              placeholder="Enter Reference"
                              className={
                                "form-control" +
                                (formProps.errors.reference &&
                                formProps.touched.reference
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="reference"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="remarks">Remarks</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="remarks"
                              id="remarks"
                              placeholder="Enter Remarks."
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
                                                  size: "",
                                                  thickness: "",
                                                  colour: "",
                                                  qty: "",
                                                  grade: "",
                                                  application: "",
                                                  location: "",
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
                                <div className="text-center test d-flex flex-column w-100">
                                  <div className="d-flex w-100">
                                    {/* <span className="test-b p-2 test-r w-25">
                    {" "}
                    Sr No.
                  </span> */}
                                    <div className="d-flex flex-column w-75">
                                      <span className="test-b test-r ">
                                        {" "}
                                        Requirement Details
                                      </span>
                                      <div className="d-flex test-b w-100">
                                        <span className="test-r p-1 w-25">
                                          {" "}
                                          Size
                                        </span>
                                        <span className="test-r p-1 w-30">
                                          {" "}
                                          Thickness
                                        </span>
                                        <span className="test-r p-1 w-25">
                                          {" "}
                                          Colour
                                        </span>
                                        <span className="test-r p-1 w-25">
                                          {" "}
                                          Qty
                                        </span>
                                      </div>
                                    </div>
                                    <span className="test-b p-2 test-r w-25">
                                      Grade
                                    </span>
                                    <span className="test-b p-2 test-r w-25">
                                      {" "}
                                      Application
                                    </span>
                                    <span className="test-b p-2 w-25">
                                      {" "}
                                      Delivery Location
                                    </span>
                                  </div>
                                  {formProps?.values?.details?.map(
                                    (de, index) => {
                                      return (
                                        <div
                                          className="d-flex w-100 test-b"
                                          key={index}
                                        >
                                          {/* <span className=" p-2 test-r w-10">
                          {index + 1}
                        </span> */}
                                          <div className="d-flex w-75">
                                            <span className="test-r p-1 w-25">
                                              <Field
                                                component={CustomInput}
                                                type="text"
                                                name={`details.${index}.size`}
                                                id="size"
                                                placeholder="Size"
                                              />
                                            </span>
                                            <span className="test-r p-1 w-30">
                                              <Field
                                                component={CustomInput}
                                                type="text"
                                                name={`details.${index}.thickness`}
                                                id="thickness"
                                                placeholder="Thickness"
                                              />
                                            </span>
                                            <span className="test-r p-1 w-25">
                                              <Field
                                                component={CustomInput}
                                                type="text"
                                                name={`details.${index}.colour`}
                                                id="colour"
                                                placeholder="Colour"
                                              />
                                            </span>
                                            <span className="test-r p-1 w-25">
                                              <Field
                                                component={CustomInput}
                                                type="text"
                                                name={`details.${index}.qty`}
                                                id="qty"
                                                placeholder="Qty"
                                              />
                                            </span>
                                          </div>
                                          <span className="p-2 test-r w-25">
                                            <Field
                                              component={CustomInput}
                                              type="text"
                                              name={`details.${index}.grade`}
                                              id="grade"
                                              placeholder="Enter Grade"
                                            />
                                          </span>
                                          <span className="p-2 test-r w-25">
                                            <Field
                                              component={CustomInput}
                                              type="text"
                                              name={`details.${index}.application`}
                                              id="application"
                                              placeholder="Enter Application"
                                            />
                                          </span>
                                          <span className="p-2 w-25">
                                            <Field
                                              component={CustomInput}
                                              type="text"
                                              name={`details.${index}.location`}
                                              id="location"
                                              placeholder="Enter Delivery Location"
                                            />
                                          </span>
                                        </div>
                                      );
                                    }
                                  )}
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
                    <div>
                      <div id="htmlToPdf2" className="p-2">
                        <div className="d-flex test">
                          <div className="col-md-4 test-r p-1 text-center">
                            <img
                              src="https://uditsolutions.in/vinraj.png"
                              alt=""
                            />
                          </div>
                          <div className="col-md-3 test-r"></div>
                          <div className="col-md-5 p-0 text-center">
                            <div className="d-flex">
                              <th className="test-r test-b w-25 ">Dept: </th>
                              <td className=" test-b w-75 ">
                                Sales & Marketing
                              </td>
                            </div>
                            <br />

                            <div className="d-flex test-t">
                              <th className="test-r w-25 ">Di.No: </th>
                              <td className="w-75 ">
                                {formProps.values?.di_no}
                              </td>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <div className="d-flex mb-4 w-100">
                            <div className="ml-3 w-25">
                              <span className="">Title </span>
                              <span className="">
                                {formProps.values?.title}
                              </span>
                            </div>
                            <div className="ml-3 w-25">
                              <span className="">Rev. No.: </span>
                              <span>{formProps.values?.rev_no}</span>
                            </div>
                            <div className="ml-3 w-25">
                              <span className="">Rev. Date: </span>
                              <span>{formProps.values?.rev_date}</span>
                            </div>
                          </div>
                          <div className="d-flex mb-1 w-100">
                            <div className="ml-3 w-50">
                              <span className="">Date: </span>
                              <span>{formProps.values?.date}</span>
                            </div>
                            <div className="ml-3 w-50">
                              <span className="">Ref No: </span>
                              <span>
                                {props.postEnquiriesForm?.data?.ref_no}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="test">
                          <div className=" test-b p-1">
                            <span className="pl-1 ">Customer Name: </span>
                            <span className="pl-2">
                              {formProps.values?.customer_name}
                            </span>
                          </div>
                          <div className=" test-b p-1">
                            <span className="pl-1 ">H.O Address: </span>
                            <span className="pl-2">
                              {formProps.values?.h_o_address}
                            </span>
                          </div>
                          <div className=" test-b p-1">
                            <span className="pl-1 ">Contact Name: </span>
                            <span className="pl-2">
                              {formProps.values?.contact_name}
                            </span>
                          </div>
                          <div className=" test-b p-1">
                            <span className="pl-1 ">Contact No: </span>
                            <span className="pl-2">
                              {formProps.values?.contact_no}
                            </span>
                          </div>
                          <div className=" test-b p-1">
                            <span className="pl-1 ">Email Id: </span>
                            <span className="pl-2">
                              {" "}
                              {formProps.values?.email}
                            </span>
                          </div>
                          <div className="text-center  d-flex flex-column w-100">
                            <div className="d-flex w-100">
                              <span className="test-b p-2 test-r w-25">
                                {" "}
                                Sr No.
                              </span>
                              <div className="d-flex flex-column w-50">
                                <span className="test-b test-r ">
                                  {" "}
                                  Requirement Details
                                </span>
                                <div className="d-flex test-b w-100">
                                  <span className="test-r p-1 w-25"> Size</span>
                                  <span className="test-r p-1 w-35">
                                    Thickness
                                  </span>
                                  <span className="test-r p-1 w-25">
                                    Colour
                                  </span>
                                  <span className="test-r p-1 w-25"> Qty</span>
                                </div>
                              </div>
                              <span className="test-b p-2 test-r w-25">
                                Grade
                              </span>
                              <span className="test-b p-2 test-r w-25">
                                {" "}
                                Application
                              </span>
                              <span className="test-b p-2 w-25">
                                {" "}
                                Delivery Location
                              </span>
                            </div>
                            {formProps.values?.details?.map((de, index) => {
                              return (
                                <div className="d-flex w-100 test-b">
                                  <span className=" p-2 test-r w-25">
                                    {" "}
                                    {index + 1}
                                  </span>
                                  <div className="d-flex w-50">
                                    <span className="test-r p-1 w-25">
                                      {de.size}{" "}
                                    </span>
                                    <span className="test-r p-1 w-35">
                                      {de.thickness}{" "}
                                    </span>
                                    <span className="test-r p-1 w-25">
                                      {" "}
                                      {de.colour}
                                    </span>
                                    <span className="test-r p-1 w-25">
                                      {de.qty}{" "}
                                    </span>
                                  </div>
                                  <span className="p-2 test-r w-25">
                                    {de.grade}
                                  </span>
                                  <span className="p-2 test-r w-25">
                                    {de.application}{" "}
                                  </span>
                                  <span className="p-2 w-25">
                                    {de.location}{" "}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          <div className=" test-b p-1">
                            <span className="pl-1">Payment Term:</span>
                            <span className="pl-2">
                              {formProps.values?.payment_term}
                            </span>
                          </div>
                          <div className=" test-b p-1">
                            <span className="pl-1 ">Reference: </span>
                            <span className="pl-2">
                              {formProps.values?.reference}
                            </span>
                          </div>
                          <div className=" p-1">
                            <span className="pl-1 ">Remarks: </span>
                            <span className="pl-2">
                              {formProps.values?.remarks}
                            </span>
                          </div>
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
                    </div>
                  );
                }}
              </Formik>
            </ModalBody>
            <ModalFooter>
              {props.enquiriesForm?.isPostLoading && <Loader2 />}
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
                <th scope="col">Customer Name</th>
                <th scope="col">Contact No</th>
                <th scope="col">Email</th>
                <th scope="col">View</th>

                {/* <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {props.enquiriesForm?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader2 color={"primary"} />
                  </td>
                </tr>
              ) : props.enquiriesForm?.enquiriesForm?.length > 0 ? (
                props.enquiriesForm?.enquiriesForm.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.title}</td>
                      <td>{user.rev_no}</td>
                      <td>{user.rev_date}</td>
                      <td>{user.date}</td>
                      <td>{user.ref_no}</td>
                      <td>{user.customer_name}</td>
                      <td>{user.contact_name}</td>
                      <td>{user.contact_no}</td>
                      <td>
                        <ViewSales
                          data={user}
                          formdata={user}
                          printStatus={printStatus}
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
            <strong>Enquiry Form</strong>
            {createStatus && (
              <Button
                className="btn-success  float-right"
                onClick={() => {
                  toggle();
                }}
              >
                Add Enquiry Form
              </Button>
            )}
          </div>
          <Modal className="modal-info modal-xl" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add New Enquiry Form</ModalHeader>
            {props.enquiriesForm?.isPostLoading && <Loader2 />}
            <ModalBody>
              <Formik
                initialValues={{
                  form_id: 34,
                  department_id: 11,
                  prefix_id: "",
                  di_no: "",
                  title: "",
                  rev_no: "",
                  rev_date: "",
                  date: "",

                  customer_name: "",
                  h_o_address: "",
                  contact_name: "",
                  contact_no: "",
                  payment_term: "",
                  reference: "",
                  remarks: "",
                  email: "",
                  details: [],
                  row: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  customer_name: Yup.string().required(
                    "Customer Name is required"
                  ),
                  h_o_address: Yup.string().required("Address is required"),
                  contact_name: Yup.string().required(
                    "Contact Name is required"
                  ),
                  contact_no: Yup.string().required("Contact No is required"),
                  payment_term: Yup.string().required(
                    "Payment Term is required"
                  ),
                  reference: Yup.string().required("Reference is required"),
                  remarks: Yup.string().required("Remarks is required"),
                  email: Yup.string().required("Email is required"),
                })}
              >
                {(formProps) => {
                  props.prefix?.map((pre) => {
                    if (pre.form_id == 34 && pre.department_id == 11) {
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

                            {/* <ErrorMessage
                          name="department_id"
                          component="div"
                          className="invalid-feedback"
                        /> */}
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
                          <Label for="customer_name">Customer Name</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="customer_name"
                              id="customer_name"
                              placeholder="Enter Customer Name"
                              className={
                                "form-control" +
                                (formProps.errors.customer_name &&
                                formProps.touched.customer_name
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="customer_name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="h_o_address">H.O. Address</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="h_o_address"
                              id="h_o_address"
                              placeholder="Enter H.O. Address"
                              className={
                                "form-control" +
                                (formProps.errors.h_o_address &&
                                formProps.touched.h_o_address
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="h_o_address"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="contact_name">Contact Name</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="contact_name"
                              id="contact_name"
                              placeholder="Enter Contact Name"
                              className={
                                "form-control" +
                                (formProps.errors.contact_name &&
                                formProps.touched.contact_name
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="contact_name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="contact_no">Contact No</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="number"
                              name="contact_no"
                              id="contact_no"
                              placeholder="Enter Contact No."
                              className={
                                "form-control" +
                                (formProps.errors.contact_no &&
                                formProps.touched.contact_no
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="contact_no"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="email">Email Id</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Enter Email Id"
                              className={
                                "form-control" +
                                (formProps.errors.email &&
                                formProps.touched.email
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="payment_term">Payment Term</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="payment_term"
                              id="payment_term"
                              placeholder="Enter Payment Term."
                              className={
                                "form-control" +
                                (formProps.errors.payment_term &&
                                formProps.touched.payment_term
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="payment_term"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={6}>
                          <Label for="reference">Reference</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="reference"
                              name="reference"
                              id="reference"
                              placeholder="Enter Reference"
                              className={
                                "form-control" +
                                (formProps.errors.reference &&
                                formProps.touched.reference
                                  ? " is-invalid"
                                  : "")
                              }
                            />

                            <ErrorMessage
                              name="reference"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <Label for="remarks">Remarks</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="remarks"
                              id="remarks"
                              placeholder="Enter Remarks."
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
                                                  size: "",
                                                  thickness: "",
                                                  colour: "",
                                                  qty: "",
                                                  grade: "",
                                                  application: "",
                                                  location: "",
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
                                <div className="text-center test d-flex flex-column w-100">
                                  <div className="d-flex w-100">
                                    {/* <span className="test-b p-2 test-r w-25">
                    {" "}
                    Sr No.
                  </span> */}
                                    <div className="d-flex flex-column w-75">
                                      <span className="test-b test-r ">
                                        {" "}
                                        Requirement Details
                                      </span>
                                      <div className="d-flex test-b w-100">
                                        <span className="test-r p-1 w-25">
                                          {" "}
                                          Size
                                        </span>
                                        <span className="test-r p-1 w-30">
                                          {" "}
                                          Thickness
                                        </span>
                                        <span className="test-r p-1 w-25">
                                          {" "}
                                          Colour
                                        </span>
                                        <span className="test-r p-1 w-25">
                                          {" "}
                                          Qty
                                        </span>
                                      </div>
                                    </div>
                                    <span className="test-b p-2 test-r w-25">
                                      Grade
                                    </span>
                                    <span className="test-b p-2 test-r w-25">
                                      {" "}
                                      Application
                                    </span>
                                    <span className="test-b p-2 w-25">
                                      {" "}
                                      Delivery Location
                                    </span>
                                  </div>
                                  {formProps?.values?.details?.map(
                                    (de, index) => {
                                      return (
                                        <div
                                          className="d-flex w-100 test-b"
                                          key={index}
                                        >
                                          {/* <span className=" p-2 test-r w-10">
                          {index + 1}
                        </span> */}
                                          <div className="d-flex w-75">
                                            <span className="test-r p-1 w-25">
                                              <Field
                                                component={CustomInput}
                                                type="text"
                                                name={`details.${index}.size`}
                                                id="size"
                                                placeholder="Size"
                                              />
                                            </span>
                                            <span className="test-r p-1 w-30">
                                              <Field
                                                component={CustomInput}
                                                type="text"
                                                name={`details.${index}.thickness`}
                                                id="thickness"
                                                placeholder="Thickness"
                                              />
                                            </span>
                                            <span className="test-r p-1 w-25">
                                              <Field
                                                component={CustomInput}
                                                type="text"
                                                name={`details.${index}.colour`}
                                                id="colour"
                                                placeholder="Colour"
                                              />
                                            </span>
                                            <span className="test-r p-1 w-25">
                                              <Field
                                                component={CustomInput}
                                                type="text"
                                                name={`details.${index}.qty`}
                                                id="qty"
                                                placeholder="Qty"
                                              />
                                            </span>
                                          </div>
                                          <span className="p-2 test-r w-25">
                                            <Field
                                              component={CustomInput}
                                              type="text"
                                              name={`details.${index}.grade`}
                                              id="grade"
                                              placeholder="Enter Grade"
                                            />
                                          </span>
                                          <span className="p-2 test-r w-25">
                                            <Field
                                              component={CustomInput}
                                              type="text"
                                              name={`details.${index}.application`}
                                              id="application"
                                              placeholder="Enter Application"
                                            />
                                          </span>
                                          <span className="p-2 w-25">
                                            <Field
                                              component={CustomInput}
                                              type="text"
                                              name={`details.${index}.location`}
                                              id="location"
                                              placeholder="Enter Delivery Location"
                                            />
                                          </span>
                                        </div>
                                      );
                                    }
                                  )}
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
                    <div>
                      <div id="htmlToPdf2" className="p-2">
                        <div className="d-flex test">
                          <div className="col-md-4 test-r p-1 text-center">
                            <img
                              src="https://uditsolutions.in/vinraj.png"
                              alt=""
                            />
                          </div>
                          <div className="col-md-3 test-r"></div>
                          <div className="col-md-5 p-0 text-center">
                            <div className="d-flex">
                              <th className="test-r test-b w-25 ">Dept: </th>
                              <td className=" test-b w-75 ">
                                Sales & Marketing
                              </td>
                            </div>
                            <br />

                            <div className="d-flex test-t">
                              <th className="test-r w-25 ">Di.No: </th>
                              <td className="w-75 ">
                                {formProps.values?.di_no}
                              </td>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <div className="d-flex mb-4 w-100">
                            <div className="ml-3 w-25">
                              <span className="">Title </span>
                              <span className="">
                                {formProps.values?.title}
                              </span>
                            </div>
                            <div className="ml-3 w-25">
                              <span className="">Rev. No.: </span>
                              <span>{formProps.values?.rev_no}</span>
                            </div>
                            <div className="ml-3 w-25">
                              <span className="">Rev. Date: </span>
                              <span>{formProps.values?.rev_date}</span>
                            </div>
                          </div>
                          <div className="d-flex mb-1 w-100">
                            <div className="ml-3 w-50">
                              <span className="">Date: </span>
                              <span>{formProps.values?.date}</span>
                            </div>
                            <div className="ml-3 w-50">
                              <span className="">Ref No: </span>
                              <span>
                                {props.postEnquiriesForm?.data?.ref_no}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="test">
                          <div className=" test-b p-1">
                            <span className="pl-1 ">Customer Name: </span>
                            <span className="pl-2">
                              {formProps.values?.customer_name}
                            </span>
                          </div>
                          <div className=" test-b p-1">
                            <span className="pl-1 ">H.O Address: </span>
                            <span className="pl-2">
                              {formProps.values?.h_o_address}
                            </span>
                          </div>
                          <div className=" test-b p-1">
                            <span className="pl-1 ">Contact Name: </span>
                            <span className="pl-2">
                              {formProps.values?.contact_name}
                            </span>
                          </div>
                          <div className=" test-b p-1">
                            <span className="pl-1 ">Contact No: </span>
                            <span className="pl-2">
                              {formProps.values?.contact_no}
                            </span>
                          </div>
                          <div className=" test-b p-1">
                            <span className="pl-1 ">Email Id: </span>
                            <span className="pl-2">
                              {" "}
                              {formProps.values?.email}
                            </span>
                          </div>
                          <div className="text-center  d-flex flex-column w-100">
                            <div className="d-flex w-100">
                              <span className="test-b p-2 test-r w-25">
                                {" "}
                                Sr No.
                              </span>
                              <div className="d-flex flex-column w-50">
                                <span className="test-b test-r ">
                                  {" "}
                                  Requirement Details
                                </span>
                                <div className="d-flex test-b w-100">
                                  <span className="test-r p-1 w-25"> Size</span>
                                  <span className="test-r p-1 w-35">
                                    Thickness
                                  </span>
                                  <span className="test-r p-1 w-25">
                                    Colour
                                  </span>
                                  <span className="test-r p-1 w-25"> Qty</span>
                                </div>
                              </div>
                              <span className="test-b p-2 test-r w-25">
                                Grade
                              </span>
                              <span className="test-b p-2 test-r w-25">
                                {" "}
                                Application
                              </span>
                              <span className="test-b p-2 w-25">
                                {" "}
                                Delivery Location
                              </span>
                            </div>
                            {formProps.values?.details?.map((de, index) => {
                              return (
                                <div className="d-flex w-100 test-b">
                                  <span className=" p-2 test-r w-25">
                                    {" "}
                                    {index + 1}
                                  </span>
                                  <div className="d-flex w-50">
                                    <span className="test-r p-1 w-25">
                                      {de.size}{" "}
                                    </span>
                                    <span className="test-r p-1 w-35">
                                      {de.thickness}{" "}
                                    </span>
                                    <span className="test-r p-1 w-25">
                                      {" "}
                                      {de.colour}
                                    </span>
                                    <span className="test-r p-1 w-25">
                                      {de.qty}{" "}
                                    </span>
                                  </div>
                                  <span className="p-2 test-r w-25">
                                    {de.grade}
                                  </span>
                                  <span className="p-2 test-r w-25">
                                    {de.application}{" "}
                                  </span>
                                  <span className="p-2 w-25">
                                    {de.location}{" "}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          <div className=" test-b p-1">
                            <span className="pl-1">Payment Term:</span>
                            <span className="pl-2">
                              {formProps.values?.payment_term}
                            </span>
                          </div>
                          <div className=" test-b p-1">
                            <span className="pl-1 ">Reference: </span>
                            <span className="pl-2">
                              {formProps.values?.reference}
                            </span>
                          </div>
                          <div className=" p-1">
                            <span className="pl-1 ">Remarks: </span>
                            <span className="pl-2">
                              {formProps.values?.remarks}
                            </span>
                          </div>
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
                    </div>
                  );
                }}
              </Formik>
            </ModalBody>
            <ModalFooter>
              {props.enquiriesForm?.isPostLoading && <Loader2 />}
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
                <th scope="col">Title</th>
                <th scope="col">Rev no</th>
                <th scope="col">Rev Date</th>
                <th scope="col">Date</th>
                <th scope="col">Ref no</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Contact No</th>
                <th scope="col">Email</th>
                <th scope="col">View</th>

                {/* <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {props.enquiriesForm?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader2 color={"primary"} />
                  </td>
                </tr>
              ) : props.enquiriesForm?.enquiriesForm?.length > 0 ? (
                props.enquiriesForm?.enquiriesForm.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.title}</td>
                      <td>{user.rev_no}</td>
                      <td>{user.rev_date}</td>
                      <td>{user.date}</td>
                      <td>{user.ref_no}</td>
                      <td>{user.customer_name}</td>
                      <td>{user.contact_name}</td>
                      <td>{user.contact_no}</td>
                      <td>
                        <ViewSales
                          data={user}
                          formdata={user}
                          printStatus={printStatus}
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
    enquiriesForm: state.enquiriesForm,
    postEnquiriesForm: state.enquiriesForm.postEnquiriesForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDepartmentGetData: (data) => dispatch(actions.departmentGetData(data)),
    onFormGetData: (data) => dispatch(actions.formGetData(data)),
    onPrefixGetData: (data) => dispatch(actions.prefixGetData(data)),
    onEnquiriesFormGetData: (data) =>
      dispatch(actions.enquiriesFormGetData(data)),
    onDeleteEnquiriesForm: (data, id) =>
      dispatch(actions.deleteEnquiriesForm(data, id)),
    onPostEnquiriesFormData: (
      data,
      user,
      toggle,
      setSubmitting,
      setShowTable
    ) =>
      dispatch(
        actions.postEnquiriesFormData(
          data,
          user,
          toggle,
          setSubmitting,
          setShowTable
        )
      ),

    updateDetailsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateDetailsData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EnquiryForm);
