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
} from "reactstrap";
import * as Yup from "yup";

import CustomInput from "../../views/Custom/CustomInput";
import Loader2 from "../loader/Loader2";

function EditPurchaseRequisition(props) {
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
    // props.detailsGetData(data);
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
      form_id: values.form_id,
      title: values.title,
      rev_no: values.rev_no,
      rev_date: values.rev_date,
      date: values.date,
      ref_no: values.ref_no,
      details: values.details,
    };
    console.log("Data of User of details:", user);
    // props.updateDetailsData(data, user, toggle, setSubmitting, setShowTable);
    setSubmitting(true);
    // setShowTable(true);
    return;
  };

  console.log("users", props.users);

  return (
    <Fragment>
      <Button
        className="btn-success"
        style={{ position: "absolute", top: "6px", right: "15px" }}
        data-toggle="modal"
        data-target="#extraLargeModal"
        onClick={toggle}
      >
        Add Requistion
      </Button>
      <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
        {/* {props.details?.isPostLoading && <Loader2 />} */}
        <ModalHeader toggle={toggle}>Purchase Requisition</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              form_id: 27,
              title: "",
              rev_no: "",
              rev_date: "",
              date: "",
              ref_no: "",
              details: [],
              row: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("title is required"),
              rev_no: Yup.string().required("rev_no is required"),
              rev_date: Yup.string().required("rev_date is required"),
              date: Yup.string().required("date is required"),
              ref_no: Yup.string().required("ref_no is required"),
            })}
          >
            {(formProps) =>
              !showtable ? (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="title">Title</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          list="userdatalist"
                          name="title"
                          id="title"
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

                    <Col md={6}>
                      <Label for="rev_no">Rev no</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="rev_no"
                          id="rev_no"
                          placeholder="Enter rev_no"
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
                                              item_name: "",
                                              qty: "",
                                              remarks: "",
                                              approx_price: "",
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
                                  <th>Quantity</th>
                                  <th>Remarks</th>
                                  <th>Approx price</th>
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
                                            component={CustomInput}
                                            type="text"
                                            name={`details.${index}.item_name`}
                                            id="item_name"
                                            placeholder="Enter Item Name"
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            component={CustomInput}
                                            type="number"
                                            name={`details.${index}.qty`}
                                            id={`details.${index}.qty`}
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
                                            name={`details.${index}.approx_price`}
                                            id={`details.${index}.approx_price`}
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
                    <div className="col-md-4">
                      <img src="https://uditsolutions.in/vinraj.png" alt="" />
                    </div>
                    <div className="m-2">
                      <span>Title: </span>
                      <span>{formProps.values.title}</span>
                    </div>
                    <div className="m-2">
                      <span>rev no: </span>
                      <span>{formProps.values.rev_no}</span>
                    </div>

                    <div className="m-2">
                      <span>rev date: </span>
                      <span>{formProps.values.rev_date}</span>
                    </div>

                    <div className="m-2">
                      <span>Date: </span>
                      <span>{formProps.values.date}</span>
                    </div>
                    <div className="m-2">
                      <span>Date: </span>
                      <span>{formProps.values.date}</span>
                    </div>
                    <Table size="sm" className="text-center mt-4">
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Quantity</th>
                          <th>Remarks</th>
                          <th>Approx price</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {formProps.values?.details?.map((detail, index) => {
                          return (
                            <tr key={index} className="text-center">
                              <td>{detail.item_name}</td>
                              <td>{detail.qty}</td>
                              <td>{detail.remarks}</td>
                              <td>{detail.approx_price}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
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
                      save as pdf
                    </button>
                  </div>
                </div>
              )
            }
          </Formik>
        </ModalBody>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPurchaseRequisition);
