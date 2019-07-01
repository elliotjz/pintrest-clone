import React from "react";
import { Card, CardContent, IconButton, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Delete, ThumbUp } from "@material-ui/icons";
import { Link } from "react-router-dom";

import colors from "../colors";

const styles = {
  container: {
    backgroundColor: colors.white,
    padding: "5px",
    margin: "5px",
    maxWidth: "280px"
  },
  cardText: { color: colors.black },
  pinThumb: {
    color: colors.black,
    "&:hover": {
      color: colors.action
    }
  },
  likedPinThumb: {
    color: colors.action
  },
  image: {
    width: "100%"
  }
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
    const { pinData, userId, resizeGallery, classes } = this.props;

    const userOwnsPin = userId === pinData.userId;
    const userIsLoggedIn = userId !== null;

    const userLikesPin =
      pinData.likes.indexOf(localStorage.getItem("id")) !== -1;

    return (
      <Card className={classes.container}>
        <img
          src={pinData.url}
          title={pinData.description}
          alt={pinData.description}
          className={classes.image}
          onError={event => {
            event.target.onerror = "";
            event.target.src = "https://i.imgur.com/Zoufmfl.jpg";
            resizeGallery();
            return true;
          }}
        />

        <CardContent>
          <Typography variant="h5" className={classes.cardText}>
            {pinData.description}
          </Typography>
        </CardContent>
        <div className="pin-actions">
          <Link to={`/?uid=${pinData.userId}`}>
            <img src={pinData.userImg} alt="user thumbnail" />
          </Link>

          {userOwnsPin && (
            <IconButton
              aria-label="Delete"
              onClick={() => {
                this.props.deletePin(pinData.timeStamp);
              }}
            >
              <Delete color="error" />
            </IconButton>
          )}

          {userIsLoggedIn && (
            <div className="like-container">
              <IconButton
                aria-label="Like"
                onClick={() => {
                  this.handleLikeBtn(pinData.timeStamp);
                }}
              >
                {userLikesPin ? (
                  <ThumbUp color="action" className={classes.likedPinThumb} />
                ) : (
                  <ThumbUp color="secondary" className={classes.pinThumb} />
                )}
              </IconButton>
              <p
                className={
                  userLikesPin ? classes.likedPinThumb : classes.pinThumb
                }
              >
                {pinData.likes.length}
              </p>
            </div>
          )}
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(Pin);
