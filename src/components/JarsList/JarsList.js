import React from "react";
import PropTypes from "prop-types";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  margin: {
    marginBottom: "16px"
  }
});

const JarsList = ({ jars }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {jars.map(jar => (
        <Grid key={jar.id} item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography
                className={classes.margin}
                variant="h5"
                component="h2"
              >
                {jar.name}
              </Typography>
              <Typography className={classes.margin} color="textSecondary">
                {jar.description}
              </Typography>
              <Typography
                className={classes.margin}
                variant="body2"
                component="p"
              >
                Elementów w słoiku: {jar.resources.length}
                <br />
                {jar.currency !== "" ? `Waluta: ${jar.currency}` : ""}
              </Typography>
              <Link className={classes.margin} to={`/jar/edit/${jar.id}`}>
                <Button variant="contained" color="primary" fullWidth>
                  Więcej
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

JarsList.propTypes = {
  jars: PropTypes.array.isRequired
};

export default JarsList;
