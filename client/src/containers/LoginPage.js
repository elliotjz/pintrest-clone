import React from "react";
import Login from "../components/Login";
import Auth from "../config/Auth";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null
    };
    this.googleLogin = this.googleLogin.bind(this);
  }

  googleLogin(event) {
    event.preventDefault();
    Auth.googleLogin(loginResult => {
      if (loginResult.user) {
        this.setState({
          user: loginResult.user
        });
        window.location.reload();
      } else {
        this.setState({
          errorMessage: loginResult.errorMessage
        });
      }
    });
  }

  render() {
    return (
      <div className="page">
        <Login
          googleLogin={this.googleLogin}
          errorMessage={this.state.errorMessage}
        />
      </div>
    );
  }
}

export default LoginPage;
