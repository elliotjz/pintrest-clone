import React from "react";
import Menu from "./components/Menu";
import { AppBar, Toolbar } from "@material-ui/core";

const Header = () => (
  <div>
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Menu />
      </Toolbar>
    </AppBar>
  </div>
);

export default Header;
