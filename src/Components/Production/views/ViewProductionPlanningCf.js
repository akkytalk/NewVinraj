/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../../reduxStore/actions";

import printJS from "print-js";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import planningImg from "../../../assets/img/planning.png";
import "../../Purchase/PurchaseOrder.css";
import "../../../css/Format.css";

function ViewProductionPlanningCf(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const printMutliple = () => {
    console.log("print");
    printJS({
      printable: "htmlToPdf2",
      type: "html",
      scanStyles: true,
      targetStyles: "[*]",
      honorMarginPadding: false,
      font_size: "8pt",
      maxWidth: 1080,
      // style: "@page { size: Letter landscape; }",
    });
  };

  return (
    <Fragment>
      <Button
        className="btn-info p-1"
        onClick={() => {
          toggle();
          printMutliple();
        }}
      >
        <i className="fa fa-eye" aria-hidden="true"></i>
      </Button>
      <Modal className="modal-info modal-xl" isOpen={modal} toggle={toggle}>
        {/* {props.details?.isPostLoading && <Loader2 />} */}
        <ModalHeader toggle={toggle}>View Production Planning Cf</ModalHeader>
        <ModalBody>
          <div>
            <div id="htmlToPdf2" className="d-flex flex-column  w-100">
              <div className="d-flex test w-100">
                <div className="w-25 test-r p-1 text-center">
                  <img src="https://uditsolutions.in/vinraj.png" alt="" />
                </div>
                <div className="w-50 test-r">
                  <img
                    src={planningImg}
                    alt="DAILY PRODUCTION PLANNING SHEET."
                    style={{
                      objectFit: "contain",
                      maxWidth: "600px",
                      position: "relative",
                      top: "15px",
                      left: "-50px",
                    }}
                  />
                </div>
                <div className="w-25 f-12 p-0 text-center d-flex flex-column justify-content-between">
                  <div className="d-flex">
                    <th className="w-40">Di.No: </th>
                    <td className="w-60">{props.data?.di_no}</td>
                  </div>
                  <div className="d-flex">
                    <th className="w-40">Rev. No.: </th>
                    <td className="w-60">{props.data?.rev_no}</td>
                  </div>
                  <div className="d-flex">
                    <th className="w-50">Rev. Date: </th>
                    <td className="w-60">{props.data?.rev_date}</td>
                  </div>
                </div>
              </div>

              <div className="test w-100">
                <div className="d-flex mb-1 w-100">
                  <div className="ml-3 w-50">
                    <span className="">Date: </span>
                    <span>{props.date}</span>
                  </div>
                  <div className="ml-3 w-50">
                    <span className="">Ref No: </span>
                    <span>{props.ref_no}</span>
                  </div>
                </div>
              </div>
              <div className="w-100 f-10">
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
                    {props.formdata?.data?.map((de, index) => {
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
                          <td className="test">{de.actual_production}</td>
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
)(ViewProductionPlanningCf);
