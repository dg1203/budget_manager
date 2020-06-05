import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch } from "react-redux";
import {
  TextField,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Button
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { addJar } from "../../actions/stateActions";

const AddJar = () => {
  const dispatch = useDispatch();
  const [jar, setJar] = useState({
    name: "",
    description: "",
    currency: ""
  });
  const saveJar = event => {
    event.preventDefault();
    console.log(jar);
    dispatch(addJar(jar));
  };
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h4" component="h4" gutterBottom>
        Nowy słoik
      </Typography>
      <form autoComplete="off" onSubmit={event => saveJar(event)}>
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
            label="Age"
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

export default AddJar;
