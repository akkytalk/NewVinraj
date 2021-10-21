import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "../Components/Home/Sidebar";
import routes from "../routes/routes";
import userRoutes from "../routes/userRoutes";
import Header from "./header/Header";
import { useSelector } from "react-redux";
import Loader from "../Components/Loader";

function Layout(props) {
  const login = useSelector((state) => state.login);

  if (login?.login?.length === 0) {
    return <Redirect to={"/login"} />;
  } else if (login?.login?.user?.role === "admin") {
    return (
      <div className="wrapper">
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <React.Suspense fallback={<Loader />}>
                <Switch>
                  {routes.map((route, index) => {
                    return route.component ? (
                      <Route
                        path={route.path}
                        exact={route.exact}
                        key={index}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </React.Suspense>
            </div>
          </section>
        </div>
      </div>
    );
  } else if (login?.login?.user?.role === "user") {
    return (
      <div className="wrapper">
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <React.Suspense fallback={<Loader />}>
                <Switch>
                  {userRoutes.map((route, index) => {
                    return route.component ? (
                      <Route
                        path={route.path}
                        exact={route.exact}
                        key={index}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </React.Suspense>
            </div>
          </section>
        </div>
      </div>
    );
  }
  // else {
  //   return (
  //     <React.Suspense fallback={<Loader />}>
  //       <Switch>
  //         {studentRoutes.map((route, index) => {
  //           return route.component ? (
  //             <Route
  //               path={route.path}
  //               exact={route.exact}
  //               key={index}
  //               render={(props) => <route.component {...props} />}
  //             />
  //           ) : null;
  //         })}
  //         <Redirect from="/" to="/dashboard" />
  //       </Switch>
  //     </React.Suspense>
  //   );
  // }
}

export default Layout;
