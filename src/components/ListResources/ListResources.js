import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeResource } from "../../actions/stateActions";
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

const ListResources = ({ resources, jarId }) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [resourceToTransfer, setResourceToTransfer] = useState(null);
  const removeResources = resource => {
    dispatch(removeResource({ resource, jarId }));
  };
  const openTransferDialog = resource => {
    setResourceToTransfer(resource);
    setOpenDialog(true);
  };
  return resources.length === 0 ? (
    <Typography variant="h2" component="h2">
      Brak środków w słoiku
    </Typography>
  ) : (
    <>
      <List dense={false}>
        {resources.map(resource => (
          <ListItem key={resource.id}>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${resource.amount} ${resource.currency}`}
              secondary={resource.title}
            />
            <ListItemSecondaryAction>
              <Tooltip title="Przenieś środki do innego słoika" placement="top">
                <IconButton onClick={() => openTransferDialog(resource)}>
                  <CompareArrowsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Wyciągnij środki" placement="top">
                <IconButton onClick={() => removeResources(resource)}>
                  <RepeatIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <TransferDialog
        open={openDialog}
        openDialog={setOpenDialog}
        resource={resourceToTransfer}
        jarId={jarId}
      />
    </>
  );
};

ListResources.propTypes = {
  resources: PropTypes.array.isRequired,
  jarId: PropTypes.string.isRequired
};

export default ListResources;
