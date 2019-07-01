import React from "react";
import {
  Button,
  Typography,
  CircularProgress,
  withStyles
} from "@material-ui/core";
import Auth from "../config/Auth";

const styles = {
  btn: {
    margin: "30px auto"
  },
  progress: {
    margin: "30px auto"
  }
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      loading: false
    };
    this.googleLogin = this.googleLogin.bind(this);
  }

  googleLogin(event) {
    event.preventDefault();
    this.setState({
      errorMessage: "",
      loading: true
    });
    Auth.googleLogin(loginResult => {
      if (loginResult.user) {
        window.location.reload();
      } else {
        this.setState({
          errorMessage: loginResult.errorMessage,
          loading: false
        });
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { errorMessage, loading } = this.state;

    return (
      <div className="page">
        <Typography variant="h3">Login</Typography>
        {loading ? (
          <CircularProgress className={classes.progress} />
        ) : (
          <form onSubmit={this.googleLogin}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={classes.btn}
            >
              Login with Google
            </Button>
          </form>
        )}
        {errorMessage !== "" && (
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(LoginPage);
