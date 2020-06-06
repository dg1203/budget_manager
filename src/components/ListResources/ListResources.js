import React from "react";
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
  Tooltip
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import RepeatIcon from "@material-ui/icons/Repeat";

const ListResources = ({ resources, jarId }) => {
  const dispatch = useDispatch();
  const removeResources = resource => {
    dispatch(removeResource({ resource, jarId }));
  };
  return (
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
            <Tooltip title="Wyciągnij środki" placement="top">
              <IconButton onClick={() => removeResources(resource)}>
                <RepeatIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

ListResources.propTypes = {
  resources: PropTypes.array.isRequired,
  jarId: PropTypes.string.isRequired
};

export default ListResources;
