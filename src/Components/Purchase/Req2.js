import React, { useState, Fragment, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Row, Col, Button, Modal, ModalBody, ModalHeader } from "reactstrap";

const Req2 = (props) => {
  const [users, setUsers] = useState({
    dept: "",
    dino: "",
    title: "",
    revno: "",
    revdate: "",
    date: "",
    refno: "",
    item1: "",

    qty1: "",
    remarks1: "",
    price1: "",
    item2: "",

    qty2: "",
    remarks2: "",
    price2: "",
    item3: "",

    qty3: "",
    remarks3: "",
    price3: "",
    item4: "",

    qty4: "",
    remarks4: "",
    price4: "",
    item5: "",

    qty5: "",
    remarks5: "",
    price5: "",
    item6: "",

    qty6: "",
    remarks6: "",
    price6: "",
    item7: "",

    qty7: "",
    remarks7: "",
    price7: "",
    item8: "",

    qty8: "",
    remarks8: "",
    price8: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsers({ ...users, [name]: value });
  };

  const [modal, setModal] = useState(false);
  const [showtable, setShowTable] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setShowTable(false);
  };

  const showtableHandle = () => {
    setShowTable(true);
  };

  const onClick = () => {
    const divToDisplay = document.getElementById("htmlToPdf2");
    html2canvas(divToDisplay).then(function (canvas) {
      console.log(canvas);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "Potrait",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      console.log(pdfHeight, pdfWidth);
      pdf.addImage(imgData, "PNG", 1, 1, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  };

  console.log("users", users);

  return (
    <Fragment>
      <div id="xyz">
        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#extraLargeModal"
          onClick={toggle}
        >
          Add Requistion
        </button>
        {/* Modal */}
        <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              {!showtable ? (
                <div className="">
                  <div className="">
                    <div id="htmlToPdf" style={{ marginLeft: "20px" }}>
                      <div className="">
                        <div className="row">
                          <div className="col-md-4">
                            <img
                              src="https://uditsolutions.in/vinraj.png"
                              alt=""
                            />
                          </div>
                          <div
                            className="col-md-4 ml"
                            style={{ marginLeft: "180px" }}
                          >
                            <th>Dept</th>
                            <td>
                              <input
                                className="ml-2"
                                type="text"
                                size="7"
                                name="dept"
                                onChange={handleInputChange}
                              />
                            </td>
                            <br />
                            <th>Di.No</th>
                            <th>
                              <input
                                className="ml-2"
                                type="text"
                                size="7"
                                name="dino"
                                onChange={handleInputChange}
                              />
                            </th>
                          </div>
                          <hr />
                        </div>
                        <hr />
                        <div className="d-flex justify-content-around mb-4">
                          <div className="d-flex">
                            <th>Tittle</th>
                            <th>
                              <input
                                type="text"
                                className="ml-2"
                                name="title"
                                onChange={handleInputChange}
                              />
                            </th>
                          </div>
                          <div className="d-flex">
                            <th>Rev.no</th>
                            <th>
                              <input
                                type="text"
                                size="5"
                                className="ml-2"
                                name="revno"
                                onChange={handleInputChange}
                              />
                            </th>
                          </div>
                          <div className="d-flex">
                            <th>Rev.Date</th>
                            <th>
                              <input
                                type="date"
                                className="ml-2"
                                name="revdate"
                                onChange={handleInputChange}
                              />
                            </th>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex justify-content-around mb-4">
                          <div className="d-flex">
                            <label>Date</label>{" "}
                            <input
                              type="date"
                              className="ml-2"
                              name="date"
                              onChange={handleInputChange}
                            />{" "}
                          </div>
                          <div className="d-flex">
                            <label style={{ marginLeft: "110px" }}>
                              Ref No
                            </label>{" "}
                            <input
                              type="text"
                              className="ml-2"
                              name="refno"
                              onChange={handleInputChange}
                            />
                          </div>
                          {/* <div>
                        <label style={{ marginLeft: "110px" }}></label>{" "}
                        <input type="text" className="ml-2" />
                      </div> */}
                        </div>
                        <hr />
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Item name</th>
                              <th>Required Qty</th>
                              <th>Remarks</th>
                              <th>Approx price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  name="item1"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td style={{ marginLeft: "10px" }}>
                                <input
                                  type="text"
                                  size="4"
                                  name="qty1"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size=""
                                  name="remarks1"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size="4"
                                  name="price1"
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            {/*  */}
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  name="item2"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td style={{ marginLeft: "10px" }}>
                                <input
                                  type="text"
                                  size="4"
                                  name="qty2"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size=""
                                  name="remarks2"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size="4"
                                  name="price2"
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  name="item3"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td style={{ marginLeft: "10px" }}>
                                <input
                                  type="text"
                                  size="4"
                                  name="qty3"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size=""
                                  name="remarks3"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size="4"
                                  name="price3"
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  name="item4"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td style={{ marginLeft: "10px" }}>
                                <input
                                  type="text"
                                  size="4"
                                  name="qty4"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size=""
                                  name="remarks4"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size="4"
                                  name="price4"
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  name="item5"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td style={{ marginLeft: "10px" }}>
                                <input
                                  type="text"
                                  size="4"
                                  name="qty5"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size=""
                                  name="remarks5"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size="4"
                                  name="price5"
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  name="item6"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td style={{ marginLeft: "10px" }}>
                                <input
                                  type="text"
                                  size="4"
                                  name="qty6"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size=""
                                  name="remarks6"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size="4"
                                  name="price6"
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  name="item7"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td style={{ marginLeft: "10px" }}>
                                <input
                                  type="text"
                                  size="4"
                                  name="qty7"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size=""
                                  name="remarks7"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size="4"
                                  name="price7"
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  name="item8"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td style={{ marginLeft: "10px" }}>
                                <input
                                  type="text"
                                  size="4"
                                  name="qty8"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size=""
                                  name="remarks8"
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  size="4"
                                  name="price8"
                                  onChange={handleInputChange}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/*  */}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={toggle}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={showtableHandle}
                    >
                      OK
                    </button>
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="">
                    <div id="htmlToPdf2" style={{ marginLeft: "20px" }}>
                      <div className="">
                        <div className="row">
                          <div className="col-md-4">
                            <img
                              src="https://uditsolutions.in/vinraj.png"
                              alt=""
                            />
                          </div>
                          <div
                            className="col-md-4 ml"
                            style={{ marginLeft: "180px" }}
                          >
                            {users.dept && (
                              <div className="d-flex">
                                <th>Dept</th>
                                <td className="ml-2">{users.dept}</td>
                              </div>
                            )}

                            <br />

                            {users.dino && (
                              <div className="d-flex">
                                <th>Di.No</th>

                                <td className="ml-2">{users.dino}</td>
                              </div>
                            )}
                          </div>
                          <hr />
                        </div>
                        <hr />
                        <div className="d-flex justify-content-around mb-4">
                          {users.title && (
                            <div className="d-flex">
                              <th>Tittle</th>

                              <td className="ml-2">{users.title}</td>
                            </div>
                          )}

                          {users.revno && (
                            <div className="d-flex">
                              <th>Rev.no</th>

                              <td className="ml-2">{users.revno}</td>
                            </div>
                          )}

                          {users.revdate && (
                            <div className="d-flex">
                              <th>Rev.Date</th>

                              <td className="ml-2">{users.revdate}</td>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="d-flex justify-content-around mb-4">
                          {users.date && (
                            <div className="d-flex">
                              <label>Date</label>{" "}
                              <td className="ml-2">{users.date}</td>
                            </div>
                          )}

                          {users.refno && (
                            <div className="d-flex">
                              <label style={{ marginLeft: "110px" }}>
                                Ref No
                              </label>{" "}
                              <td className="ml-2">{users.refno}</td>
                            </div>
                          )}
                        </div>
                        <hr />
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Item name</th>
                              <th>Required Qty</th>
                              <th>Remarks</th>
                              <th>Approx price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {users.item1 && <td>{users.item1}</td>}
                              {users.qty1 && (
                                <td style={{ marginLeft: "10px" }}>
                                  {users.qty1}
                                </td>
                              )}
                              {users.remarks1 && <td>{users.remarks1}</td>}
                              {users.price1 && <td>{users.price1}</td>}
                            </tr>
                            {/*  */}
                            <tr>
                              {users.item2 && <td>{users.item2}</td>}
                              {users.qty2 && (
                                <td style={{ marginLeft: "10px" }}>
                                  {users.qty2}
                                </td>
                              )}
                              {users.remarks2 && <td>{users.remarks2}</td>}
                              {users.price2 && <td>{users.price2}</td>}
                            </tr>
                            <tr>
                              {users.item3 && <td>{users.item3}</td>}
                              {users.qty3 && (
                                <td style={{ marginLeft: "10px" }}>
                                  {users.qty3}
                                </td>
                              )}
                              {users.remarks3 && <td>{users.remarks3}</td>}
                              {users.price3 && <td>{users.price3}</td>}
                            </tr>
                            <tr>
                              {users.item4 && <td>{users.item4}</td>}
                              {users.qty4 && (
                                <td style={{ marginLeft: "9px" }}>
                                  {users.qty4}
                                </td>
                              )}
                              {users.remarks4 && <td>{users.remarks4}</td>}
                              {users.price4 && <td>{users.price4}</td>}
                            </tr>
                            <tr>
                              {users.item5 && <td>{users.item5}</td>}
                              {users.qty5 && (
                                <td style={{ marginLeft: "9px" }}>
                                  {users.qty5}
                                </td>
                              )}
                              {users.remarks5 && <td>{users.remarks5}</td>}
                              {users.price5 && <td>{users.price5}</td>}
                            </tr>
                            <tr>
                              {users.item6 && <td>{users.item6}</td>}
                              {users.qty6 && (
                                <td style={{ marginLeft: "9px" }}>
                                  {users.qty6}
                                </td>
                              )}
                              {users.remarks6 && <td>{users.remarks6}</td>}
                              {users.price6 && <td>{users.price6}</td>}
                            </tr>
                            <tr>
                              {users.item7 && <td>{users.item7}</td>}
                              {users.qty7 && (
                                <td style={{ marginLeft: "9px" }}>
                                  {users.qty7}
                                </td>
                              )}
                              {users.remarks7 && <td>{users.remarks7}</td>}
                              {users.price7 && <td>{users.price7}</td>}
                            </tr>
                            <tr>
                              {users.item8 && <td>{users.item8}</td>}
                              {users.qty8 && (
                                <td style={{ marginLeft: "9px" }}>
                                  {users.qty8}
                                </td>
                              )}
                              {users.remarks8 && <td>{users.remarks8}</td>}
                              {users.price8 && <td>{users.price8}</td>}
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/*  */}
                    </div>
                  </div>
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
                      onClick={onClick}
                    >
                      save as pdf
                    </button>
                  </div>
                </div>
              )}
            </form>
          </ModalBody>
        </Modal>
      </div>
      {/* <button onClick={onClick}>save as pdf</button> */}
    </Fragment>
  );
};

export default Req2;
