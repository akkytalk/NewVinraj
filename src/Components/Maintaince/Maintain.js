import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Home/Sidebar'


const Main = () => {
    return (
        <Fragment>
            <div className="wrapper">
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    {/* Left navbar links */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="index3.html" className="nav-link">Home</a>
                        </li>

                    </ul>
                    {/* SEARCH FORM */}

                </nav>
                <Sidebar />
                <div className="content-wrapper">
                    <section class="content">
                        <div class="container-fluid">
                            {/* Content Header (Page header) */}
                            <section className="content-header">

                                <ol className="breadcrumb">
                                    <li><a href="#"><i className="fa fa-dashboard" /> Maintaince</a></li>
                                    {/* <li><a href="#"></a></li>
                            <li className="active">Data tables</li> */}
                                </ol>
                                <br />
                            </section>
                            {/* Main content */}
                            <section className="content">
                                <div className="row">
                                    <div className="col-xs-12">
                                        {/* /.box */}
                                        <div className="box">
                                            <div className="box-header">
                                                <h3 className="box-title">Equiment Reports</h3>
                                                <select style={{ marginLeft: "20px" }}>
                                                    <opton>Fliter</opton>
                                                    <option>Show all 10 entry</option>
                                                </select>
                                            </div>
                                            {/* /.box-header */}
                                            <div className="box-body">
                                                <table id="example1" className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Serial Number</th>
                                                            <th>Equiment Name</th>
                                                            <th>Support </th>
                                                            <th>Engine version</th>
                                                            <th>Grade</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Engine x</td>
                                                            <td>
                                                                Explorer 4.0
                    </td>
                                                            <td>Win 95+</td>
                                                            <td> 4</td>
                                                            <td>X</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Engine x</td>
                                                            <td>
                                                                Explorer 5.0
                    </td>
                                                            <td>Win 95+</td>
                                                            <td>5</td>
                                                            <td>C</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Engine x</td>
                                                            <td>
                                                                Explorer 5.5
                    </td>
                                                            <td>Win 95+</td>
                                                            <td>5.5</td>
                                                            <td>A</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Engine x</td>
                                                            <td>
                                                                Explorer 6
                    </td>
                                                            <td>Win 98+</td>
                                                            <td>6</td>
                                                            <td>A</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Engine x</td>
                                                            <td> Explorer 7</td>
                                                            <td>Win XP SP2+</td>
                                                            <td>7</td>
                                                            <td>A</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Engine x</td>
                                                            <td>ser (AOL desktop)</td>
                                                            <td>Win XP</td>
                                                            <td>6</td>
                                                            <td>A</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Gecko</td>
                                                            <td>Firefox 1.0</td>
                                                            <td>Win 98+ / OSX.2+</td>
                                                            <td>1.7</td>
                                                            <td>A</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Gecko</td>
                                                            <td>Firefox 1.5</td>
                                                            <td>Win 98+ / OSX.2+</td>
                                                            <td>1.8</td>
                                                            <td>A</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Gecko</td>
                                                            <td>Firefox 2.0</td>
                                                            <td>Win 98+ / OSX.2+</td>
                                                            <td>1.8</td>
                                                            <td>A</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Gecko</td>
                                                            <td>Firefox 3.0</td>
                                                            <td>Win 2k+ / OSX.3+</td>
                                                            <td>1.9</td>
                                                            <td>A</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Gecko</td>
                                                            <td>Camino 1.0</td>
                                                            <td>OSX.2+</td>
                                                            <td>1.8</td>
                                                            <td>A</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Gecko</td>
                                                            <td>Camino 1.5</td>
                                                            <td>OSX.3+</td>
                                                            <td>1.8</td>
                                                            <td>A</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Gecko</td>
                                                            <td>Netscape 7.2</td>
                                                            <td>Win 95+ / Mac OS 8.6-9.2</td>
                                                            <td>1.7</td>
                                                            <td>A</td>
                                                        </tr>
                                                        <br />
                                                        <button className="btn btn-info">Next</button>
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* /.box-body */}
                                        </div>
                                        {/* /.box */}
                                    </div>
                                    {/* /.col */}
                                </div>
                                {/* /.row */}
                            </section>
                            {/* /.content */}
                        </div>
                    </section>
                </div>

            </div>
        </Fragment>
    )
}


export default Main