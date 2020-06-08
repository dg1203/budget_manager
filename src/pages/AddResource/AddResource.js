import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import SplitPayment from "../../components/SplitPayment";
import {
  TextField,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Tooltip,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { addResource } from "../../actions/stateActions";
import { getAvailableJars } from "../../services";

const AddResource = ({ history }) => {
  const dispatch = useDispatch();
  const { jars, defaultJar } = useSelector(state => state);
  const [availableJars, setAvailablJars] = useState([]);
  const [jar, setJar] = useState("");
  const [splitJars, setSplitJars] = useState([]);
  const [isSplit, setIsSplit] = useState(false);
  const [resource, setResource] = useState({
    title: "",
    amount: 0,
    currency: ""
  });
  useEffect(() => {
    const availableJars = getAvailableJars(resource.currency);
    setAvailablJars(availableJars);
  }, [resource]);
  const onSave = event => {
    event.preventDefault();
    const selectedJar =
      jar === "" ? (defaultJar !== "" ? defaultJar : "") : jar;
    if (!isSplit) {
      saveResource(selectedJar);
    } else {
      saveSplitPayment();
    }
    history.push("/");
  };
  const saveResource = id => {
    dispatch(
      addResource({
        id,
        resource
      })
    );
    setResource({
      title: "",
      amount: "",
      currency: ""
    });
  };
  const saveSplitPayment = () => {
    const sumAmount = splitJars.reduce(
      (prevValue, jar, idx) => parseFloat(prevValue) + parseFloat(jar.amount),
      0
    );
    const rest = parseFloat(resource.amount) - parseFloat(sumAmount);
    splitJars.forEach(jar => {
      const splitResource = {
        title: resource.title,
        amount: jar.amount,
        currency: resource.currency
      };
      dispatch(
        addResource({
          id: jar.id,
          resource: splitResource
        })
      );
    });
    if (rest > 0) {
      const restResource = {
        title: resource.title,
        amount: rest,
        currency: jar.currency
      };
      dispatch(
        addResource({
          id: defaultJar,
          resource: restResource
        })
      );
    }
  };
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h4" component="h4" gutterBottom>
        Dodaj środki
      </Typography>
      {jars.length === 0 ? (
        <Typography variant="h5" component="h5" gutterBottom>
          Aby dokonać wpłaty musisz najpierw dodać przynajmniej jeden słoik
        </Typography>
      ) : (
        <form autoComplete="off" onSubmit={onSave}>
          <FormControl margin="normal" fullWidth variant="outlined">
            <Tooltip
              placement="top-start"
              title="Wpłata dzielona oznacza, że możesz rozdysponować ją na kilka słoików"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSplit}
                    onChange={event => setIsSplit(event.target.checked)}
                  />
                }
                label="Wpłata dzielona"
              />
            </Tooltip>
          </FormControl>
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
          {availableJars.length === 0 ? (
            <Typography variant="h5" component="h5" gutterBottom>
              Brak dostępnych słoików dla tej operacji
            </Typography>
          ) : !isSplit ? (
            <FormControl margin="normal" fullWidth variant="outlined">
              <InputLabel>Dostepne słoki</InputLabel>
              <Select
                required
                value={jar}
                onChange={event => setJar(event.target.value)}
              >
                <MenuItem value="">
                  <em>Brak</em>
                </MenuItem>
                {availableJars.map(jar => (
                  <MenuItem key={jar.id} value={jar.id}>
                    {jar.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <SplitPayment
              availableJars={availableJars}
              amount={parseFloat(resource.amount)}
              setSplitJars={setSplitJars}
            />
          )}
          {!isSplit && (
            <FormControl margin="normal" fullWidth variant="outlined">
              <Button
                disabled={defaultJar === "" && jar === ""}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Zapisz
              </Button>
            </FormControl>
          )}
        </form>
      )}
    </Grid>
  );
};

AddResource.propTypes = {
  history: PropTypes.object.isRequired
};

export default AddResource;
