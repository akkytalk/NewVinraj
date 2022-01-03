import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../../reduxStore/actions";

import {
  Button,
  Col,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import CustomInput from "../../../../views/Custom/CustomInput";
import CustomSelect from "../../../../views/Custom/CustomSelect";
import Loader2 from "../../../loader/Loader2";

function EditPrefix(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const handleSubmit = (values, { setSubmitting }) => {
    let user = {
      department_id: values.department_id,
      form_id: values.form_id,
      prefix: values.prefix,
      title: values.title,
      rev_no: values.rev_no,
      rev_date: values.rev_date,
      di_no: values.di_no,
    };
    console.log("Data of Vendor:", user);
    props.updatePrefixDataToggle(data, user, toggle);
    setSubmitting(true);
  };

  return (
    <div>
      <Button
        className="btn-warning p-1"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-edit" aria-hidden="true"></i>
      </Button>
      <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Prefix</ModalHeader>
        {props.prefix?.isUpdateLoading && <Loader2 />}
        <ModalBody>
          <Formik
            initialValues={{
              form_id: props.data?.form_id,
              department_id: props.data?.department_id,
              prefix: props.data?.prefix,
              title: props.data?.title,
              rev_no: props.data?.rev_no,
              di_no: props.data?.di_no,
              rev_date: props.data?.rev_date,
            }}
            onSubmit={handleSubmit}
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
                          (formProps.errors.form_id && formProps.touched.form_id
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
                            //  console.log("Dep2", dep2);
                            //  console.log("department value", form.department_id);

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
                    <Label for="title">Enter Title</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
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
                    <Label for="rev_no">Enter Rev no</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="rev_no"
                        id="rev_no"
                        placeholder="Enter Rev no"
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
                          (formProps.errors.prefix && formProps.touched.prefix
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
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="di_no">Di No</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="di_no"
                        id="di_no"
                        placeholder="Enter Di No"
                        className={
                          "form-control" +
                          (formProps.errors.di_no && formProps.touched.di_no
                            ? " is-invalid"
                            : "")
                        }
                      />

                      <ErrorMessage
                        name="di_no"
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
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditPrefix);
