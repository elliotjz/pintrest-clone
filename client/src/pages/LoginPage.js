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
    marginTop: "30px"
  },
  progress: {
    margin: "30px auto"
  },
  buttonContainer: {
    margin: "0 auto",
    width: "250px"
  }
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      loading: false
    };
  }

  googleLogin = event => {
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
  };

  githubLogin = event => {
    event.preventDefault();
    this.setState({
      errorMessage: "",
      loading: true
    });
    Auth.githubLogin(loginResult => {
      if (loginResult.user) {
        window.location.reload();
      } else {
        this.setState({
          errorMessage: loginResult.errorMessage,
          loading: false
        });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { errorMessage, loading } = this.state;

    return (
      <div className="page">
        <Typography variant="h3">Login</Typography>
        {loading ? (
          <CircularProgress className={classes.progress} />
        ) : (
          <div>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={this.googleLogin}
                fullWidth
              >
                Login with Google
              </Button>
            </div>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={this.githubLogin}
                fullWidth
              >
                Login with Github
              </Button>
            </div>
          </div>
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
