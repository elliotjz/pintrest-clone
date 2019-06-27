import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AllPinsPage from "./pages/AllPinsPage";
import Logout from "./components/Logout";
import LoginPage from "./pages/LoginPage";
import NotFound from "./components/NotFound";

const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={AllPinsPage} />
      <Route
        exact
        path="/logout"
        render={() => {
          return !!localStorage.getItem("token") ? (
            <Logout />
          ) : (
            <Redirect to="/" push />
          );
        }}
      />
      <Route
        exact
        path="/login"
        render={() => {
          return !!localStorage.getItem("token") ? (
            <Redirect to="/" push />
          ) : (
            <LoginPage />
          );
        }}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);

export default Main;
