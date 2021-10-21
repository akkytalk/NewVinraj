import React from "react";

function productionplannigcfformfile({ formProps, ...props }) {
  return (
    <div>
      <div id="htmlToPdf2" className="test f-10">
        <div className="d-flex test">
          <div className="col-md-3 test-r p-1 text-center">
            <img src="https://uditsolutions.in/vinraj.png" alt="" />
          </div>
          <div className="col-md-6 test-r d-flex justify-content-center align-items-center">
            <h5 className="font-weight-bold text-underline">
              DAILY PRODUCTION PLANNING SHEET.
            </h5>
          </div>
          <div className="col-md-3 p-0 text-center">
            <div className="d-flex">
              <th className="w-40">Di.No: </th>
              <td className="w-60">{formProps.values?.di_no}</td>
            </div>
            <div className="d-flex">
              <th className="w-40">Rev. No.: </th>
              <td className="w-60">{formProps.values?.rev_no}</td>
            </div>
            <div className="d-flex">
              <th className="w-40">Rev. Date: </th>
              <td className="w-60">{formProps.values?.rev_date}</td>
            </div>
          </div>
        </div>

        <div className="test">
          <div className="d-flex mb-1 w-100">
            <div className="ml-3 w-50">
              <span className="">Date: </span>
              <span>{props.details?.postDetails?.date}</span>
            </div>
            <div className="ml-3 w-50">
              <span className="">Ref No: </span>
              <span>{props.details?.postDetails?.ref_no}</span>
            </div>
          </div>
        </div>
        <div className="test">
          <div className="text-center test-b d-flex flex-column w-100">
            <div className="d-flex w-100">
              <span className="test-b p-2 test-r w-10"> Sr No.</span>
              <span className="test-b p-2 test-r w-25">Customer Name</span>
              <span className="test-b p-2 test-r w-10">SO NO</span>
              <span className="test-b p-2 test-r w-15">GRADE</span>
              <span className="test-b p-2 w-15 test-r">COLOUR</span>
              <span className="test-b p-2 w-15 test-r">WIDTH (MM)</span>
              <span className="test-b p-2 w-15 test-r">THICKNESS (MM)</span>
              <span className="test-b p-2 w-15 test-r">LENGTH (METRE)</span>
              <span className="test-b p-2 w-15 test-r">NO. OF ROLLS</span>

              <span className="test-b p-2 w-15 test-r">QUANTITY (KG)</span>
              <span className="test-b p-2 w-15 test-r">SLITT SIZE (MM)</span>
              <span className="test-b p-2 w-25 test-r">ACTUAL PRODUCTION</span>
              <span className="test-b p-2 w-25 test-r">BALANCE</span>
              <span className="test-b p-2 w-15 test-r">C/F</span>
              <span className="test-b p-2 w-25 test-r">REMARKS</span>
            </div>
            {formProps.values?.details?.map((de, index) => {
              return (
                <div className="d-flex w-100 test-b">
                  <span className=" p-2 test-r w-10">{index + 1}</span>

                  <span className="test-r p-1 w-25">{de.customer_name}</span>
                  <span className="test-r p-1 w-10">{de.so_no}</span>
                  <span className="test-r p-1 w-15"> {de.grade}</span>
                  <span className="test-r p-1 w-15">{de.colour} </span>

                  <span className="p-2 test-r w-15">{de.width}</span>
                  <span className="p-2 test-r w-15">{de.thickness}</span>
                  <span className="p-2 test-r w-15">{de.length}</span>
                  <span className="p-2 test-r w-15">{de.no_rolls}</span>
                  <span className="p-2 test-r w-15">{de.qty}</span>
                  <span className="p-2 test-r w-15">{de.slitt_size}</span>
                  <span className="p-2 test-r w-25">
                    {de.actual_production}
                  </span>
                  <span className="p-2 test-r w-25">{de.balance}</span>
                  <span className="p-2 test-r w-15">{de.cf}</span>

                  <span className="p-2 w-25">{de.remarks}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div id="htmlToPdf2" className="test f-10 ">
        <div className="d-flex test ">
          <div className="w-25 test-r p-1 text-center">
            <img src="https://uditsolutions.in/vinraj.png" alt="" />
          </div>
          <div className="w-50 test-r d-flex justify-content-center align-items-center">
            <h5 className="font-weight-bold text-underline">
              DAILY PRODUCTION PLANNING SHEET.
            </h5>
          </div>
          <div className="w-25 f-12 p-0 text-center d-flex flex-column justify-content-between">
            <div className="d-flex">
              <th className="w-40">Di.No: </th>
              <td className="w-60">{formProps.values?.di_no}</td>
            </div>
            <div className="d-flex">
              <th className="w-40">Rev. No.: </th>
              <td className="w-60">{formProps.values?.rev_no}</td>
            </div>
            <div className="d-flex">
              <th className="w-40">Rev. Date: </th>
              <td className="w-60">{formProps.values?.rev_date}</td>
            </div>
          </div>
        </div>

        <div className="test">
          <div className="d-flex mb-1 w-100">
            <div className="ml-3 w-50">
              <span className="">Date: </span>
              <span>{props.details?.postDetails?.date}</span>
            </div>
            <div className="ml-3 w-50">
              <span className="">Ref No: </span>
              <span>{props.details?.postDetails?.ref_no}</span>
            </div>
          </div>
        </div>
        <div>
          <table className="table-sm">
            <thead>
              <tr>
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
            <tbody>
              {formProps.values?.details?.map((de, index) => {
                return (
                  <tr key={index} className="">
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
              {{
                                                  form_id:
                                                    formProps.values.form_id,
                                                  hot_mixer: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  cool_mixer: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  temp: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  feeder: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  screw: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  barrel: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  roll_no1: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  roll_no2: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  roll_no3: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  roll_no4: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  roll_no5: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  roll_no6: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  take_off1: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  take_off2: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  tempering1: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  tempering2: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  hauling: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                  remarks: {
                                                    speed: "",
                                                    temp: "",
                                                    current: "",
                                                    "": "",
                                                  },
                                                });
                                              }}

{
Form_id:1,
Name:hotmixer
Speed:10
Temp:24
Current:2-
date:
}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default productionplannigcfformfile;
