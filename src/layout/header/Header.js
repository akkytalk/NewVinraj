import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { removeLogin } from "../../reduxStore/actions";

export default function Header() {
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(removeLogin());
  }

  return (
    <nav
      className="main-header navbar navbar-expand navbar-white navbar-light"
      style={{ position: "sticky", top: "0" }}
    >
      {/* Left navbar links */}
      <ul className="navbar-nav d-flex justify-content-between">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="/" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
        {/* <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li> */}
        <li
          className="nav-item d-none d-sm-inline-block float-right"
          onClick={() => handleLogout()}
          style={{
            position: "absolute",
            top: "15px",
            right: "20px",
          }}
        >
          <Button
            className="btn-danger"
            style={{
              padding: "5px",
              fontSize: "12px",
            }}
          >
            Logout
          </Button>
        </li>
      </ul>
      {/* SEARCH FORM */}
    </nav>
  );
}
