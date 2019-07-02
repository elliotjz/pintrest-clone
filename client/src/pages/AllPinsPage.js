import React from "react";
import {
  CircularProgress,
  withStyles,
  Typography,
  Button
} from "@material-ui/core";
import Masonry from "react-masonry-component";
import { Link } from "react-router-dom";

import NewPinForm from "../components/NewPinForm";
import Auth from "../config/Auth";
import Pin from "../components/Pin";
import colors from "../colors";

const styles = {
  container: {
    marginBottom: "30px"
  },
  marginTopBottom: {
    margin: "20px auto"
  }
};

class AllPinsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [],
      loading: true,
      errorMessage: "",
      firebaseUser: null,
      masonryDivStyle: {},
      newPinFormOpen: false
    };
  }

  toggleNewPinForm = () => {
    this.setState({
      newPinFormOpen: !this.state.newPinFormOpen
    });
  };

  resizeGallery = () => {
    const windowWidth = window.innerWidth;
    let galleryWidth = "300px";
    if (windowWidth >= 1200) {
      galleryWidth = "1200px";
    } else if (windowWidth >= 900) {
      galleryWidth = "900px";
    } else if (windowWidth >= 600) {
      galleryWidth = "600px";
    }
    this.setState({
      masonryDivStyle: {
        margin: "auto",
        width: galleryWidth
      }
    });
  };

  updateLikedPin = async timeStamp => {
    const { firebaseUser } = this.state;
    const { uid: id } = firebaseUser;
    const data = { id, timeStamp };

    // Update the UI before calling the database
    const { pins } = this.state;
    const updatedPins = pins.map(pin => {
      if (pin.timeStamp === timeStamp) {
        const indexOfLike = pin.likes.indexOf(id);
        if (indexOfLike === -1) {
          // Add the like
          pin.likes.push(id);
        } else {
          // Remove the like
          pin.likes.splice(indexOfLike, 1);
        }
      }
      return pin;
    });
    this.setState({
      pins: updatedPins,
      errorMessage: ""
    });

    // Update database
    try {
      const res = await fetch("api/add-like", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const resJson = await res.json();
      if (!resJson.success) {
        this.setState({
          errorMessage: "Error adding like to pin"
        });
      } else {
        const { pins } = this.state;
        const updatedPins = pins.map(pin => {
          return pin.timeStamp === timeStamp ? resJson.pin : pin;
        });
        this.setState({
          pins: updatedPins,
          errorMessage: ""
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  deletePin = async timeStamp => {
    const { firebaseUser } = this.state;
    const data = { id: firebaseUser.uid, timeStamp };
    try {
      const res = await fetch("api/delete-pin", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const resJson = await res.json();
      this.setState({
        pins: resJson.pins,
        errorMessage: ""
      });
    } catch (e) {
      console.error(e);
      this.setState({
        errorMessage: "Error deleting pin"
      });
    }
  };

  pinSubmittedCallback = () => {
    this.setState({
      newPinFormOpen: false
    });
    this.getAllPins();
  };

  getAllPins = async () => {
    try {
      const res = await fetch("/api/all-pins");
      const { pins } = await res.json();
      this.setState({
        pins,
        loading: false,
        errorMessage: ""
      });
    } catch (e) {
      this.setState({
        errorMessage: "Unable to get pins",
        loading: false
      });
    }
  };

  async componentDidMount() {
    Auth.getUser(user => {
      this.setState({
        firebaseUser: user
      });
    });

    this.getAllPins();
    this.resizeGallery();
    window.addEventListener("resize", () => {
      this.resizeGallery();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => {
      this.resizeGallery();
    });
  }

  render() {
    const urlParams = new URLSearchParams(location.search);

    const urlHasUid = urlParams.has("uid");

    const { classes } = this.props;
    let pinData = urlHasUid
      ? this.state.pins.filter(pin => {
          return pin.userId === urlParams.get("uid");
        })
      : this.state.pins;

    const userId = this.state.firebaseUser ? this.state.firebaseUser.uid : null;
    const myPins = urlHasUid && urlParams.get("uid") === userId;

    let childElements = this.state.pins
      ? pinData.map((pin, index) => {
          return (
            <div key={index}>
              <Pin
                pinData={pin}
                userId={userId}
                deletePin={this.deletePin}
                updateLikedPin={this.updateLikedPin}
                resizeGallery={this.resizeGallery}
              />
            </div>
          );
        })
      : null;

    return (
      <div className="page">
        <Typography variant="h3">{myPins ? "My Pins" : "All Pins"}</Typography>

        {this.state.loading ? (
          <CircularProgress size={40} thickness={4} />
        ) : (
          <div className={classes.container}>
            {this.state.errorMessage && (
              <p style={{ color: colors.error }}>{this.state.errorMessage}</p>
            )}

            {userId && (
              <Button
                variant="outlined"
                color="primary"
                onClick={this.toggleNewPinForm}
                className={classes.marginTopBottom}
              >
                New Pin
              </Button>
            )}

            {urlHasUid && !myPins && (
              <div>
                <Link to="/">
                  <Button color="primary">Back To All</Button>
                </Link>
                <Typography className={classes.marginTopBottom} variant="body1">
                  Filtered results:
                </Typography>
              </div>
            )}

            {this.state.pins && this.state.pins.length !== 0 ? (
              <div style={this.state.masonryDivStyle}>
                <Masonry className="my-gallery-class">{childElements}</Masonry>
              </div>
            ) : (
              <Typography variant="body1">
                No Pins to show. Try adding a pin.
              </Typography>
            )}

            {this.state.newPinFormOpen && (
              <NewPinForm
                submitPin={this.processNewPinForm}
                closeForm={this.toggleNewPinForm}
                userId={userId}
                pinSubmittedCallback={this.pinSubmittedCallback}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(AllPinsPage);
