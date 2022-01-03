/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../reduxStore/actions";
import { FormGroup, InputGroup } from "react-bootstrap";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

import printJS from "print-js";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  InputGroupAddon,
  Label,
  Table,
  ModalFooter,
} from "reactstrap";
import * as Yup from "yup";

import CustomInput from "../../views/Custom/CustomInput";
import CustomSelect from "../../views/Custom/CustomSelect";
import Loader2 from "../loader/Loader2";

function PurchaseRequition(props) {
  let data = {
    token: props.login?.login?.token,
  };

  const [modal, setModal] = useState(false);
  const [showtable, setShowTable] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setShowTable(false);
  };

  useEffect(() => {
    props.detailsGetData(data);
  }, []);

  const printMutliple = () => {
    console.log("print");
    printJS({
      printable: "htmlToPdf2",
      CSS: "",
      scanStyles: "true",
      type: "html",
      targetStyles: "[*]",

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
      // rev_date: values.rev_date,
      // date: values.date,
      // ref_no: values.ref_no,
      details: values.details,
      // department_id: values.department_id,
      // di_no: values.di_no,
    };
    console.log("Data of User of details:", user);
    props.postDetailsData(data, user, toggle, setSubmitting, setShowTable);
    setSubmitting(true);
    // setShowTable(true);
    return;
  };

  // console.log("users", props.users);
  // console.log("post details", props.details.postDetails);

  return (
    <Fragment>
      <Button
        className="btn-success"
        style={{
          position: "absolute",
          top: "5px",
          right: "15px",
          fontSize: "12px",
          padding: "3px",
        }}
        data-toggle="modal"
        data-target="#extraLargeModal"
        onClick={toggle}
      >
        Add Requistion
      </Button>
      <Modal className="modal-info modal-xl" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Purchase Requisition</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              form_id: 27,
              department_id: 8,
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
              // title: Yup.string().required("title is required"),
              // di_no: Yup.string().required("Di No is required"),
              // rev_no: Yup.string().required("rev_no is required"),
              // rev_date: Yup.string().required("rev_date is required"),
              date: Yup.string().required("date is required"),
              // ref_no: Yup.string().required("ref_no is required"),
            })}
          >
            {(formProps) => {
              props.prefix?.map((pre) => {
                if (pre.form_id == 27 && pre.department_id == 8) {
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
                            if (dep.id == 8)
                              return <option value={dep.id}>{dep.name}</option>;
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
                            (formProps.errors.di_no && formProps.touched.di_no
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
                            (formProps.errors.title && formProps.touched.title
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
                            (formProps.errors.rev_no && formProps.touched.rev_no
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

                  {/*
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="ref_no">ref no</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="ref_no"
                          id="ref_no"
                          placeholder="Enter ref_no"
                          className={
                            "form-control" +
                            (formProps.errors.ref_no && formProps.touched.ref_no
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="ref_no"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                  </Row> */}

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
                                        // disabled={
                                        //   formProps.values.details.length > 0
                                        // }
                                        onClick={() => {
                                          for (
                                            let i = 1;
                                            i <= formProps.values.row;
                                            i++
                                          ) {
                                            arrayHelpers.push({
                                              form_id: formProps.values.form_id,
                                              date: formProps.values.date,
                                              prefix_id:
                                                formProps.values.prefix_id,
                                              item_id: "",
                                              quantity: "",
                                              remarks: "",
                                              price: "",
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
                            <Table size="sm" className="text-center">
                              <thead>
                                <tr>
                                  <th>Item Name</th>
                                  <th>Required Qty</th>
                                  <th>Remarks</th>

                                  <th>Approx Price</th>
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
                                      <tr key={index} className="text-center">
                                        <td>
                                          <Field
                                            component={CustomSelect}
                                            type="select"
                                            name={`details.${index}.item_id`}
                                            id="item_id"
                                            placeholder="Enter Item Name"
                                          >
                                            <option value="">
                                              Select Item Name
                                            </option>
                                            {props.itemName?.map((item) => (
                                              <option
                                                key={item.id}
                                                value={item.id}
                                              >
                                                {item.name}
                                              </option>
                                            ))}
                                          </Field>
                                        </td>
                                        <td>
                                          <Field
                                            component={CustomInput}
                                            type="number"
                                            name={`details.${index}.quantity`}
                                            id={`details.${index}.quantity`}
                                            placeholder="Enter Quantity"
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            component={CustomInput}
                                            type="text"
                                            name={`details.${index}.remarks`}
                                            id={`details.${index}.remarks`}
                                            placeholder="Enter Remarks"
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            component={CustomInput}
                                            type="number"
                                            name={`details.${index}.price`}
                                            id={`details.${index}.price`}
                                            placeholder="Enter approx price"
                                          />
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
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
                  <div id="htmlToPdf2" style={{ marginLeft: "20px" }}>
                    <div className="row">
                      <div className="col-md-3">
                        <img src="https://uditsolutions.in/vinraj.png" alt="" />
                      </div>
                      <div className="col-md-3">
                        <div className="d-flex">
                          <th>Dept: </th>
                          <td className="ml-2">Purchase</td>
                        </div>
                        <br />

                        <div className="d-flex">
                          <th>Di.No: </th>
                          <td className="ml-2">{formProps.values?.di_no}</td>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="">
                      <div className="d-flex mb-4 w-100">
                        <div className="mr-3 w-25">
                          <span className="">Title: </span>
                          <span>{formProps.values?.title}</span>
                        </div>
                        <div className="mr-3 w-25">
                          <span className="">Rev. No.: </span>
                          <span>{formProps.values?.rev_no}</span>
                        </div>
                        <div className="mr-3 w-50">
                          <span className="">Rev. Date: </span>
                          <span>{formProps.values?.rev_date}</span>
                        </div>
                      </div>
                      <div className="d-flex mb-4 w-100">
                        <div className="mr-3 w-50">
                          <span className="">Date: </span>
                          <span>{props.details.postDetails?.date}</span>
                        </div>
                        <div className="mr-3 w-50">
                          <span className="">Ref No: </span>
                          <span>{props.details.postDetails?.ref_no}</span>
                        </div>
                      </div>
                    </div>

                    <Table size="sm" className=" mt-4">
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Required Qty</th>
                          <th>Remarks</th>
                          <th>Approx Price </th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {formProps.values?.details?.map((detail, index) => {
                          return (
                            <tr key={index} className="">
                              <td>{detail.item_id}</td>
                              <td>{detail.quantity}</td>
                              <td>{detail.remarks}</td>
                              <td>{detail.price}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    <p className="mt-4 pr-5 mb-2">
                      Note: In 1 PR, do not mix 2 stock groups. Make separate PR
                      for the other stock group. Write “URGENT” in Remarks if
                      Item is required urgently.
                    </p>
                  </div>
                  {(props.printStatus ||
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
          {props.details?.isPostLoading ? <Loader2 /> : ""}
        </ModalFooter>
      </Modal>
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
    details: state.details,
    itemName: state.itemName.itemName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onItemNameGetData: (data) => dispatch(actions.itemNameGetData(data)),
    detailsGetData: (data) => dispatch(actions.detailsGetData(data)),
    deleteDetails: (data) => dispatch(actions.deleteDetails(data)),
    postDetailsData: (data, user, toggle, setSubmitting, setShowTable) =>
      dispatch(
        actions.postDetailsData(data, user, toggle, setSubmitting, setShowTable)
      ),
    updateDetailsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateDetailsData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PurchaseRequition);
