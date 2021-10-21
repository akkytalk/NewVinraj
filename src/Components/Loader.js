import React from "react";
import { Card, CardBody } from "reactstrap";

export default function Loader() {
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
