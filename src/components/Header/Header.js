import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import Menu from "../Menu";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Menu open={open} setOpen={setOpen} />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setOpen(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Zarządzanie budżetem</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
