/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React, { useEffect, useState, Fragment } from "react";

import Req2 from "./Req2";
import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../reduxStore/actions";
import PurchaseRequition from "./PurchaseRequition";
import { Button } from "react-bootstrap";
import Loader2 from "../loader/Loader2";
import ViewPurchaseRequisition from "./ViewPurchaseRequisiton";
const Purchase = (props) => {
  let data = {
    token: props.login?.login?.token,
  };

  const [deleteStatus, setDeleteStatus] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [printStatus, setPrintStatus] = useState(false);

  useEffect(() => {
    status();
    props.onDepartmentGetData(data);
    props.onFormGetData(data);
  }, []);

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
  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-warning text-white card-header-sticky d-flex ">
          <strong>Purchase Requisition</strong>
          {createStatus || props.login?.login?.user?.role == "admin" ? (
            <>
              {/* <Req2 /> */}
              <PurchaseRequition printStatus={printStatus} />
            </>
          ) : (
            ""
          )}
        </CardHeader>

        <CardBody>
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
                  .filter((user) => user.id == 27)
                  .map((user, index) => {
                    return user.form_headers.map((form) => {
                      return (
                        <tr key={index}>
                          <td>{form.title}</td>
                          <td>{form.rev_no}</td>
                          <td>{form.rev_date}</td>
                          <td>{form.date}</td>
                          <td>{form.ref_no}</td>
                          <td>
                            <ViewPurchaseRequisition
                              data={form}
                              formdata={user}
                              printStatus={printStatus}
                            />{" "}
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
                  <td colSpan={3}>No Prefixs</td>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
