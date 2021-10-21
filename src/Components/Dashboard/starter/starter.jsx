import React from "react";
import { Row, Col } from "reactstrap";
import "../../assets/css/datatable.css";
import { Feeds, SalesSummary } from "../../components/dashboard-components";
import Top from "./Top";
class Starter extends React.Component {

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Top {...this.props} />
          </Col>
        </Row>
         <Row>
          <Col sm={6} lg={8}>
            <SalesSummary />
          </Col>
          <Col sm={6} lg={4}>
            <Feeds />
          </Col>
        </Row>  
        <Row>
          <Col sm={12}>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Starter;
