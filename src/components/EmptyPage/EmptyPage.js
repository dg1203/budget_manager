import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "25px",
    position: "absolute",
    margin: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -1
  }
});

const EmptyPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h5" component="h2">
        Lista jest pusta. Stwórz swój pierwszy słoik.
      </Typography>
      <Link to="/jar/add">
        <Button variant="contained" color="primary" endIcon={<PlusOneIcon />}>
          Dodaj
        </Button>
      </Link>
    </div>
  );
};

export default EmptyPage;
