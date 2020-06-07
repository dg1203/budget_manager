import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";
import { setMessage } from "../../actions/stateActions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "fixed",
    zIndex: 1,
    bottom: 0,
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const Message = ({ message }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setMessage({
          message: null
        })
      );
    }, 5000);
  }, []);
  return (
    <div className={classes.root}>
      <Alert severity="success" variant="filled">
        {message}
      </Alert>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired
};

export default Message;
