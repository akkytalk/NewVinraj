/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../reduxStore/actions";

import printJS from "print-js";
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";

import "./PurchaseOrder.css";

function ViewPurchaseRequisition(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const printMutliple = () => {
    console.log("print");
    printJS({
      printable: "htmlToPdf2",
      type: "html",
      scanStyles: "true",
      targetStyles: "[*]",
    });
  };

  console.log(`props.formdata`, props.formdata);
  return (
    <Fragment>
      <Button
        className="btn-info"
        style={{ padding: "2px", fontSize: "12px" }}
        onClick={() => {
          toggle();
          printMutliple();
        }}
      >
        <i className="fa fa-eye" aria-hidden="true"></i>
      </Button>
      <Modal className="modal-info modal-xl" isOpen={modal} toggle={toggle}>
        {/* {props.details?.isPostLoading && <Loader2 />} */}
        <ModalHeader toggle={toggle}>View Purchase Requisition</ModalHeader>
        <ModalBody>
          <div>
            <div id="htmlToPdf2" style={{ marginLeft: "20px" }}>
              <div className="row">
                <div className="col-md-3">
                  <img src="https://uditsolutions.in/vinraj.png" alt="" />
                </div>
                <div className="col-md-3">
                  <div className="d-flex">
                    <th>Dept: </th>
                    <td className="ml-2">Purchase</td>
                  </div>
                  <br />

                  <div className="d-flex">
                    <th>Di.No: </th>
                    <td className="ml-2">{props.data?.di_no}</td>
                  </div>
                </div>
              </div>
              <hr />
              <div className="">
                <div className="d-flex mb-4 w-100">
                  <div className="mr-3 w-25">
                    <span className="">Title: </span>
                    <span>{props.data?.title}</span>
                  </div>
                  <div className="mr-3 w-25">
                    <span className="">Rev. No.: </span>
                    <span>{props.data?.rev_no}</span>
                  </div>
                  <div className="mr-3 w-50">
                    <span className="">Rev. Date: </span>
                    <span>{props.data?.rev_date}</span>
                  </div>
                </div>
                <div className="d-flex mb-4 w-100">
                  <div className="mr-3 w-50">
                    <span className="">Date: </span>
                    <span>{props.date}</span>
                  </div>
                  <div className="mr-3 w-50">
                    <span className="">Ref No: </span>
                    <span>{props.ref_no}</span>
                  </div>
                </div>
              </div>

              <Table size="sm" className=" mt-4">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Remarks</th>
                    <th>Approx price</th>
                  </tr>
                </thead>
                <tbody className="">
                  {props.formdata?.data?.map((detail, index) => {
                    return (
                      <tr key={index} className="">
                        <td>{detail.item_name}</td>
                        <td>{detail.quantity}</td>
                        <td>{detail.remarks}</td>
                        <td>{detail.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <p className="mt-4 pr-5 mb-2">
                Note: In 1 PR, do not mix 2 stock groups. Make separate PR for
                the other stock group. Write “URGENT” in Remarks if Item is
                required urgently.
              </p>
              {/* <div className="mt-100">
                <div className="d-flex ">
                  <span className="w-20 test"></span>
                  <span className="w-20 test pl-1">Destination</span>
                  <span className="w-20 test pl-1">Name</span>
                  <span className="w-20 test pl-1">Sign</span>
                  <span className="w-20 test pl-1">Date</span>
                </div>
                <div className="d-flex">
                  <span className="w-20 h-40p pl-1 test">Prepared By:</span>
                  <span className="w-20 test pl-1"></span>
                  <span className="w-20 test pl-1"></span>
                  <span className="w-20 test pl-1"></span>
                  <span className="w-20 test pl-1"></span>
                </div>
                <div className="d-flex">
                  <span className="w-20 h-40p pl-1 test">Approved By:</span>
                  <span className="w-20 test pl-1"></span>
                  <span className="w-20 test pl-1"></span>
                  <span className="w-20 test pl-1"></span>
                  <span className="w-20 test pl-1"></span>
                </div>
              </div>
             */}
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
)(ViewPurchaseRequisition);
