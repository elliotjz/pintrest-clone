import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const styles = {
  btn: {
    marginBottom: "40px"
  }
};

const Login = ({ googleLogin, errorMessage, loading, classes }) => {
  return (
    <div>
      <h1 className={classes.title}>Login</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={googleLogin}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
          >
            Login with Google
          </Button>
        </form>
      )}

      {errorMessage && <p style={{ color: "red" }}>Error: {errorMessage}</p>}
    </div>
  );
};

export default withStyles(styles)(Login);
