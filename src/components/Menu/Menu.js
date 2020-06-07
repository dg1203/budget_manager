import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import PropTypes from "prop-types";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HistoryIcon from "@material-ui/icons/History";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";

const Menu = ({ open, setOpen, history }) => {
  const openPage = url => {
    history.push(url);
    setOpen(false);
  };
  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <List component="nav">
        <ListItem button onClick={() => openPage("/jar/add")}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Nowy słoik" />
        </ListItem>
        <ListItem button onClick={() => openPage("/resource/add")}>
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Nowa wpłata" />
        </ListItem>
        <ListItem button onClick={() => openPage("/history")}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Historia operacji" />
        </ListItem>
      </List>
    </Drawer>
  );
};

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default Menu;
