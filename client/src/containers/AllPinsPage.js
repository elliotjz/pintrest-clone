import React from "react";
import CircularProgress from "material-ui/CircularProgress";
import RaisedButton from "material-ui/RaisedButton";
import Masonry from "react-masonry-component";

import NewPinForm from "../components/NewPinForm";
import Auth from "../config/Auth";
import Pin from "../components/Pin";

class AllPinsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: null,
      loading: true,
      errorMessage: null,
      firebaseUser: null,
      filterUser: null,
      style: {},
      newPinFormOpen: false,
      url: "",
      description: ""
    };

    this.applyUserFilter = this.applyUserFilter.bind(this);
    this.backToAll = this.backToAll.bind(this);
    this.toggleNewPinForm = this.toggleNewPinForm.bind(this);
    this.processNewPinForm = this.processNewPinForm.bind(this);
    this.formChange = this.formChange.bind(this);
  }

  processNewPinForm(event) {
    event.preventDefault();

    const id = this.state.firebaseUser.uid;
    const url = this.state.url;
    const description = this.state.description;
    const pinData = `id=${id}&url=${url}&description=${description}`;

    const xhr = new XMLHttpRequest();
    xhr.open("post", "/api/new-pin");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.responseType = "json";
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        this.setState({
          newPinFormOpen: false,
          url: "",
          description: ""
        });
        this.getUserPins();
      } else {
        this.setState({
          errorMessage: "Couldn't add pin at this time. Try again later"
        });
      }
    });
    xhr.send(pinData);
  }

  toggleNewPinForm() {
    this.setState({
      newPinFormOpen: !this.state.newPinFormOpen
    });
  }

  formChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  applyUserFilter(id) {
    this.setState({
      filterUser: id
    });
  }

  backToAll() {
    this.setState({
      filterUser: null
    });
  }

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

  async componentDidMount() {
    Auth.getUser(user => {
      this.setState({
        firebaseUser: user
      });
    });

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
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => {
      this.resizeGallery();
    });
  }

  render() {
    let pinData = this.state.filterUser
      ? this.state.pins.filter(pin => {
          return pin.userId === this.state.filterUser;
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
                filterUser={this.applyUserFilter}
                deletePin={this.deletePin}
                updateLikedPin={this.updateLikedPin}
              />
            </div>
          );
        })
      : null;

    return (
      <div className="page">
        {!this.state.filterUser && <h1>All Pins</h1>}

        {this.state.loading && <CircularProgress size={40} thickness={4} />}

        {this.state.errorMessage && (
          <p style={{ color: "red" }}>{this.state.errorMessage}</p>
        )}

        {this.state.filterUser && (
          <div id="back-to-all-btn">
            <RaisedButton
              label="back to all"
              onClick={this.backToAll}
              primary
            />
          </div>
        )}

        <div>
          <RaisedButton
            label="New Pin"
            onClick={this.toggleNewPinForm}
            primary
          />
        </div>
        {this.state.pins && this.state.pins.length !== 0 ? (
          <div style={this.state.style}>
            <Masonry className="my-gallery-class">{childElements}</Masonry>
          </div>
        ) : null}

        {this.state.newPinFormOpen && (
          <NewPinForm
            onSubmit={this.processNewPinForm}
            onChange={this.formChange}
            url={this.state.url}
            description={this.state.description}
            closeForm={this.toggleNewPinForm}
          />
        )}
      </div>
    );
  }
}

export default AllPinsPage;
