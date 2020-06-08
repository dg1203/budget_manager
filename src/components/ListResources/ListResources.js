import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Tooltip,
  Typography
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import RepeatIcon from "@material-ui/icons/Repeat";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import TransferDialog from "../TransferDialog";
import PaymentDialog from "../PaymnetDialog";

const ListResources = ({ resources, jarId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [choosedCurrency, setChoosedCurrency] = useState("");
  const [choosedAmount, setChoosedAmount] = useState("");
  const openPaymentDialogMethod = (currency, amount) => {
    setChoosedCurrency(currency);
    setChoosedAmount(amount);
    setOpenPaymentDialog(true);
  };
  const openTransferDialog = (currency, amount) => {
    setChoosedCurrency(currency);
    setChoosedAmount(amount);
    setOpenDialog(true);
  };
  return resources.length === 0 ? (
    <Typography variant="h2" component="h2">
      Brak środków w słoiku
    </Typography>
  ) : (
    <>
      <List dense={false}>
        {resources.map((resource, index) => {
          const res = Object.entries(resource)[0];
          const [key, value] = res;
          return (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${key} ${value}`} />
              <ListItemSecondaryAction>
                <Tooltip
                  title="Przenieś środki do innego słoika"
                  placement="top"
                >
                  <IconButton onClick={() => openTransferDialog(key, value)}>
                    <CompareArrowsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Wyciągnij środki" placement="top">
                  <IconButton
                    onClick={() => openPaymentDialogMethod(key, value)}
                  >
                    <RepeatIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <TransferDialog
        open={openDialog}
        openDialog={setOpenDialog}
        currency={choosedCurrency}
        amount={choosedAmount}
        jarId={jarId}
      />
      <PaymentDialog
        open={openPaymentDialog}
        openDialog={setOpenPaymentDialog}
        jarId={jarId}
        currency={choosedCurrency}
        amount={choosedAmount}
      />
    </>
  );
};

ListResources.propTypes = {
  resources: PropTypes.array.isRequired,
  jarId: PropTypes.string.isRequired
};

export default ListResources;
