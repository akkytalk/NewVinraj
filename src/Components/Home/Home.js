import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Button } from "reactstrap";
import { removeLogin } from "../../reduxStore/actions";
import Sidebar from "./Sidebar";

function Home(props) {
  async function handleLogout() {
    await props.removeLogin();
  }

  if (props.login?.login.length === 0) {
    return <Redirect to={"/login"} />;
  } else if (props.login?.login?.success?.token) {
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
                  href="/"
                  role="button"
                >
                  <i className="fas fa-bars" />
                </a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item d-none d-sm-inline-block float-right">
                <Button className="btn-danger" onClick={() => handleLogout()}>
                  Logout
                </Button>
              </li>
            </ul>
            {/* SEARCH FORM */}
          </nav>
          {/* /.navbar */}
          {/*  */}

          <Sidebar />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeLogin: () => {
      dispatch(removeLogin());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
