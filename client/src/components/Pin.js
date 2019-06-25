import React from "react";
import { Card, CardMedia, CardText } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Delete from "material-ui/svg-icons/action/delete";
import Like from "material-ui/svg-icons/action/thumb-up";
import {
  blue200,
  blue500,
  red300,
  red500,
  grey100,
  grey800
} from "material-ui/styles/colors";

const style = {
  backgroundColor: grey800,
  padding: "5px",
  margin: "5px"
};

class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleLikeBtn = timeStamp => {
    this.props.updateLikedPin(timeStamp);
  };

  render() {
    const { pinData, userId, filterUser } = this.props;
    const userOwnsPin = userId === pinData.userId;
    const userIsLoggedIn = userId !== null;

    return (
      <Card className="tile" style={style}>
        <CardMedia>
          <img
            src={pinData.url}
            alt={pinData.description}
            onError={event => {
              event.target.onerror = "";
              event.target.src = "https://i.imgur.com/Zoufmfl.jpg";
              return true;
            }}
          />
        </CardMedia>

        <div className="pin-description">
          <CardText style={{ color: "#fff" }}>{pinData.description}</CardText>
        </div>
        <div className="pin-actions">
          <img
            src={pinData.userImg}
            alt="user thumbnail"
            onClick={() => {
              filterUser(pinData.userId);
            }}
          />

          {userOwnsPin && (
            <IconButton
              touch={true}
              onClick={() => {
                this.props.deletePin(pinData.timeStamp);
              }}
            >
              <Delete color={red300} hoverColor={red500} />
            </IconButton>
          )}

          {userIsLoggedIn && (
            <div className="like-container">
              <IconButton
                touch={true}
                onClick={() => {
                  this.handleLikeBtn(pinData.timeStamp);
                }}
              >
                {pinData.likes.indexOf(localStorage.getItem("id")) === -1 ? (
                  <Like color={grey100} hoverColor={blue200} />
                ) : (
                  <Like color={blue500} />
                )}
              </IconButton>
              <p>{pinData.likes.length}</p>
            </div>
          )}
        </div>
      </Card>
    );
  }
}

export default Pin;
