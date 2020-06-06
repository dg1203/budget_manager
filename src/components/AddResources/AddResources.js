import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addResource } from "../../actions/stateActions";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import SaveIcon from "@material-ui/icons/Save";

const AddResources = ({ currency, jarId }) => {
  const dispatch = useDispatch();
  const [resource, setResource] = useState({
    title: "",
    amount: 0,
    currency: currency !== "" ? currency : ""
  });
  const onSave = event => {
    event.preventDefault();
    dispatch(
      addResource({
        id: jarId,
        resource
      })
    );
    setResource({
      title: "",
      amount: "",
      currency: currency !== "" ? currency : ""
    });
  };
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h4" component="h4" gutterBottom>
        Dodaj środki
      </Typography>
      <form autoComplete="off" onSubmit={onSave}>
        <FormControl margin="normal" fullWidth variant="outlined">
          <TextField
            value={resource.title}
            onChange={event =>
              setResource({ ...resource, title: event.target.value })
            }
            label="Tytuł"
            variant="outlined"
            required
          />
        </FormControl>
        <FormControl margin="normal" fullWidth variant="outlined">
          <TextField
            value={resource.amount}
            onChange={event =>
              setResource({ ...resource, amount: event.target.value })
            }
            label="Kwota"
            variant="outlined"
            type="number"
            required
          />
        </FormControl>
        <FormControl margin="normal" fullWidth variant="outlined">
          <InputLabel>Waluta</InputLabel>
          <Select
            disabled={currency !== ""}
            value={resource.currency}
            onChange={event =>
              setResource({ ...resource, currency: event.target.value })
            }
            required
          >
            <MenuItem value="">
              <em>Brak</em>
            </MenuItem>
            <MenuItem value="PLN">Złoty</MenuItem>
            <MenuItem value="EUR">Euro</MenuItem>
            <MenuItem value="USD">Dolar</MenuItem>
            <MenuItem value="GBP">Funt</MenuItem>
            <MenuItem value="CHF">Frank Szwajcarski</MenuItem>
          </Select>
        </FormControl>
        <FormControl margin="normal" fullWidth variant="outlined">
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Zapisz
          </Button>
        </FormControl>
      </form>
    </Grid>
  );
};

AddResources.propTypes = {
  currency: PropTypes.string.isRequired,
  jarId: PropTypes.string
};

export default AddResources;
