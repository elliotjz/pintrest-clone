import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import PropTypes from "prop-types";

class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.props.googleLogin}>
          <RaisedButton
            label="Login with Google"
            type="submit"
            primary
            className="login-btn"
          />
        </form>

        {this.props.errorMessage && (
          <p style={{ color: "red" }}>Error: {this.props.errorMessage}</p>
        )}
      </div>
    );
  }
}

Login.PropTypes = {
  loginBtnAction: PropTypes.func.isRequired
};

export default Login;
