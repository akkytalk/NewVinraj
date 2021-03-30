import React, { useState, Fragment, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Row, Col, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import "./PurchaseOrder.css";

const PurchaseOrder = (props) => {
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
              <div className="">
                <div className="" id="htmlToPdf2">
                  <h4 className="text-center mb-3">PURCHASE ORDER</h4>
                  <div className="purchase-order">
                    <div className="purchase-order-1">
                      <div className="purchase-order-1-section-1">
                        <div className="purchase-order-1-section-1-item-1">
                          <span>Invoice To</span>
                          <span style={{ fontWeight: "600", fontSize: "17px" }}>
                            Janki Overseas
                          </span>
                          <span>address</span>
                          <div>
                            <span>GSTIN/UIN:</span>
                            <span className="ml-2">6546846846</span>
                          </div>
                          <div>
                            <span>State Name:</span>
                            <span className="ml-2">Maharastra</span>
                          </div>
                          <div>
                            <span>E-mail:</span>
                            <span className="ml-2">aakash@gmail.com</span>
                          </div>
                        </div>
                        <div className="purchase-order-1-section-1-item-2">
                          <span>Despatch To</span>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </div>

                        <div className="purchase-order-1-section-1-item-3">
                          <span>Suppiler</span>
                          <span style={{ fontWeight: "600", fontSize: "17px" }}>
                            3S industries
                          </span>
                          <div>
                            <span>State Name:</span>
                            <span className="ml-2">Maharastra</span>
                          </div>
                        </div>
                      </div>
                      <div className="purchase-order-1-section-2">
                        <div className="purchase-order-1-section-2-item-1">
                          <div className="purchase-order-1-section-2-item-1-table-1">
                            <div className="purchase-order-1-section-2-item-1-table-1-item-1">
                              <span>Voucher No.</span>
                              <span className="ml-1">1</span>
                            </div>
                            <div className="purchase-order-1-section-2-item-1-table-1-item-1">
                              <span></span>
                              <span className="ml-1"></span>
                            </div>
                            <div className="purchase-order-1-section-2-item-1-table-1-item-1">
                              <span>Suppiler's Ref./Order No.</span>
                              <span>2</span>
                            </div>

                            <div className="purchase-order-1-section-2-item-1-table-1-item-2">
                              <span>Despatch Through :</span>
                              <span className="ml-1"></span>
                            </div>
                          </div>
                          <div className="purchase-order-1-section-2-item-1-table-2">
                            <div className="purchase-order-1-section-2-item-1-table-1-item-1">
                              <span>Dated : </span>
                              <span
                                className="ml-1"
                                style={{ fontWeight: "600" }}
                              >
                                11-02-2021
                              </span>
                            </div>
                            <div className="purchase-order-1-section-2-item-1-table-1-item-1">
                              <span>Mode/Terms of Payment:</span>
                              <span className="ml-1"> Cash</span>
                            </div>
                            <div className="purchase-order-1-section-2-item-1-table-1-item-1">
                              <span>Other Prefences :</span>
                              <span>Prefences</span>
                            </div>

                            <div className="purchase-order-1-section-2-item-1-table-1-item-2">
                              <span>Destination :</span>
                              <span className="ml-1"> Mumbai</span>
                            </div>
                          </div>
                        </div>
                        <div className="purchase-order-1-section-2-item-2">
                          <span>Terms of Delivery</span>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="purchase-order-2">
                      <div className="purchase-order-2-sextion-1">
                        <div className="purchase-order-2-sextion-2-header-1">
                          Sr No.
                        </div>
                        <div className="purchase-order-2-sextion-2-header-2">
                          Descriptions of Goods
                        </div>
                        <div className="purchase-order-2-sextion-2-header-3">
                          Due on
                        </div>
                        <div className="purchase-order-2-sextion-2-header-4">
                          Quantity
                        </div>
                        <div className="purchase-order-2-sextion-2-header-5">
                          Rate
                        </div>
                        <div className="purchase-order-2-sextion-2-header-6">
                          Per
                        </div>
                        <div className="purchase-order-2-sextion-2-header-7">
                          Amount
                        </div>
                      </div>

                      {/* use map Function here to display products */}

                      <div className="purchase-order-2-sextion-1">
                        <div className="purchase-order-2-sextion-2-header-1">
                          1.
                        </div>
                        <div className="purchase-order-2-sextion-2-header-2">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </div>
                        <div className="purchase-order-2-sextion-2-header-3">
                          15-02-2016
                        </div>
                        <div className="purchase-order-2-sextion-2-header-4">
                          16
                        </div>
                        <div className="purchase-order-2-sextion-2-header-5">
                          15
                        </div>
                        <div className="purchase-order-2-sextion-2-header-6">
                          12
                        </div>
                        <div className="purchase-order-2-sextion-2-header-7">
                          10000
                        </div>
                      </div>

                      {/* End of map Function here to display products */}

                      <div className="purchase-order-2-sextion-1">
                        <div className="purchase-order-2-sextion-2-header-1"></div>
                        <div
                          className="purchase-order-2-sextion-2-header-2"
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          Total
                        </div>
                        <div className="purchase-order-2-sextion-2-header-3"></div>
                        <div className="purchase-order-2-sextion-2-header-4"></div>
                        <div className="purchase-order-2-sextion-2-header-5"></div>
                        <div className="purchase-order-2-sextion-2-header-6"></div>
                        <div className="purchase-order-2-sextion-2-header-7"></div>
                      </div>
                    </div>

                    <div className="purchase-order-3">
                      <div className="purchase-order-3-section-1">
                        E. & O.E.
                      </div>
                      <div className="purchase-order-3-section-2">
                        <span>Company's PAN :</span>
                        <span>AAJHK6318Q</span>
                      </div>
                      <div className="purchase-order-3-section-3">
                        <span>for Janki Overseas</span>
                        <span>Authorised Signatory</span>
                      </div>
                    </div>
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
            </form>
          </ModalBody>
        </Modal>
      </div>
      {/* <button onClick={onClick}>save as pdf</button> */}
    </Fragment>
  );
};

export default PurchaseOrder;
