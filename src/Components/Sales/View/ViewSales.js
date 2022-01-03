/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../../reduxStore/actions";

import printJS from "print-js";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

import "../../Purchase/PurchaseOrder.css";
import "../../../css/Format.css";

function ViewSales(props) {
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
      font_size: "12pt",
      maxWidth: 1080,
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
        <ModalHeader toggle={toggle}>View Enquiry Form </ModalHeader>
        <ModalBody>
          <div>
            <div id="htmlToPdf2" className="p-2">
              <div className="d-flex test">
                <div className="col-md-4 test-r p-1 text-center">
                  <img src="https://uditsolutions.in/vinraj.png" alt="" />
                </div>
                <div className="col-md-3 test-r"></div>
                <div className="col-md-5 p-0 text-center">
                  <div className="d-flex">
                    <th className="test-r test-b w-25 ">Dept: </th>
                    <td className=" test-b w-75 ">Sales & Marketing</td>
                  </div>
                  <br />

                  <div className="d-flex test-t">
                    <th className="test-r w-25 ">Di.No: </th>
                    <td className="w-75 ">{props.data?.di_no}</td>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="d-flex mb-4 w-100">
                  <div className="ml-3 w-25">
                    <span className="">Title </span>
                    <span className="">{props.data?.title}</span>
                  </div>
                  <div className="ml-3 w-25">
                    <span className="">Rev. No.: </span>
                    <span>{props.data?.rev_no}</span>
                  </div>
                  <div className="ml-3 w-25">
                    <span className="">Rev. Date: </span>
                    <span>{props.data?.rev_date}</span>
                  </div>
                </div>
                <div className="d-flex mb-4 w-100">
                  <div className="ml-3 w-50">
                    <span className="">Date: </span>
                    <span>{props.data?.date}</span>
                  </div>
                  <div className="ml-3 w-50">
                    <span className="">Ref No: </span>
                    <span>{props.data?.ref_no}</span>
                  </div>
                </div>
              </div>
              <div className="test">
                <div className="test-b">
                  <span className="pl-1 ">Customer Name: </span>
                  <span>{props.data?.customer_name}</span>
                </div>
                <div className=" test-b">
                  <span className="pl-1 ">H.O Address: </span>
                  <span>{props.data?.address}</span>
                </div>
                <div className=" test-b">
                  <span className="pl-1 ">Contact Name: </span>
                  <span>{props.data?.contact_name}</span>
                </div>
                <div className=" test-b">
                  <span className="pl-1 ">Contact No: </span>
                  <span>{props.data?.contact_no}</span>
                </div>
                <div className=" test-b">
                  <span className="pl-1 ">Email Id: </span>
                  <span>{props.data?.email}</span>
                </div>
                <div className="text-center d-flex flex-column w-100">
                  <div className="d-flex w-100">
                    <span className="test-b p-2 test-r w-25"> Sr No.</span>
                    <div className="d-flex flex-column w-50">
                      <span className="test-b test-r ">
                        {" "}
                        Requirement Details
                      </span>
                      <div className="d-flex test-b w-100">
                        <span className="test-r p-1 w-25"> Size</span>
                        <span className="test-r p-1 w-40"> Thickness</span>
                        <span className="test-r p-1 w-25"> Colour</span>
                        <span className="test-r p-1 w-25"> Qty</span>
                      </div>
                    </div>
                    <span className="test-b p-2 test-r w-25">Grade</span>
                    <span className="test-b p-2 test-r w-25"> Application</span>
                    <span className="test-b p-2 w-25"> Delivery Location</span>
                  </div>
                  {props.data?.enquiry_details?.map((de, index) => {
                    return (
                      <div className="d-flex w-100 test-b">
                        <span className=" p-2 test-r w-25"> {index + 1}</span>
                        <div className="d-flex w-50">
                          <span className="test-r p-1 w-25">{de.size} </span>
                          <span className="test-r p-1 w-40">
                            {de.thickness}{" "}
                          </span>
                          <span className="test-r p-1 w-25">{de.colour} </span>
                          <span className="test-r p-1 w-25">{de.qty} </span>
                        </div>
                        <span className="p-2 test-r w-25">{de.grade}</span>
                        <span className="p-2 test-r w-25">
                          {de.application}{" "}
                        </span>
                        <span className="p-2 w-25">{de.location} </span>
                      </div>
                    );
                  })}
                </div>
                <div className="test-b">
                  <span className="pl-1 ">Payment Term: </span>
                  <span>{props.data?.payment_term}</span>
                </div>
                <div className="test-b">
                  <span className="pl-1 ">Reference: </span>
                  <span>{props.data?.reference}</span>
                </div>
                <div className="">
                  <span className="pl-1">Remarks: </span>
                  <span>{props.data?.remark}</span>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewSales);
