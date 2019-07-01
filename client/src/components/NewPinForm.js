import React from "react";
import {
  CardContent,
  Typography,
  Card,
  Button,
  TextField,
  withStyles
} from "@material-ui/core";

const styles = {
  button: {
    marginTop: "20px"
  },
  errorContainer: {
    marginTop: "20px"
  }
};

class NewPinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      description: "",
      urlError: "",
      descriptionError: "",
      loading: false
    };
  }
  formClick(e) {
    e.stopPropagation();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { url, description } = this.state;
    let urlError = "";
    let descriptionError = "";

    const urlEx = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
    const urlRegEx = new RegExp(urlEx);
    if (!url.match(urlRegEx)) {
      urlError = "Please enter a valid URL";
    }

    if (description === "") {
      descriptionError = "Please enter a description";
    }

    this.setState({
      urlError,
      descriptionError
    });

    if (urlError === "" && descriptionError === "") {
      this.sendNewPinToServer(url, description);
    }
  };

  sendNewPinToServer = async (url, description) => {
    this.setState({
      loading: true
    });
    const { userId } = this.props;
    const pinData = { id: userId, url, description };
    try {
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
    } catch (e) {
      this.setState({
        errorMessage: "Unable to create new pin",
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
    const { closeForm, classes } = this.props;

    const {
      description,
      url,
      urlError,
      descriptionError,
      loading
    } = this.state;

    return (
      <div id="screen" onClick={closeForm}>
        <Card id="new-pin-form" onClick={this.formClick}>
          <CardContent>
            <Typography variant="h5">Create New Pin</Typography>
            <form onSubmit={this.handleSubmit}>
              <TextField
                error={urlError !== ""}
                label="Picture URL"
                name="url"
                onChange={this.formChange}
                value={url}
                margin="normal"
              />
              <TextField
                error={descriptionError !== ""}
                label="Description"
                name="description"
                onChange={this.formChange}
                value={description}
                margin="normal"
              />
              <div className={classes.errorContainer}>
                {urlError !== "" && (
                  <Typography color="error" variant="body1">
                    {urlError}
                  </Typography>
                )}
                {descriptionError !== "" && (
                  <Typography color="error" variant="body1">
                    {descriptionError}
                  </Typography>
                )}
              </div>
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={loading}
                  type="submit"
                  className={classes.button}
                >
                  {loading ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(NewPinForm);
