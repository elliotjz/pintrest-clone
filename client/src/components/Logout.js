import React from "react";
import Auth from "../config/Auth";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";

const styles = {
  text: {
    margin: "40px auto"
  }
};

class Logout extends React.Component {
  componentWillMount() {
    Auth.logout(() => {
      window.location.reload();
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.text}>Logging out...</Typography>
        <CircularProgress />
      </div>
    );
  }
}

export default withStyles(styles)(Logout);
