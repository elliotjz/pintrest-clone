import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Delete, ThumbUp } from "@material-ui/icons";
import { Link } from "react-router-dom";

const styles = {
  container: {
    backgroundColor: "#444",
    padding: "5px",
    margin: "5px",
    maxWidth: "280px"
  },
  cardText: { color: "#eee" },
  card: {}
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
    const { pinData, userId, classes } = this.props;

    const userOwnsPin = userId === pinData.userId;
    const userIsLoggedIn = userId !== null;

    return (
      <Card className={classes.container}>
        <CardMedia
          image={pinData.url}
          title={pinData.description}
          alt={pinData.description}
          component="img"
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
                {pinData.likes.indexOf(localStorage.getItem("id")) === -1 ? (
                  <ThumbUp color="primary" />
                ) : (
                  <ThumbUp color="primary" />
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

export default withStyles(styles)(Pin);
