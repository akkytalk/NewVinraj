import React, { Fragment, useState } from "react";
import { Row, Col } from "reactstrap";
import Top from "./starter/Top";

function DashboardLayout(props) {
  return (
    <Fragment>
      <Row>
        <Col className="mt-4">{/* <Top {...props} /> */}</Col>
      </Row>
      <Row>
        {/* <Col sm={6} lg={8}>
                    <BookingSummary />
                  </Col> */}
      </Row>
      <Row>
        <Col sm={12}></Col>
      </Row>
      <Row>
        <Col sm={12}></Col>
      </Row>
    </Fragment>
  );
}

export default DashboardLayout;
