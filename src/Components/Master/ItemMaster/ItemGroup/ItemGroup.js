import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Sidebar from "../../../Home/Sidebar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import * as actions from "../../../../reduxStore/actions/index";
import { connect } from "react-redux";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ItemGroup(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log("currentUser data from redux ", currentUser);

    props.onItemGroupGetData();
    props.onItemGroupGetData();
    props.onDeleteItemGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [user, setUser] = useState({
    name: "",
    under_group_name: "",
  });

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: "",
    name: "",
    under_group_name: "",
  };

  const [currentUser, setCurrentUser] = useState(initialFormState);

  const currentUserInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Fragment>
      <div className="wrapper">
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul  className="navbar-nav d-flex align-items-center">
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
            <li className="nav-item d-none d-sm-inline-block ml-2">
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link color="inherit" href="/" >
                  Home
                </Link>
                <Link
                  color="inherit"
                  
                >
                  Master
                </Link>
                <Link
                  color="inherit"
                  
                >
                 Item Master
                </Link>
                <Typography color="textPrimary">Item Group Master</Typography>
              </Breadcrumbs>
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
              <div className={classes.root}>
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                  >
                    <Tab label="Item Group" {...a11yProps(0)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <div className="container">
                    <div className="flex-row">
                      <div className="flex-large">
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            props.onPostItemGroupData(user);
                          }}
                        >
                          <div
                            className="form-row"
                            style={{ fontSize: "12px" }}
                          >
                            <div className="form-group col-md-3">
                              <label htmlFor="inputPassword4">
                                {" "}
                                Item Group{" "}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputPassword4"
                                placeholder=""
                                value={!editing ? user.name : currentUser.name}
                                name="name"
                                onChange={
                                  editing
                                    ? currentUserInputChange
                                    : handleInputChange
                                }
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label htmlFor="inputPassword4">
                                Under Item Group
                              </label>
                              <select
                                type="text"
                                className="form-control"
                                id="inputPassword4"
                                name="under_group_name"
                                value={
                                  editing
                                    ? currentUser.under_group_name
                                    : user.under_group_name
                                }
                                onChange={
                                  editing
                                    ? currentUserInputChange
                                    : handleInputChange
                                }
                              >
                                <option>select</option> &&
                                {!editing
                                  ? props.itemGroup?.map((accgrp) => (
                                      <option
                                        key={accgrp.id}
                                        value={accgrp.name}
                                      >
                                        {accgrp.name}
                                      </option>
                                    ))
                                  : currentUser
                                  ? // <option>{currentUser}</option>
                                    //  &&
                                    props.itemGroup?.map((accgrp) => (
                                      <option
                                        key={accgrp.id}
                                        value={accgrp.name}
                                      >
                                        {accgrp.name}
                                      </option>
                                    ))
                                  : null}
                              </select>
                            </div>

                            <div className="form-group col-md-3 mt-4">
                              {!editing ? (
                                <button
                                  className="btn btn-primary "
                                  type="submit"
                                >
                                  Add
                                </button>
                              ) : (
                                <div className="d-flex">
                                  <button
                                    className="btn btn-success"
                                    type="button"
                                    onClick={() =>
                                      props.onUpdateItemGroupData(
                                        currentUser.id,
                                        editing,
                                        setEditing,
                                        currentUser,
                                        setCurrentUser
                                      )
                                    }
                                  >
                                    Update
                                  </button>
                                  <button
                                    className="btn btn-primary ml-3"
                                    type="button"
                                    onClick={() => setEditing(false)}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="flex-large">
                        <table className="table" style={{ fontSize: "12px" }}>
                          <thead>
                            <tr>
                              {/* <th>ID</th> */}
                              <th scope="col">Item Group</th>
                              <th scope="col">Under Item Group</th>

                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {props.itemGroup.length > 0 ? (
                              props.itemGroup.map((user) => (
                                <tr key={user.id}>
                                  {/* <td>{user.id}</td> */}
                                  <td>{user.name}</td>
                                  <td>{user.under_group_name}</td>

                                  <td className="d-flex">
                                    <button
                                      onClick={() =>
                                        props.onEditItemGroupRow(
                                          user.id,
                                          editing,
                                          setEditing,
                                          currentUser,
                                          setCurrentUser
                                        )
                                      }
                                    >
                                      <i
                                        className="fa fa-edit"
                                        aria-hidden="true"
                                      ></i>
                                    </button>

                                    <button
                                      className="ml-3"
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            "Are you sure you wish to delete this Item Group?"
                                          )
                                        )
                                          props.onDeleteItemGroup(user.id);
                                      }}
                                    >
                                      <i
                                        className="fa fa-trash-alt "
                                        value={user.id}
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={3}>No users</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    itemGroup: state.itemGroup.itemGroup,
    form: state.form.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onItemGroupGetData: () => dispatch(actions.itemGroupGetData()),
    onDeleteItemGroup: (id) => dispatch(actions.deleteItemGroup(id)),
    onPostItemGroupData: (user) => dispatch(actions.postItemGroupData(user)),
    onUpdateItemGroupData: (
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.updateItemGroupData(
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
    onEditItemGroupRow: (
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editItemGroupRow(
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemGroup);
