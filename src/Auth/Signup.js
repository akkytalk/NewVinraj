import React, { Fragment } from "react";
import {
  Card,
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CardBody,
  Row,
  Col,
} from "reactstrap";

import { Formik, Form, Field, yupToFormErrors } from "formik";

import CustomInput from "../views/Custom/CustomInput";
import FA from "react-fontawesome";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postSignup } from "../reduxStore/actions";

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postSignup: (data) => {
    dispatch(postSignup(data));
  },
});

function Signup(props) {
  const handleSubmit = (values, setSubmitting) => {
    let data = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      city: values.city,
      state: values.state,
      pincode: values.pincode,

      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    console.log(data);
    props.postSignup(data);
    setSubmitting(false);
    return;
  };

  console.log("signup data", props.login?.login);
  console.log("error message", props.login?.errMess);

  if (props.login?.login.length !== 0) {
    return <Redirect to={"/"} />;
  } else if (props.login?.isLoading) {
    //Spinner when service data sending under processing
    return (
      <div
        className="col-xs-12 col-sm-12 col-md-5 col-lg-4"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card className="p-5">
          <CardBody>
            <div
              className="spinner-grow text-success col-xs-12 col-sm-12 col-md-5 col-lg-4"
              style={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <Fragment>
      <div
        className="col-xs-12 col-sm-12 col-md-8 col-lg-8"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card>
          <h3 style={{ fontSize: "4em", textAlign: "center" }} className="p-2">
            Register
          </h3>

          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              address: "",
              city: "",
              state: "",
              pincode: "",

              password: "",
              password_confirmation: "",
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => (
              <Form>
                <div className="p-4  d-flex flex-column ">
                  <Col
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <FormGroup>
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"user"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="name"
                          name="name"
                          id="name"
                          placeholder="Enter Name"
                        />
                      </InputGroup>
                      <span className="text-danger pt-3 text-center">
                        {props.signup?.errMess
                          ? props.signup?.errMess?.name
                          : null}
                      </span>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"envelope-square"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter Email"
                        />
                      </InputGroup>
                      <span className="text-danger pt-3 text-center">
                        {props.signup?.errMess
                          ? props.signup?.errMess?.email
                          : null}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <FormGroup className="col-md-10 col-lg-10 col-sm-12">
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"address-card"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Enter Address"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <FormGroup>
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"building"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="city"
                          id="city"
                          placeholder="Enter City Name"
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"usps"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="state"
                          id="state"
                          placeholder="Enter State Name"
                        />
                      </InputGroup>
                    </FormGroup>
                    {}
                  </Col>
                  <Col
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <FormGroup>
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"map-pin"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="pincode"
                          id="pincode"
                          placeholder="Enter pincode"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"phone-volume"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="number"
                          name="phone"
                          id="phone"
                          placeholder="Enter phone Number"
                        />
                      </InputGroup>
                      <span className="text-danger pt-3 text-center">
                        {props.signup?.errMess
                          ? props.signup?.errMess?.phone
                            ? "The phone must be 10 digits."
                            : null
                          : null}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <FormGroup>
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"unlock-alt"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter Password"
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"unlock-alt"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="password"
                          name="password_confirmation"
                          id="password_confirmation"
                          placeholder="Confirm Password"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </div>
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingLeft: "100px",
                    paddingRight: "100px",
                  }}
                >
                  <FormGroup>
                    <span className="text-danger pt-3 text-center">
                      {props.signup?.errMess
                        ? props.signup?.errMess?.message === "401"
                          ? "Wrong Signup credentials"
                          : props.signup?.errMess?.message
                        : null}
                    </span>
                    <Button
                      color="primary"
                      className=""
                      type="submit"
                      size="lg"
                      block
                      disabled={formProps.isSubmitting}
                    >
                      Register Now
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    <Link to="/login">
                      <Button
                        className="btn-warning "
                        type="button"
                        size="lg"
                        block
                        // disabled={formProps.isSubmitting}
                      >
                        Already User? Login Here
                      </Button>
                    </Link>
                  </FormGroup>
                </Col>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

// export default Signup2;
