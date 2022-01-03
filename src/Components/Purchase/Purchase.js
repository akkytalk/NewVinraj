/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React, { useEffect, useState, Fragment } from "react";

import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../reduxStore/actions";
import PurchaseRequition from "./PurchaseRequition";
import { Button } from "react-bootstrap";
import Loader2 from "../loader/Loader2";
import ViewPurchaseRequisition from "./ViewPurchaseRequisiton";
import EditPurchaseRequisition from "./EditPurchaseRequisition";
const Purchase = (props) => {
  let data = {
    token: props.login?.login?.token,
  };

  const [prefix, setPrefix] = useState([]);

  const [deleteStatus, setDeleteStatus] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [printStatus, setPrintStatus] = useState(false);

  useEffect(() => {
    status();
    props.onDepartmentGetData(data);
    props.onFormGetData(data);
    props.detailsGetData(data);
    props.onPrefixGetData(data);
    props.onItemNameGetData(data);
    settingPrefix();
  }, []);

  useEffect(() => {
    settingPrefix();
  }, [props.prefix?.length > 0]);

  function settingPrefix() {
    props.prefix?.map((pre) => {
      if (pre.form_id == 27 && pre.department_id == 8) {
        setPrefix(pre);
      }
    });
  }
  function status() {
    props.login?.login?.user?.rights?.map((right) => {
      if (right.form_id == 27) {
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

  // console.log(`createStatus`, createStatus);
  // console.log(`updateStatus`, updateStatus);
  // console.log(`deleteStatus`, deleteStatus);
  // console.log(`prefix`, prefix);
  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-warning text-white card-header-sticky d-flex p-2">
          <strong
            style={{
              fontSize: "12px",
            }}
          >
            Purchase Requisition
          </strong>
          {createStatus || props.login?.login?.user?.role == "admin" ? (
            <>
              {/* <Req2 /> */}
              <PurchaseRequition printStatus={printStatus} />
            </>
          ) : (
            ""
          )}
        </CardHeader>

        <CardBody className="p-1">
          <table
            className="table table-sm text-center"
            style={{ fontSize: "12px" }}
          >
            <thead className="table-sticky p-0">
              <tr className="p-0">
                {/* <th>ID</th> */}
                <th scope="col">Title</th>
                <th scope="col">Rev no</th>
                <th scope="col">Rev Date</th>
                <th scope="col">Date</th>
                <th scope="col">Ref no</th>
                {/* <th scope="col">View</th> */}
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.details?.isLoading ? (
                <tr>
                  <td colSpan={18}>
                    <Loader2 color={"primary"} />
                  </td>
                </tr>
              ) : props.details?.details?.length > 0 ? (
                props.details?.details.map((user, index) => {
                  if (user.ref_no)
                    return (
                      <tr key={index} className="">
                        <td style={{ padding: "1px" }}>{prefix?.title}</td>
                        <td style={{ padding: "1px" }}>{prefix?.rev_no}</td>
                        <td style={{ padding: "1px" }}>{prefix?.rev_date}</td>
                        <td style={{ padding: "1px" }}>
                          {user?.data[0]?.date}
                        </td>
                        <td style={{ padding: "1px" }}>{user.ref_no}</td>
                        <td
                          style={{ padding: "1px" }}
                          className="d-flex justify-content-center"
                        >
                          <ViewPurchaseRequisition
                            data={prefix}
                            formdata={user}
                            printStatus={printStatus}
                            ref_no={user.ref_no}
                            date={user?.data[0]?.date}
                            // itemName={props.itemName}
                          />{" "}
                          {(updateStatus ||
                            props.login?.login?.user?.role == "admin") && (
                            <EditPurchaseRequisition
                              data={prefix}
                              formdata={user}
                              ref_no={user.ref_no}
                              date={user?.data[0]?.date}
                            />
                          )}
                          {(deleteStatus ||
                            props.login?.login?.user?.role == "admin") && (
                            <Button
                              className="btn-danger ml-2"
                              style={{ padding: "2px", fontSize: "12px" }}
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

                        {/* <td
                          className="d-flex justify-content-center"
                          style={{ padding: "1px" }}
                        ></td> */}
                      </tr>
                    );
                })
              ) : (
                <tr>
                  <td colSpan={3}>No Form Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    form: state.form,
    department: state.department.department,
    details: state.details,
    prefix: state.prefix.prefix,
    itemName: state.itemName.itemName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onItemNameGetData: (data) => dispatch(actions.itemNameGetData(data)),
    onPrefixGetData: (data) => dispatch(actions.prefixGetData(data)),
    onDepartmentGetData: (data) => dispatch(actions.departmentGetData(data)),
    onFormGetData: (data) => dispatch(actions.formGetData(data)),
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
export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
