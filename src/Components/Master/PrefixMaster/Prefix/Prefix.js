import React from "react";
import { Fragment } from "react";
import Sidebar from "../../../Home/Sidebar";

function Prefix() {
  return (
    <Fragment>
      <div className="wrapper">
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="n"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
          </ul>
          {/* SEARCH FORM */}
        </nav>
        {/* /.navbar */}
        {/*  */}

        <Sidebar />
        <div class="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <div className="container">
                <div className="flex-row">
                  <div className="flex-large">
                    {/* <FormAddUser
                      currentUser={currentUser}
                      editing={editing}
                      setEditing={setEditing}
                      setCurrentUser={setCurrentUser}
                    /> */}
                  </div>
                  <div className="flex-large">
                    {/* <FormTable
                      editRow={editRow}
                      currentUser={currentUser}
                      editing={editing}
                      setEditing={setEditing}
                      setCurrentUser={setCurrentUser}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
}

export default Prefix;
