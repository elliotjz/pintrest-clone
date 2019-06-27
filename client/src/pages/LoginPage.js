import React from "react";
import Login from "../components/Login";
import Auth from "../config/Auth";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      loading: false
    };
    this.googleLogin = this.googleLogin.bind(this);
  }

  googleLogin(event) {
    event.preventDefault();
    this.setState({
      errorMessage: null,
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
    const { errorMessage, loading } = this.state;

    return (
      <div className="page">
        <Login
          googleLogin={this.googleLogin}
          errorMessage={errorMessage}
          loading={loading}
        />
      </div>
    );
  }
}

export default LoginPage;
