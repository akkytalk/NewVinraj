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

<tr key={index} className="h-100 w-100">
                                    <td className="d-flex test-b test-r test-l p-0 h-100 ">
                                      <td className="test-r ">
                                        Date & Product description
                                        <td>{de.date}</td>
                                      </td>
                                      <td className=" p-0 d-flex flex-column">
                                        <td className="test-b h-30p">Speed</td>
                                        <td className="test-b h-30p">Temp.</td>
                                        <td className="test-b h-30p">
                                          Current
                                        </td>
                                        <td className=" h-30p"> </td>
                                      </td>
                                    </td>

                                    <td className="test-r test-b p-0 h-100 w-10">
                                      <td className="d-flex flex-column p-0">
                                        <td className="test-b w-100 h-30p">
                                          {de.hot_mixer?.speed}
                                        </td>
                                        <td className="test-b w-100 h-30">
                                          {de.hot_mixer?.temp}
                                        </td>
                                        <td className="test-b h-30p">
                                          {de.hot_mixer?.current}
                                        </td>
                                        <td className=" h-30p"> </td>
                                      </td>
                                    </td>
                                    <td className="test-r test-b p-0 w-10 h-100">
                                      <td className="d-flex flex-column p-0">
                                        <td className="test-b w-100 h-30p">
                                          {de.cool_mixer?.speed}
                                        </td>
                                        <td className="test-b w-100 h-30p">
                                          {de.cool_mixer?.temp}
                                        </td>
                                        <td className="test-b h-30p">
                                          {de.cool_mixer?.current}
                                        </td>
                                        <td className=" h-30p"> </td>
                                      </td>
                                    </td>
                                    <td className="test-r test-b p-0 w-10">
                                      <td className="d-flex flex-column p-0">
                                        <td className="test-b w-100">
                                          {de.feeder?.speed}
                                        </td>
                                        <td className="test-b w-100">
                                          {de.feeder?.temp}
                                        </td>
                                        <td className="test-b">
                                          {de.feeder?.current}
                                        </td>
                                        <td className=" h-30p"> </td>
                                      </td>
                                    </td>
                                  </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default productionplannigcfformfile;



<>
                                    <tr className="d-flex w-100">
                                      <th className="d-flex flex-column test -100">
                                        <th>Date & Product description</th>
                                        <th>{de.date}</th>
                                      </th>
                                      <th className="d-flex flex-column test w-100">
                                        <th className="test-b h-30p">Speed</th>
                                        <th className="test-b h-30p">Temp</th>
                                        <th className="test-b h-30p">
                                          Current
                                        </th>
                                        <th className="h-30p"></th>
                                      </th>
                                    </tr>

                                    <th className=" test w-100">
                                      <td className="test-b h-30p">Speed</td>
                                      <td className="test-b h-30p">Temp</td>
                                      <td className="test-b h-30p">Current</td>
                                      <td className="h-30p"></td>
                                    </th>
                                  </>




<div
id="htmlToPdf2"
className="d-flex flex-column flex-wrap f-8 w-100"
>
<div className="d-flex test">
  <div className="w-25 test-r p-1 text-center">
    <img
      src="https://uditsolutions.in/vinraj.png"
      alt=""
    />
  </div>
  <div className="w-50 test-r d-flex justify-content-center align-items-center">
    <h5 className="font-weight-bold text-underline">
      PROCESS PARAMETER RECORD.
    </h5>
  </div>
  <div className="w-25 f-12 p-0 text-center d-flex flex-column justify-content-between">
    <div className="d-flex">
      <th className="w-40">Di.No: </th>
      <td className="w-60">
        {formProps.values?.di_no}
      </td>
    </div>
    <div className="d-flex">
      <th className="w-40">Rev. No.: </th>
      <td className="w-60">
        {formProps.values?.rev_no}
      </td>
    </div>
    <div className="d-flex">
      <th className="w-50">Rev. Date: </th>
      <td className="w-60">
        {formProps.values?.rev_date}
      </td>
    </div>
  </div>
</div>

<div className="">
  <table className="table-sm ">
    <thead className="">
      <tr>
        <th className="test  bg-gray"></th>
        <th className="test">Hot Mixer</th>
        <th className="test">Cool Mixer</th>
        <th className="test">Feeder</th>
        <th className="test">Screw</th>
        <th className="test">Barrel</th>
        <th className="test">Roll no.1</th>
        <th className="test">Roll no.2</th>
        <th className="test">Roll no.3</th>
        <th className="test">Roll no.4</th>
        <th className="test">Roll no.5</th>
        <th className="test">Roll no.6</th>
        <th className="test">Take off 1</th>
        <th className="test">Take off 2</th>
        <th className="test">Tempering 1</th>
        <th className="test">Tempering 2</th>
        <th className="test">Hauling</th>
        <th className="test">Remarks</th>
      </tr>
    </thead>
    <tbody className="">
      {formProps.values?.details?.map((de, index) => {
        return (
          <tr>
            <td className="d-flex p-0">
              <th className="d-flex flex-column test -100 p-0">
                <th>Date & Product description</th>
                <th>{de.hot_mixer?.date}</th>
              </th>
              <th className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">Speed</th>
                <th className="test-b h-40p">Temp</th>
                <th className="test-b h-40p">
                  Current
                </th>
                <th className="h-40p"></th>
              </th>
            </td>
            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.hot_mixer?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.hot_mixer?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.hot_mixer?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>
            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.cool_mixer?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.cool_mixer?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.cool_mixer?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>
            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.feeder?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.feeder?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.feeder?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.screw?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.screw?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.screw?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.barrel?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.barrel?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.barrel?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.roll_no1?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.roll_no1?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.roll_no1?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.roll_no2?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.roll_no2?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.roll_no2?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.roll_no3?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.roll_no3?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.roll_no3?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.roll_no4?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.roll_no4?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.roll_no4?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.roll_no5?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.roll_no5?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.roll_no5?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.roll_no6?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.roll_no6?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.roll_no6?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.take_off1?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.take_off1?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.take_off1?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.take_off2?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.take_off2?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.take_off2?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.tempering1?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.tempering1?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.tempering1?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.tempering2?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.tempering2?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.tempering2?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.hauling?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.hauling?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.hauling?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>

            <td className="p-0">
              <td className="d-flex flex-column test p-0 w-100">
                <th className="test-b h-40p">
                  {de.remarks?.speed}
                </th>
                <th className="test-b h-40p">
                  {de.remarks?.temp}
                </th>
                <th className="test-b h-40p">
                  {de.remarks?.current}
                </th>
                <th className="h-40p"></th>
              </td>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
</div>