import React from "react";
import { Card, CardTitle, CardText } from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class NewPinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      description: "",
      errorMessage: "",
      loading: false
    };
  }
  formClick(e) {
    e.stopPropagation();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { url, description } = this.state;
    if (url === "") {
      this.setState({
        errorMessage: "Please enter a url"
      });
    } else if (description === "") {
      this.setState({
        errorMessage: "Please enter a description"
      });
    } else {
      this.sendNewPinToServer(url, description);
    }
  };

  sendNewPinToServer = async (url, description) => {
    this.setState({
      loading: true
    });
    const { userId } = this.props;
    const pinData = { id: userId, url, description };

    const res = await fetch("/api/new-pin", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pinData)
    });
    const resJson = await res.json();
    if (resJson.success) {
      this.setState({
        url: "",
        description: "",
        errorMessage: "",
        loading: false
      });
      this.props.pinSubmittedCallback();
    } else {
      this.setState({
        errorMessage: resJson.errorMessage,
        loading: false
      });
    }
  };

  formChange = event => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { closeForm } = this.props;

    const { description, url, errorMessage, loading } = this.state;

    return (
      <div id="screen" onClick={closeForm}>
        <Card id="new-pin-form" onClick={this.formClick}>
          <CardTitle title="Create New Pin" />
          <form onSubmit={this.handleSubmit}>
            <TextField
              floatingLabelText="Picture URL"
              name="url"
              onChange={this.formChange}
              value={url}
            />
            <TextField
              floatingLabelText="Description"
              name="description"
              onChange={this.formChange}
              value={description}
            />
            {errorMessage !== "" && (
              <CardText className="error-text">{errorMessage}</CardText>
            )}
            <Button
              variant="contained"
              disabled={loading}
              label={loading ? "Creating..." : "Create"}
              type="submit"
            />
          </form>
        </Card>
      </div>
    );
  }
}

export default NewPinForm;
