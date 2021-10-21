// import React, { useEffect, useState } from "react";
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
// import axios from "axios";
// import { baseUrl } from "../../../shared/baseUrl";
// import { usersGetData } from "../../../reduxStore/actions";
// import CircularProgress from "@material-ui/core/CircularProgress";
// function Top(props) {
//   const accessToken = `${props.login?.login?.data?.token}`;

//   const [loading, setLoading] = useState(true);
//   let data = {
//     token: accessToken,
//   };

//   useEffect(() => {
//     props.onUsersGetData(data);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   const authAxios = axios.create({
//     baseURL: baseUrl,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   const [userCount, setUserCount] = useState("");

//   const registeredUser = props.users?.data?.filter(
//     (user) => user.role === null
//   ).length;

//   useEffect(() => {
//     if (props.login?.login?.data?.token) {
//       authAxios
//         .get("userCount")
//         .then((res) => {
//           console.log("test counter data", res.data);
//           setUserCount(res.data);
//           setLoading(false);
//         })
//         .catch((err) => console.log(err));
//     }
//   }, [userCount]);
//   // console.log("test count", testedUser);

//   return (
//     <div className="row">
//       {/* <div className="col-sm-12 col-md-4 col-lg-4">
//           <Card outline color="success">
//             <CardHeader className="bg-warning text-white">
//               <h6 className="mb-0">Students</h6>
//             </CardHeader>
//             <CardBody>
//               <h2 className="mb-0">18</h2>
//             </CardBody>
//             <CardFooter>
//               <h6>Total number of students</h6>
//             </CardFooter>
//           </Card>
//         </div> */}
//       <div className="col-sm-12 col-md-4 col-lg-4">
//         <Card>
//           <CardHeader className="bg-danger text-white">
//             <h6 className="mb-0">Exam Appeared</h6>
//           </CardHeader>
//           <CardBody>
//             {loading ? (
//               <CircularProgress />
//             ) : (
//               <h2 className="mb-0"> {userCount}</h2>
//             )}
//           </CardBody>
//           <CardFooter>
//             <h6>Total number of students</h6>
//           </CardFooter>
//         </Card>
//       </div>
//       <div className="col-sm-12 col-md-4 col-lg-4">
//         <Card>
//           <CardHeader className="bg-info text-white">
//             <h6 className="mb-0">Registered Students</h6>
//           </CardHeader>
//           <CardBody>
//             <h2 className="mb-0">{registeredUser}</h2>
//           </CardBody>
//           <CardFooter>
//             <h6>Total number of students</h6>
//           </CardFooter>
//         </Card>
//       </div>
//       {/* <div className="col-sm-12 col-md-3 col-lg-3">
//           <Card>
//             <CardHeader className="bg-success text-white">
//               <h6 className="mb-0">Invoice</h6>
//             </CardHeader>
//             <CardBody>
//               <h2 className="mb-0">35</h2>
//             </CardBody>
//             <CardFooter>
//               <h6>Pending</h6>
//             </CardFooter>
//           </Card>
//         </div> */}
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     login: state.login,
//     signup: state.signup,
//     users: state.users.users,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   onUsersGetData: (data) => dispatch(usersGetData(data)),
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Top));
