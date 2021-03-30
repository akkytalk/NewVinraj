import React, { Fragment, useState } from "react";
import Sidebar from "../Home/Sidebar";
import PurchaseOrder from "./PurchaseOrder";
// import Aside from '../Home/Aside'
// import Header from '../Home/Header'

import Req from "./Req";
import Req2 from "./Req2";

const Purchase = () => {
  return (
    <Fragment>
      {/* <Headers/> */}
      {/* <Aside /> */}
      <Sidebar />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            {/* Content Header (Page header) */}
            <section className="content-header">
              <ol className="breadcrumb">
                <li>
                  <a href="#">
                    <i className="fa fa-dashboard" /> Maintaince
                  </a>
                </li>
                {/* <li><a href="#"></a></li>
                            <li className="active">Data tables</li> */}
              </ol>
              <br />
            </section>
            <section className="content">
              <div className="row">
                <div className="col-xs-12">
                  {/* /.box */}
                  <div className="box">
                    <div className="box-header">
                      <h3 className="box-title">Purchase Requistion</h3>
                    </div>
                    {/* /.box-header */}
                    <div className="box-body">
                      <div className="col-md-9">
                        <PurchaseOrder />
                        {/* <Req /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Purchase;
