/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../reduxStore/actions";

import {
  Button,
  Col,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import CustomInput from "../../../views/Custom/CustomInput";
import CustomSelect from "../../../views/Custom/CustomSelect";
import Loader2 from "../../loader/Loader2";

function EditBreakdownMaintenanceRecord(props) {
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
    console.log("Data of Vendor:", user);
    props.updateBreakMainRecordData(data, user, toggle);
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
        <ModalHeader toggle={toggle}>
          Edit Breakdown Maintenance Record
        </ModalHeader>
        {props.breakMainRecord?.isUpdateLoading && <Loader2 />}
        <ModalBody>
          <Formik
            initialValues={{
              form_id: 17,
              department_id: 6,
              di_no: "",
              title: "",
              rev_no: "",
              date: props.data.date,
              machine: props.data.machine,
              equipment: props.data.equipments,
              component: props.data.components,
              problem: props.data.problem,
              action: props.data.action,
              parts_specs: props.data.parts_spec,
              vendor: props.data.vendor,
              amount: props.data.amount,
              attend_by: props.data.attend_by,
              remarks: props.data.remarks,
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
                              return <option value={dep.id}>{dep.name}</option>;
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
                            (formProps.errors.action && formProps.touched.action
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
                            (formProps.errors.vendor && formProps.touched.vendor
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
                            (formProps.errors.amount && formProps.touched.amount
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
          {props.breakMainRecord?.isUpdateLoading && <Loader2 />}
        </ModalFooter>
      </Modal>
    </div>
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
    updateBreakMainRecordData: (data, user, toggle) =>
      dispatch(actions.updateBreakMainRecordData(data, user, toggle)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBreakdownMaintenanceRecord);
