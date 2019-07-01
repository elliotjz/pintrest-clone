import React from "react";
import Auth from "../config/Auth";
import { CircularProgress } from "@material-ui/core";

class Logout extends React.Component {
  componentWillMount() {
    Auth.logout(() => {
      window.location.reload();
    });
  }

  render() {
    return (
      <div className="page">
        <CircularProgress />
      </div>
    );
  }
}

export default Logout;
