import React, { Fragment } from 'react'
import Sidebar from '../Home/Sidebar'

function PreventiveMaintenanceRecord() {
    return (
        <Fragment>
        <div className="wrapper">
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="/" className="nav-link">Home</a>
                    </li>

                </ul>
                {/* SEARCH FORM */}

            </nav>
            {/* /.navbar */}
            {/*  */}


           <Sidebar/>
           </div>
        
        </Fragment>
    )
}

export default PreventiveMaintenanceRecord
