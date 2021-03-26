import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  departmentGetData,
  formGetData,
  removeLogin,
} from "../../reduxStore/actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },

  CircularProgress: {
    color: "white !important",
    animationDirection: "2s !important",
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState([]);
  const [department, SetDepartment] = useState([]);

  useEffect(() => {
    let data = {
      token: props.login?.login?.success?.token,
    };

    console.log(data);
    props.departmentGetData(data);
    props.onFormGetData(data);
  }, []);
  // useEffect(() => {
  //   axios
  //     .get("departments")
  //     .then((res) => {
  //       //   console.log(res.data, "department res");
  //       SetDepartment(res.data);
  //       setLoading(false);
  //     })

  //     .catch((error) => console.log(error));
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("forms")
  //     .then((res) => {
  //       //  console.log(res.data, "department res");
  //       setForm(res.data);
  //     })

  //     .catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  //console.log("department data", props.department);

  return (
    <Fragment>
      {/* Main Sidebar Container */}
      <aside
        className="main-sidebar sidebar-dark-primary elevation-4"
        style={{ overflow: "scroll", width: "250px;", height: "100vh" }}
      >
        {/* Sidebar */}
        <div
          className="sidebar"
          style={{ paddingRight: "0px;", fontSize: "15px" }}
        >
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User pics"
              />
            </div>
            <div className="info">
              <a href="/" className="d-block">
                ADMIN
              </a>
            </div>
          </div>

          {/* SidebarSearch Form */}
          {/* Sidebar Menu */}
          <nav className="mt-2" id="MainMenu">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
                             with font-awesome or any other icon font library */}
              {/* <li className="nav-item">
                <Link to="/" className="nav-link">
                  <p>Dashboard</p>
                </Link>
              </li> */}

              <li className="nav-item">
                <Link className="nav-link d-flex justify-content-between">
                  <p>Master</p>
                  <ArrowDropDownIcon fontSize="small" />
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link className="nav-link d-flex justify-content-between">
                      <p>Account Master</p>
                      <ArrowDropDownIcon fontSize="small" />
                    </Link>

                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/account-group" className="nav-link">
                          <p>Account Group Master</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/account-name" className="nav-link">
                          <p>Account Name Master</p>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a
                      href="n"
                      className="nav-link d-flex justify-content-between"
                    >
                      <p>Item Master</p>
                      <ArrowDropDownIcon fontSize="small" />
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/item-group" className="nav-link">
                          <p>Item Group Master</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/item-name" className="nav-link">
                          <p>Item Name Master</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/item-units" className="nav-link">
                          <p>Item Units Master</p>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <p>Reference Number Prefix</p>
                    </Link> */}

                  {/* <ul className="nav nav-treeview"> */}
                  <li className="nav-item">
                    <Link to="/department" exact className="nav-link">
                      <p>Department Name Master</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/form" className="nav-link">
                      <p>Form Name Master</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/prefix" className="nav-link">
                      <p>Form Prefix Master</p>
                    </Link>
                  </li>
                  {/* </ul> */}
                  {/* </li> */}
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/user-master" className="nav-link">
                  <p>Users & Pws</p>
                </Link>
              </li>

              {props.department.isLoading ? (
                <div className={classes.root}>
                  <CircularProgress
                    variant="determinate"
                    className={classes.CircularProgress}
                    value={progress}
                  />
                </div>
              ) : (
                props.department?.department?.map((dep, index) => (
                  <li key={dep.id} className="nav-item">
                    <Link className="nav-link d-flex justify-content-between">
                      <p>{dep.name}</p>

                      <ArrowDropDownIcon fontSize="small" />
                    </Link>
                    <ul className="nav nav-treeview">
                      {props.form.map((form) => {
                        // eslint-disable-next-line eqeqeq
                        if (dep.id == form.department_id) {
                          // console.log("form data", dep.id);
                          // console.log("form else data", form.department_id);

                          return (
                            <li key={form.id} className="nav-item">
                              <Link to={form.url} className="nav-link">
                                <p>{form.name}</p>
                              </Link>
                            </li>
                          );
                        }
                        return <div></div>;
                      })}
                    </ul>
                  </li>
                ))
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    department: state.department,
    form: state.form.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeLogin: () => {
      dispatch(removeLogin());
    },
    departmentGetData: (data) => {
      dispatch(departmentGetData(data));
    },
    onFormGetData: (data) => dispatch(formGetData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
