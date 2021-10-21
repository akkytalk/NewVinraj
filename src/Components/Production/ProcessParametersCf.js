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
} from "reactstrap";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import CustomInput from "../../views/Custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../reduxStore/actions";
import CustomSelect from "../../views/Custom/CustomSelect";
import Loader2 from "../loader/Loader2";

import printJS from "print-js";
import "../../css/Format.css";

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
      CSS: "../../css/Format.css",
      scanStyles: "true",
      maxWidth: 1500,
      type: "html",
      targetStyles: "[*]",
      // style: "@page { size: Letter landscape; } @font {size: 8px}",
    });
  };

  // const printMutliple = () => {
  //   const divToDisplay = document.getElementById("htmlToPdf2");
  //   html2canvas(divToDisplay).then(function (canvas) {
  //     console.log(canvas);
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF({
  //       orientation: "Potrait",
  //     });
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     console.log(pdfHeight, pdfWidth);
  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     pdf.save("download.pdf");
  //   });
  // };
  let user;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Bio Data:", values);

    user = {
      form_id: values.form_id,
      title: values.title,
      rev_no: values.rev_no,
      details: values.details,
      department_id: values.department_id,
      di_no: values.di_no,
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
          <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Add New Process Parameters Cf
            </ModalHeader>

            <ModalBody>
              <Formik
                initialValues={{
                  form_id: 22,
                  department_id: 7,
                  di_no: "",
                  title: "",
                  rev_no: "",
                  // rev_date: "",
                  // date: "",
                  // ref_no: "",
                  details: [],
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
                                                console.log(
                                                  `formProps.values
                                                .details[i]?.date`,
                                                  formProps.values.details[i]
                                                    ?.date
                                                );
                                                arrayHelpers.push({
                                                  date: "",
                                                  hot_mixer: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  cool_mixer: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },

                                                  feeder: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  screw: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  barrel: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  roll_no1: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  roll_no2: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  roll_no3: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  roll_no4: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  roll_no5: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  roll_no6: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  take_off1: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  take_off2: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  tempering1: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  tempering2: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  hauling: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
                                                  },
                                                  remarks: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    form_id:
                                                      formProps.values.form_id,
                                                    date: formProps.values
                                                      .details[i]?.date
                                                      ? formProps.values
                                                          .details[i].date
                                                      : "",
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
                                                      name={`details.${index}.date`}
                                                      id={`details.${index}.date`}
                                                      style={{ width: "150px" }}
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
                        className="d-flex flex-column flex-wrap f-10 w-100"
                      >
                        {/* <div className="d-flex test">
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
                        </div> */}

                        <div className="test w-100">
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

            <ModalBody>
              <Formik
                initialValues={{
                  form_id: 19,
                  department_id: 7,
                  di_no: "",
                  title: "",
                  rev_no: "",
                  // rev_date: "",
                  // date: "",
                  // ref_no: "",
                  details: [],
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
                                                  customer_name: "",
                                                  so_no: "",
                                                  grade: "",
                                                  colour: "",
                                                  width: "",
                                                  thickness: "",
                                                  length: "",
                                                  slitt_size: "",
                                                  no_rolls: "",
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
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.customer_name`}
                                                  id="customer_name"
                                                  style={{ width: "150px" }}
                                                />
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
                                                  component={CustomInput}
                                                  type="text"
                                                  name={`details.${index}.grade`}
                                                  id={`details.${index}.grade`}
                                                  style={{ width: "100px" }}
                                                />
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
                                                  name={`details.${index}.no_rolls`}
                                                  id={`details.${index}.no_rolls`}
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
                              <span>{props.details?.postDetails?.date}</span>
                            </div>
                            <div className="ml-3 w-50">
                              <span className="">Ref No: </span>
                              <span>{props.details?.postDetails?.ref_no}</span>
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
    details: state.details,
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
