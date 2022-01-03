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
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
import processImg from "../../assets/img/process.png";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import CustomInput from "../../views/Custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../reduxStore/actions";
import CustomSelect from "../../views/Custom/CustomSelect";
import Loader2 from "../loader/Loader2";

import printJS from "print-js";
import "../../css/Format.css";

let formArray = [
  "hot_mixer",
  "cool_mixer",
  "feeder",
  "screw",
  "barrel",
  "roll_no1",
  "roll_no2",
  "roll_no3",
  "roll_no4",
  "roll_no5",
  "roll_no6",
  "take_off1",
  "take_off2",
  "tempering1",
  "tempering2",
  "hauling",
  "remarks",
];

function ProcessParametersCf(props) {
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
    props.onPrefixGetData(data);
    props.onProcessGetData(data);
    status();
  }, []);

  function status() {
    props.login?.login?.user?.rights?.map((right) => {
      if (right.form_id == 22) {
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
      css: "../../css/Format.css",
      targetStyles: "[*]",
      maxWidth: 1080,
      font_size: "6pt",
      honorMarginPadding: true,
      honorColor: true,

      // style: "@page { size: Letter landscape; }",
    });
  };

  let user;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Bio Data:", values);

    user = {
      details: values.details,
    };
    console.log("Data of User of details:", user);
    // props.onPostProcessData(data, user, toggle, setSubmitting, setShowTable);
    // setSubmitting(true);
    setShowTable(true);
    return;
  };

  if (props.login?.login?.user?.role == "admin")
    return (
      <Card>
        <CardHeader className="bg-warning text-white">
          <div className="">
            <strong>Process Parameters Cf</strong>

            <Button
              className="btn-success  float-right"
              onClick={() => {
                toggle();
              }}
            >
              Add Process Parameters Cf
            </Button>
          </div>
          <Modal className="modal-info modal-xl" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Add New Process Parameters Cf
            </ModalHeader>
            {props.process?.isPostLoading ? <Loader2 /> : ""}
            <ModalBody>
              <Formik
                initialValues={{
                  form_id: 22,
                  department_id: 7,
                  di_no: "",
                  title: "",
                  rev_no: "",
                  prefix_id: "",
                  details: [],
                  rev_date: "",
                  row: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({})}
              >
                {(formProps) => {
                  props.prefix?.map((pre) => {
                    if (
                      pre.form_id == formProps.values.form_id &&
                      pre.department_id == formProps.values.department_id
                    ) {
                      formProps.values.title = pre.title;
                      formProps.values.di_no = pre.prefix;
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
                                                  hot_mixer: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  cool_mixer: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },

                                                  feeder: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  screw: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  barrel: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  roll_no1: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  roll_no2: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  roll_no3: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  roll_no4: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  roll_no5: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  roll_no6: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  take_off1: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  take_off2: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  tempering1: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  tempering2: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  hauling: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  remarks: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
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
                                        <th>Sr No</th>
                                        <th></th>
                                        <th>Hot Mixer</th>
                                        <th>Cool Mixer</th>
                                        <th>Feeder</th>
                                        <th>Screw</th>
                                        <th>Barrel</th>
                                        <th>Roll no.1</th>
                                        <th>Roll no.2</th>
                                        <th>Roll no.3</th>
                                        <th>Roll no.4</th>
                                        <th>Roll no.5</th>
                                        <th>Roll no.6</th>
                                        <th>Take off 1</th>
                                        <th>Take off 2</th>
                                        <th>Tempering 1</th>
                                        <th>Tempering 2</th>
                                        <th>Hauling</th>
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
                                              <td>{index + 1}</td>
                                              <td className="d-flex test">
                                                <td className="test">
                                                  Date & Product description
                                                  <td>
                                                    {" "}
                                                    <Field
                                                      component={CustomInput}
                                                      type="date"
                                                      name={`details.${index}.hot_mixer.date`}
                                                      id={`details.${index}.hot_mixer.date`}
                                                      style={{ width: "150px" }}
                                                      onChange={(event) => {
                                                        formArray?.map(
                                                          (form) => {
                                                            formProps.setFieldValue(
                                                              `details.${index}.${form}.date`,
                                                              event.target.value
                                                            );
                                                          }
                                                        );

                                                        // formProps.setFieldValue(
                                                        //   `details.${index}.date`,
                                                        //   event.target.value
                                                        // );
                                                      }}
                                                    />
                                                  </td>
                                                </td>
                                                <td className="test d-flex flex-column">
                                                  <td className="test">
                                                    Speed
                                                  </td>
                                                  <td className="test">
                                                    Temp.
                                                  </td>
                                                  <td className="test">
                                                    Current
                                                  </td>
                                                  <td className="test h-30p">
                                                    {" "}
                                                  </td>
                                                </td>
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hot_mixer.speed`}
                                                  id={`details.${index}.hot_mixer.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hot_mixer.temp`}
                                                  id={`details.${index}.hot_mixer.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hot_mixer.current`}
                                                  id="hot_mixer.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hot_mixer[3]`}
                                                  id={`details.${index}.hot_mixer[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.cool_mixer.speed`}
                                                  id={`details.${index}.cool_mixer.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.cool_mixer.temp`}
                                                  id={`details.${index}.cool_mixer.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.cool_mixer.current`}
                                                  id="cool_mixer.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.cool_mixer[3]`}
                                                  id={`details.${index}.cool_mixer[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.feeder.speed`}
                                                  id={`details.${index}.feeder.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.feeder.temp`}
                                                  id={`details.${index}.feeder.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.feeder.current`}
                                                  id="feeder.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.feeder[3]`}
                                                  id={`details.${index}.feeder[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.screw.speed`}
                                                  id={`details.${index}.screw.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.screw.temp`}
                                                  id={`details.${index}.screw.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.screw.current`}
                                                  id="screw.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.screw[3]`}
                                                  id={`details.${index}.screw[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.barrel.speed`}
                                                  id={`details.${index}.barrel.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.barrel.temp`}
                                                  id={`details.${index}.barrel.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.barrel.current`}
                                                  id="barrel.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.barrel[3]`}
                                                  id={`details.${index}.barrel[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no1.speed`}
                                                  id={`details.${index}.roll_no1.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no1.temp`}
                                                  id={`details.${index}.roll_no1.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no1.current`}
                                                  id="roll_no1.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no1[3]`}
                                                  id={`details.${index}.roll_no1[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no2.speed`}
                                                  id={`details.${index}.roll_no2.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no2.temp`}
                                                  id={`details.${index}.roll_no2.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no2.current`}
                                                  id="roll_no2.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no2[3]`}
                                                  id={`details.${index}.roll_no2[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no3.speed`}
                                                  id={`details.${index}.roll_no3.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no3.temp`}
                                                  id={`details.${index}.roll_no3.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no3.current`}
                                                  id="roll_no3.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no3[3]`}
                                                  id={`details.${index}.roll_no3[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no4.speed`}
                                                  id={`details.${index}.roll_no4.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no4.temp`}
                                                  id={`details.${index}.roll_no4.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no4.current`}
                                                  id="roll_no4.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no4[3]`}
                                                  id={`details.${index}.roll_no4[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no5.speed`}
                                                  id={`details.${index}.roll_no5.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no5.temp`}
                                                  id={`details.${index}.roll_no5.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no5.current`}
                                                  id="roll_no5.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no5[3]`}
                                                  id={`details.${index}.roll_no5[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no6.speed`}
                                                  id={`details.${index}.roll_no6.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no6.temp`}
                                                  id={`details.${index}.roll_no6.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no6.current`}
                                                  id="roll_no6.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no6[3]`}
                                                  id={`details.${index}.roll_no6[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off1.speed`}
                                                  id={`details.${index}.take_off1.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off1.temp`}
                                                  id={`details.${index}.take_off1.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off1.current`}
                                                  id="take_off1.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off1[3]`}
                                                  id={`details.${index}.take_off1[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off2.speed`}
                                                  id={`details.${index}.take_off2.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off2.temp`}
                                                  id={`details.${index}.take_off2.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off2.current`}
                                                  id="take_off2.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off2[3]`}
                                                  id={`details.${index}.take_off2[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering1.speed`}
                                                  id={`details.${index}.tempering1.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering1.temp`}
                                                  id={`details.${index}.tempering1.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering1.current`}
                                                  id="tempering1.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering1[3]`}
                                                  id={`details.${index}.tempering1[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering2.speed`}
                                                  id={`details.${index}.tempering2.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering2.temp`}
                                                  id={`details.${index}.tempering2.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering2.current`}
                                                  id="tempering2.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering2[3]`}
                                                  id={`details.${index}.tempering2[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hauling.speed`}
                                                  id={`details.${index}.hauling.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hauling.temp`}
                                                  id={`details.${index}.hauling.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hauling.current`}
                                                  id="hauling.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hauling[3]`}
                                                  id={`details.${index}.hauling[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.remarks.speed`}
                                                  id={`details.${index}.remarks.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.remarks.temp`}
                                                  id={`details.${index}.remarks.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.remarks.current`}
                                                  id="remarks.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.remarks[3]`}
                                                  id={`details.${index}.remarks[3]`}
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
                        className="d-flex flex-column f-8 w-100"
                      >
                        <div
                          className="d-flex test z-index-1"
                          style={{ width: "1080px" }}
                        >
                          <div className="w-25 test-r p-1 text-center z-index-1">
                            <img
                              src="https://uditsolutions.in/vinraj.png"
                              alt=""
                            />
                          </div>
                          <div className="w-50 test-r d-flex justify-content-center align-items-center">
                            <img
                              src={processImg}
                              alt="PROCESS PARAMETER RECORD"
                              className="process-img"
                            />
                          </div>
                          <div className="w-25 f-12 p-1 text-center d-flex flex-column justify-content-between z-index-1">
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

                        <div className="" style={{ width: "1080px" }}>
                          <table
                            className="table-sm"
                            style={{ width: "1080px" }}
                          >
                            <thead className="">
                              <tr>
                                <th className="test th-color w-15"></th>
                                <th className="test">Hot Mixer</th>
                                <th className="test">Cool Mixer</th>
                                <th className="test">Feeder</th>
                                <th className="test">Screw</th>
                                <th className="test">Barrel</th>
                                <th className="test">Roll no.1</th>
                                <th className="test">Roll no.2</th>
                                <th className="test">Roll no.3</th>
                                <th className="test">Roll no.4</th>
                                <th className="test">Roll no.5</th>
                                <th className="test">Roll no.6</th>
                                <th className="test">Take off 1</th>
                                <th className="test">Take off 2</th>
                                <th className="test">Tempering 1</th>
                                <th className="test">Tempering 2</th>
                                <th className="test">Hauling</th>
                                <th className="test">Remarks</th>
                              </tr>
                            </thead>
                            <tbody className="">
                              {formProps.values?.details?.map((de, index) => {
                                return (
                                  <tr className="w-100">
                                    <td className="d-flex p-0">
                                      <th className="d-flex flex-column test p-0 w-100">
                                        <th>Date & Product description</th>
                                        <th>{de.hot_mixer?.date}</th>
                                      </th>
                                      <th className="d-flex flex-column test p-0">
                                        <th className="test-b h-40p">Speed</th>
                                        <th className="test-b h-40p">Temp</th>
                                        <th className="test-b h-40p">
                                          Current
                                        </th>
                                        <th className="h-40p"></th>
                                      </th>
                                    </td>
                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.hot_mixer?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.hot_mixer?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.hot_mixer?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>
                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.cool_mixer?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.cool_mixer?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.cool_mixer?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>
                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.feeder?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.feeder?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.feeder?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.screw?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.screw?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.screw?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.barrel?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.barrel?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.barrel?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.roll_no1?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no1?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no1?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.roll_no2?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no2?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no2?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.roll_no3?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no3?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no3?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.roll_no4?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no4?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no4?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.roll_no5?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no5?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no5?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.roll_no6?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no6?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no6?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.take_off1?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.take_off1?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.take_off1?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.take_off2?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.take_off2?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.take_off2?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.tempering1?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.tempering1?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.tempering1?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.tempering2?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.tempering2?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.tempering2?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.hauling?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.hauling?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.hauling?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 ">
                                        <th className="test-b h-40p">
                                          {de.remarks?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.remarks?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.remarks?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>
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
              {props.process?.isPostLoading ? <Loader2 /> : ""}
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
              {props.form?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader2 color={"primary"} />
                  </td>
                </tr>
              ) : props.form?.form?.length > 0 ? (
                props.form?.form
                  .filter((user) => user.id == 19)
                  .map((user, index) => {
                    return user.form_headers.map((form) => {
                      return (
                        <tr key={index}>
                          <td>{form.title}</td>
                          <td>{form.rev_no}</td>
                          <td>{form.rev_date}</td>
                          <td>{form.date}</td>
                          <td>{form.ref_no}</td>
                          <td>{form.customer_name}</td>
                          <td>{form.contact_name}</td>
                          <td>{form.contact_no}</td>
                          <td>
                            {/* <ViewSales
                              data={form}
                              formdata={user}
                              printStatus={printStatus}
                            />{" "} */}
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
                    });
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
            <strong>Process Parameters Cf</strong>
            {createStatus && (
              <Button
                className="btn-success  float-right"
                onClick={() => {
                  toggle();
                }}
              >
                Add Process Parameters Cf
              </Button>
            )}
          </div>
          <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Add New Process Parameters Cf
            </ModalHeader>
            {props.process?.isPostLoading ? <Loader2 /> : ""}
            <ModalBody>
              <Formik
                initialValues={{
                  form_id: 22,
                  department_id: 7,
                  di_no: "",
                  title: "",
                  rev_no: "",
                  prefix_id: "",
                  details: [],
                  rev_date: "",
                  row: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({})}
              >
                {(formProps) => {
                  props.prefix?.map((pre) => {
                    if (
                      pre.form_id == formProps.values.form_id &&
                      pre.department_id == formProps.values.department_id
                    ) {
                      formProps.values.title = pre.title;
                      formProps.values.di_no = pre.prefix;
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
                                                  hot_mixer: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  cool_mixer: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },

                                                  feeder: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  screw: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  barrel: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  roll_no1: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  roll_no2: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  roll_no3: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  roll_no4: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  roll_no5: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  roll_no6: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  take_off1: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  take_off2: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  tempering1: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  tempering2: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  hauling: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
                                                  remarks: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: "",
                                                    prefix_id:
                                                      formProps.values
                                                        .prefix_id,
                                                  },
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
                                        <th>Sr No</th>
                                        <th></th>
                                        <th>Hot Mixer</th>
                                        <th>Cool Mixer</th>
                                        <th>Feeder</th>
                                        <th>Screw</th>
                                        <th>Barrel</th>
                                        <th>Roll no.1</th>
                                        <th>Roll no.2</th>
                                        <th>Roll no.3</th>
                                        <th>Roll no.4</th>
                                        <th>Roll no.5</th>
                                        <th>Roll no.6</th>
                                        <th>Take off 1</th>
                                        <th>Take off 2</th>
                                        <th>Tempering 1</th>
                                        <th>Tempering 2</th>
                                        <th>Hauling</th>
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
                                              <td>{index + 1}</td>
                                              <td className="d-flex test">
                                                <td className="test">
                                                  Date & Product description
                                                  <td>
                                                    {" "}
                                                    <Field
                                                      component={CustomInput}
                                                      type="date"
                                                      name={`details.${index}.hot_mixer.date`}
                                                      id={`details.${index}.hot_mixer.date`}
                                                      style={{ width: "150px" }}
                                                      onChange={(event) => {
                                                        formArray?.map(
                                                          (form) => {
                                                            formProps.setFieldValue(
                                                              `details.${index}.${form}.date`,
                                                              event.target.value
                                                            );
                                                          }
                                                        );

                                                        // formProps.setFieldValue(
                                                        //   `details.${index}.date`,
                                                        //   event.target.value
                                                        // );
                                                      }}
                                                    />
                                                  </td>
                                                </td>
                                                <td className="test d-flex flex-column">
                                                  <td className="test">
                                                    Speed
                                                  </td>
                                                  <td className="test">
                                                    Temp.
                                                  </td>
                                                  <td className="test">
                                                    Current
                                                  </td>
                                                  <td className="test h-30p">
                                                    {" "}
                                                  </td>
                                                </td>
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hot_mixer.speed`}
                                                  id={`details.${index}.hot_mixer.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hot_mixer.temp`}
                                                  id={`details.${index}.hot_mixer.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hot_mixer.current`}
                                                  id="hot_mixer.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hot_mixer[3]`}
                                                  id={`details.${index}.hot_mixer[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.cool_mixer.speed`}
                                                  id={`details.${index}.cool_mixer.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.cool_mixer.temp`}
                                                  id={`details.${index}.cool_mixer.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.cool_mixer.current`}
                                                  id="cool_mixer.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.cool_mixer[3]`}
                                                  id={`details.${index}.cool_mixer[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.feeder.speed`}
                                                  id={`details.${index}.feeder.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.feeder.temp`}
                                                  id={`details.${index}.feeder.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.feeder.current`}
                                                  id="feeder.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.feeder[3]`}
                                                  id={`details.${index}.feeder[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.screw.speed`}
                                                  id={`details.${index}.screw.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.screw.temp`}
                                                  id={`details.${index}.screw.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.screw.current`}
                                                  id="screw.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.screw[3]`}
                                                  id={`details.${index}.screw[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.barrel.speed`}
                                                  id={`details.${index}.barrel.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.barrel.temp`}
                                                  id={`details.${index}.barrel.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.barrel.current`}
                                                  id="barrel.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.barrel[3]`}
                                                  id={`details.${index}.barrel[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no1.speed`}
                                                  id={`details.${index}.roll_no1.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no1.temp`}
                                                  id={`details.${index}.roll_no1.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no1.current`}
                                                  id="roll_no1.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no1[3]`}
                                                  id={`details.${index}.roll_no1[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no2.speed`}
                                                  id={`details.${index}.roll_no2.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no2.temp`}
                                                  id={`details.${index}.roll_no2.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no2.current`}
                                                  id="roll_no2.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no2[3]`}
                                                  id={`details.${index}.roll_no2[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no3.speed`}
                                                  id={`details.${index}.roll_no3.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no3.temp`}
                                                  id={`details.${index}.roll_no3.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no3.current`}
                                                  id="roll_no3.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no3[3]`}
                                                  id={`details.${index}.roll_no3[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no4.speed`}
                                                  id={`details.${index}.roll_no4.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no4.temp`}
                                                  id={`details.${index}.roll_no4.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no4.current`}
                                                  id="roll_no4.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no4[3]`}
                                                  id={`details.${index}.roll_no4[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no5.speed`}
                                                  id={`details.${index}.roll_no5.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no5.temp`}
                                                  id={`details.${index}.roll_no5.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no5.current`}
                                                  id="roll_no5.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no5[3]`}
                                                  id={`details.${index}.roll_no5[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no6.speed`}
                                                  id={`details.${index}.roll_no6.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no6.temp`}
                                                  id={`details.${index}.roll_no6.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no6.current`}
                                                  id="roll_no6.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.roll_no6[3]`}
                                                  id={`details.${index}.roll_no6[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off1.speed`}
                                                  id={`details.${index}.take_off1.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off1.temp`}
                                                  id={`details.${index}.take_off1.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off1.current`}
                                                  id="take_off1.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off1[3]`}
                                                  id={`details.${index}.take_off1[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off2.speed`}
                                                  id={`details.${index}.take_off2.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off2.temp`}
                                                  id={`details.${index}.take_off2.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off2.current`}
                                                  id="take_off2.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.take_off2[3]`}
                                                  id={`details.${index}.take_off2[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering1.speed`}
                                                  id={`details.${index}.tempering1.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering1.temp`}
                                                  id={`details.${index}.tempering1.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering1.current`}
                                                  id="tempering1.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering1[3]`}
                                                  id={`details.${index}.tempering1[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering2.speed`}
                                                  id={`details.${index}.tempering2.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering2.temp`}
                                                  id={`details.${index}.tempering2.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering2.current`}
                                                  id="tempering2.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.tempering2[3]`}
                                                  id={`details.${index}.tempering2[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hauling.speed`}
                                                  id={`details.${index}.hauling.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hauling.temp`}
                                                  id={`details.${index}.hauling.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hauling.current`}
                                                  id="hauling.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.hauling[3]`}
                                                  id={`details.${index}.hauling[3]`}
                                                  style={{ width: "150px" }}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.remarks.speed`}
                                                  id={`details.${index}.remarks.speed`}
                                                  style={{ width: "150px" }}
                                                />

                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.remarks.temp`}
                                                  id={`details.${index}.remarks.temp`}
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.remarks.current`}
                                                  id="remarks.current"
                                                  style={{ width: "150px" }}
                                                />
                                                <Field
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.remarks[3]`}
                                                  id={`details.${index}.remarks[3]`}
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
                        className="d-flex flex-column flex-wrap f-8 w-100"
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
                              PROCESS PARAMETER RECORD.
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

                        {/* <div className="test w-100">
                          <div className="d-flex mb-1 w-100">
                            <div className="ml-3 w-50">
                              <span className="">Date: </span>
                              <span>{props.details?.postDetails?.date}</span>
                            </div>
                            <div className="ml-3 w-50">
                              <span className="">Ref No: </span>
                              <span>{props.details?.postDetails?.ref_no}</span>
                            </div>
                          </div>
                        </div> */}
                        <div className="">
                          <table className="table-sm ">
                            <thead className="">
                              <tr>
                                <th className="test  bg-gray"></th>
                                <th className="test">Hot Mixer</th>
                                <th className="test">Cool Mixer</th>
                                <th className="test">Feeder</th>
                                <th className="test">Screw</th>
                                <th className="test">Barrel</th>
                                <th className="test">Roll no.1</th>
                                <th className="test">Roll no.2</th>
                                <th className="test">Roll no.3</th>
                                <th className="test">Roll no.4</th>
                                <th className="test">Roll no.5</th>
                                <th className="test">Roll no.6</th>
                                <th className="test">Take off 1</th>
                                <th className="test">Take off 2</th>
                                <th className="test">Tempering 1</th>
                                <th className="test">Tempering 2</th>
                                <th className="test">Hauling</th>
                                <th className="test">Remarks</th>
                              </tr>
                            </thead>
                            <tbody className="">
                              {formProps.values?.details?.map((de, index) => {
                                return (
                                  <tr>
                                    <td className="d-flex p-0">
                                      <th className="d-flex flex-column test -100 p-0">
                                        <th>Date & Product description</th>
                                        <th>{de.date}</th>
                                      </th>
                                      <th className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">Speed</th>
                                        <th className="test-b h-40p">Temp</th>
                                        <th className="test-b h-40p">
                                          Current
                                        </th>
                                        <th className="h-40p"></th>
                                      </th>
                                    </td>
                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.hot_mixer?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.hot_mixer?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.hot_mixer?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>
                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.cool_mixer?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.cool_mixer?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.cool_mixer?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>
                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.feeder?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.feeder?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.feeder?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.screw?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.screw?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.screw?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.barrel?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.barrel?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.barrel?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.roll_no1?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no1?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no1?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.roll_no2?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no2?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no2?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.roll_no3?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no3?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no3?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.roll_no4?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no4?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no4?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.roll_no5?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no5?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no5?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.roll_no6?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no6?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.roll_no6?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.take_off1?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.take_off1?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.take_off1?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.take_off2?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.take_off2?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.take_off2?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.tempering1?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.tempering1?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.tempering1?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.tempering2?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.tempering2?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.tempering2?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.hauling?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.hauling?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.hauling?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>

                                    <td className="p-0">
                                      <td className="d-flex flex-column test p-0 w-100">
                                        <th className="test-b h-40p">
                                          {de.remarks?.speed}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.remarks?.temp}
                                        </th>
                                        <th className="test-b h-40p">
                                          {de.remarks?.current}
                                        </th>
                                        <th className="h-40p"></th>
                                      </td>
                                    </td>
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
              {props.process?.isPostLoading ? <Loader2 /> : ""}
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
              {props.form?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader2 color={"primary"} />
                  </td>
                </tr>
              ) : props.form?.form?.length > 0 ? (
                props.form?.form
                  .filter((user) => user.id == 19)
                  .map((user, index) => {
                    return user.form_headers.map((form) => {
                      return (
                        <tr key={index}>
                          <td>{form.title}</td>
                          <td>{form.rev_no}</td>
                          <td>{form.rev_date}</td>
                          <td>{form.date}</td>
                          <td>{form.ref_no}</td>
                          <td>{form.customer_name}</td>
                          <td>{form.contact_name}</td>
                          <td>{form.contact_no}</td>
                          <td>
                            {/* <ViewSales
                              data={form}
                              formdata={user}
                              printStatus={printStatus}
                            />{" "} */}
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
                    });
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
    process: state.process,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDepartmentGetData: (data) => dispatch(actions.departmentGetData(data)),
    onFormGetData: (data) => dispatch(actions.formGetData(data)),
    onPrefixGetData: (data) => dispatch(actions.prefixGetData(data)),
    onProcessGetData: (data) => dispatch(actions.processGetData(data)),
    onDeleteProcess: (data, id) => dispatch(actions.deleteProcess(data, id)),
    onPostProcessData: (data, user, toggle, setSubmitting, setShowTable) =>
      dispatch(
        actions.postProcessData(data, user, toggle, setSubmitting, setShowTable)
      ),

    updateProcessData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateProcessData(data, user, toggle, setSubmitting)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcessParametersCf);
