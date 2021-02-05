import React, { useState, Fragment, useEffect } from 'react'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const Req= () => {
  const userData = [
    { id: 1, tittle: 'Tania', Date: 'floppydiskette', RefNo: "123" }
    
  ]


const [users, setUsers] = useState(userData)

const onClick = () => {

  const divToDisplay = document.getElementById('htmlToPdf')
  html2canvas(divToDisplay).then(function (canvas) {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'Potrait',
    });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    console.log(pdfHeight, pdfWidth)
    pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
    pdf.save("download.pdf");
  })
}
return (
  <Fragment>
    <div id="xyz">
      <button className="btn btn-primary" data-toggle="modal" data-target="#extraLargeModal">Add Requistion</button>
      {/* Modal */}
      <div id="extraLargeModal" className="modal fade" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-xl">
          <div className="modal-content " >
            <div className="modal-header">

              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div className="modal-body">

              <div id="htmlToPdf" style={{ marginLeft: "20px" }}>
                <div className="">
                  <div className="row">
                    <div className="col-md-4"><img src="https://uditsolutions.in/vinraj.png"/></div>
                    <div className="col-md-4 ml" style={{ marginLeft: "180px" }}>
                      <th>Dept</th>
                      <td><input type="text" size="7" /></td><br />
                      <th>Di.No</th>
                      <th><input type="text" size="7" /></th>
                    </div>
                    <hr />
                  </div>
                  <hr />
                  <th>Tittle</th><th><input type="text" maxLength="4" size="4"
                  
                  /></th>
                  <th>Rev.no</th><th><input type="text" size="5" /></th><th>Rev.Date</th>
                  <th><input type="date" /></th>
                </div>
                <div>
                  <label>Date</label> <input type="date" /> <lable style={{ marginLeft: "110px" }}>Ref No</lable> <input type="text" />
                  <hr />
                  <table>
                    <thead>
                      <tr>
                        <th>Item name</th>
                        <th>Required<br />Qty</th>
                        <th>Remarks</th>
                        <th>Approx <br />price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input type="text" />
                        </td>
                        <td style={{ marginLeft: "10px" }}>
                          <input type="text" size="4" />
                        </td>
                        <td>
                          <input type="text" size="" />
                        </td>
                        <td>
                          <input type="text" size="4" />
                        </td>
                      </tr>
                      {/*  */}
                      <tr>
                        <td>
                          <input type="text" />
                        </td>
                        <td style={{ marginLeft: "10px" }}>
                          <input type="text" size="4" />
                        </td>
                        <td>
                          <input type="text" size="" />
                        </td>
                        <td>
                          <input type="text" size="4" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input type="text" />
                        </td>
                        <td style={{ marginLeft: "10px" }}>
                          <input type="text" size="4" />
                        </td>
                        <td>
                          <input type="text" size="" />
                        </td>
                        <td>
                          <input type="text" size="4" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input type="text" />
                        </td>
                        <td style={{ marginLeft: "10px" }}>
                          <input type="text" size="4" />
                        </td>
                        <td>
                          <input type="text" size="" />
                        </td>
                        <td>
                          <input type="text" size="4" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input type="text" />
                        </td>
                        <td style={{ marginLeft: "10px" }}>
                          <input type="text" size="4" />
                        </td>
                        <td>
                          <input type="text" size="" />
                        </td>
                        <td>
                          <input type="text" size="4" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input type="text" />
                        </td>
                        <td style={{ marginLeft: "10px" }}>
                          <input type="text" size="4" />
                        </td>
                        <td>
                          <input type="text" size="" />
                        </td>
                        <td>
                          <input type="text" size="4" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input type="text" />
                        </td>
                        <td style={{ marginLeft: "10px" }}>
                          <input type="text" size="4" />
                        </td>
                        <td>
                          <input type="text" size="" />
                        </td>
                        <td>
                          <input type="text" size="4" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input type="text" />
                        </td>
                        <td style={{ marginLeft: "10px" }}>
                          <input type="text" size="4" />
                        </td>
                        <td>
                          <input type="text" size="" />
                        </td>
                        <td>
                          <input type="text" size="4" />
                        </td>
                      </tr>


                    </tbody>

                  </table>
                </div>

                {/*  */}

              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={onClick}>OK</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    {/* <button onClick={onClick}>save as pdf</button> */}
  </Fragment>
)
}

export default Req