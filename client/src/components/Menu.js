import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import colors from "../colors";
import Auth from "../config/Auth";

const styles = {
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  },
  hamburger: {
    marginRight: "10px",
    color: colors.primary
  },
  menuButton: {
    margin: "0 10px",
    borderColor: colors.primary,
    color: colors.primary
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    fontSize: 20,
    color: colors.primary
  }
};

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wideScreen: false,
      open: false,
      anchorEl: null,
      auth: false,
      userId: ""
    };
  }

  isWideScreen() {
    return document.documentElement.clientWidth > 550;
  }

  closeMenu = () => {
    this.setState({
      open: false,
      anchorEl: null
    });
  };

  openMenu = event => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  componentWillMount() {
    this.setState({
      auth: !!localStorage.getItem("token")
    });
  }

  componentDidMount() {
    Auth.getUser(user => {
      this.setState({
        userId: user.uid,
        wideScreen: this.isWideScreen()
      });
    });

    window.addEventListener("resize", () => {
      this.setState({ wideScreen: this.isWideScreen() });
    });
  }

  render() {
    const { open, anchorEl, auth, wideScreen, userId } = this.state;
    const { classes } = this.props;

    const authButtonText = auth ? "Logout" : "Login";
    const authButtonLink = auth ? "/logout" : "/login";

    return (
      <div className={classes.root}>
        <Typography className={classes.title}>Pinterest Clone</Typography>
        {wideScreen ? (
          <div>
            <Link to="/">
              <Button className={classes.menuButton} variant="outlined">
                All Pins
              </Button>
            </Link>
            {auth && (
              <Link to={`/?uid=${userId}`}>
                <Button className={classes.menuButton} variant="outlined">
                  My Pins
                </Button>
              </Link>
            )}
            <Link to={authButtonLink}>
              <Button className={classes.menuButton} variant="outlined">
                {authButtonText}
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <IconButton
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={this.openMenu}
              className={classes.hamburger}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              keepMounted
              open={open}
              anchorEl={anchorEl}
              onClose={this.closeMenu}
            >
              <Link to="/">
                <MenuItem onClick={this.closeMenu}>All Pins</MenuItem>
              </Link>
              {auth && (
                <Link to={`/?uid=${userId}`}>
                  <MenuItem onClick={this.closeMenu}>My Pins</MenuItem>
                </Link>
              )}
              <Link to={authButtonLink}>
                <MenuItem onClick={this.closeMenu}>{authButtonText}</MenuItem>
              </Link>
            </Menu>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(NavMenu);
