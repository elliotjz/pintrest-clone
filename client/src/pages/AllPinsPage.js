import React from "react";
import { Link, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import Masonry from "react-masonry-component";

import NewPinForm from "../components/NewPinForm";
import Auth from "../config/Auth";
import Pin from "../components/Pin";

class AllPinsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [],
      loading: true,
      errorMessage: "",
      newPinErrorMessage: "",
      firebaseUser: null,
      style: {},
      newPinFormOpen: false
    };
  }

  toggleNewPinForm = () => {
    this.setState({
      newPinFormOpen: !this.state.newPinFormOpen
    });
  };

  resizeGallery() {
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
      style: {
        margin: "auto",
        width: galleryWidth
      }
    });
  }

  updateLikedPin = async timeStamp => {
    const { firebaseUser } = this.state;
    const data = { id: firebaseUser.uid, timeStamp };

    const res = await fetch("api/add-like", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const resJson = await res.json();
    this.setState({ pins: resJson.pins });
  };

  deletePin = async timeStamp => {
    const { firebaseUser } = this.state;
    const data = { id: firebaseUser.uid, timeStamp };

    const res = await fetch("api/delete-pin", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const resJson = await res.json();
    this.setState({ pins: resJson.pins });
  };

  pinSubmittedCallback = () => {
    this.setState({
      newPinFormOpen: false
    });
    this.getAllPins();
  };

  getAllPins = async () => {
    const res = await fetch("/api/all-pins");
    const { pins } = await res.json();
    this.setState({
      pins,
      loading: false
    });

    this.resizeGallery();
    window.addEventListener("resize", () => {
      this.resizeGallery();
    });
  };

  async componentDidMount() {
    Auth.getUser(user => {
      this.setState({
        firebaseUser: user
      });
    });

    this.getAllPins();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => {
      this.resizeGallery();
    });
  }

  render() {
    var urlParams = new URLSearchParams(location.search);
    let pinData = urlParams.has("uid")
      ? this.state.pins.filter(pin => {
          return pin.userId === urlParams.get("uid");
        })
      : this.state.pins;

    const userId = this.state.firebaseUser ? this.state.firebaseUser.uid : null;

    let childElements = this.state.pins
      ? pinData.map((pin, index) => {
          return (
            <div key={index}>
              <Pin
                pinData={pin}
                userId={userId}
                deletePin={this.deletePin}
                updateLikedPin={this.updateLikedPin}
              />
            </div>
          );
        })
      : null;

    return (
      <div className="page">
        <h1>All Pins</h1>

        {this.state.loading ? (
          <CircularProgress size={40} thickness={4} />
        ) : (
          <div>
            {this.state.errorMessage && (
              <p style={{ color: "red" }}>{this.state.errorMessage}</p>
            )}

            <Button variant="contained" onClick={this.toggleNewPinForm}>
              New Pin
            </Button>

            {this.state.filterUser && (
              <Text variant="body2">
                Filtering by {this.state.filterUser}.{" "}
                <Link onclick={this.backToAll}>Back to all.</Link>
              </Text>
            )}

            <div />
            {this.state.pins && this.state.pins.length !== 0 ? (
              <div style={this.state.style}>
                <Masonry className="my-gallery-class">{childElements}</Masonry>
              </div>
            ) : null}

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

export default AllPinsPage;
