import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  TextField,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormControlLabel,
  Checkbox,
  Tooltip
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { addJar } from "../../actions/stateActions";

const AddJar = ({ history }) => {
  const dispatch = useDispatch();
  const [jar, setJar] = useState({
    name: "",
    description: "",
    currency: "",
    isDefault: false
  });
  const saveJar = event => {
    event.preventDefault();
    dispatch(addJar(jar));
    history.push("/");
  };
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h4" component="h4" gutterBottom>
        Nowy słoik
      </Typography>
      <form
        data-testid="form"
        autoComplete="off"
        onSubmit={event => saveJar(event)}
      >
        <FormControl margin="normal" fullWidth variant="outlined">
          <TextField
            onChange={event => setJar({ ...jar, name: event.target.value })}
            value={jar.name}
            label="Nazwa"
            variant="outlined"
            required
          />
        </FormControl>
        <FormControl margin="normal" fullWidth variant="outlined">
          <TextField
            onChange={event =>
              setJar({ ...jar, description: event.target.value })
            }
            value={jar.description}
            label="Opis"
            variant="outlined"
            rows={4}
            multiline
            required
          />
        </FormControl>
        <FormControl margin="normal" fullWidth variant="outlined">
          <InputLabel>Waluta</InputLabel>
          <Select
            onChange={event => setJar({ ...jar, currency: event.target.value })}
            value={jar.currency}
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
          <Tooltip
            placement="top-start"
            title="Ustawienie słoika jako domyśly spowoduje, że kwoty które nie zostaną przyporządkowane do żadnego słoika trafią tutaj"
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={jar.isDefault}
                  onChange={event =>
                    setJar({ ...jar, isDefault: event.target.checked })
                  }
                  name="jason"
                />
              }
              label="Ustaw jako domyślny"
            />
          </Tooltip>
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

AddJar.propTypes = {
  history: PropTypes.object.isRequired
};

export default AddJar;
