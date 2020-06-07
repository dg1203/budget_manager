import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  Typography,
  InputAdornment,
  Button
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const SplitPayment = ({ availableJars, amount, setSplitJars }) => {
  const { defaultJar } = useSelector(state => state);
  const [availableJarsState] = useState(
    availableJars.map(jar => ({
      ...jar,
      amount: 0,
      percent: 0
    }))
  );
  const [choosedJars, setChoosedJars] = useState([]);
  const [sumAmount, setSumAmount] = useState(amount);
  useEffect(() => {
    setSumAmount(amount);
  }, [amount]);
  const handleChange = event => {
    setChoosedJars(event.target.value);
  };
  const joinSelectedNames = selected => {
    const names = selected.map(select => select.name);
    return names.join(", ");
  };
  const setValue = (index, value) => {
    const sum = choosedJars.reduce(
      (prevValue, jar, idx) =>
        index !== idx ? prevValue + jar.percent : prevValue,
      0
    );
    const percentSum = 100 - sum;
    if (parseFloat(value) >= 0 && parseFloat(value) <= percentSum) {
      const jars = choosedJars.map((jar, idx) => {
        if (idx === index) {
          jar.percent = parseFloat(value);
          jar.amount = parseFloat((amount / 100) * parseFloat(value)).toFixed(
            2
          );
        }
        return jar;
      });
      setChoosedJars(jars);
      setSplitJars(jars);
      const sumAmount = jars.reduce(
        (prevValue, jar, idx) => parseFloat(prevValue) + parseFloat(jar.amount),
        0
      );
      const sumAmountParsed = parseFloat(
        amount - parseFloat(sumAmount)
      ).toFixed(2);
      setSumAmount(sumAmountParsed);
    }
  };
  return (
    <>
      <FormControl margin="normal" fullWidth variant="outlined">
        <InputLabel id="demo-mutiple-checkbox-label">Wybierz słoiki</InputLabel>
        <Select
          multiple
          value={choosedJars}
          onChange={handleChange}
          renderValue={selected => joinSelectedNames(selected)}
        >
          {availableJarsState.map(jar => (
            <MenuItem key={jar.id} value={jar}>
              <Checkbox checked={choosedJars.indexOf(jar) > -1} />
              <ListItemText primary={jar.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {choosedJars.length > 0 &&
        choosedJars.map((jar, index) => {
          return (
            <FormControl
              key={index}
              margin="normal"
              fullWidth
              variant="outlined"
            >
              <Typography>
                Słoik: {jar.name}
                <br />
                Kwota w słoiku: {jar.amount}
              </Typography>
              <TextField
                disabled={amount === 0}
                value={jar.percent}
                onChange={event =>
                  setValue(index, event.target.value ? event.target.value : 0)
                }
                type="number"
                label="Wartość procentowa słoika"
                variant="outlined"
                min="0"
                max="100"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  )
                }}
                required
              />
            </FormControl>
          );
        })}
      <FormControl margin="normal" fullWidth variant="outlined">
        {defaultJar === "" ? (
          <Typography>
            Nie posiadasz domyślnego słoika - cała kwota musi zostać
            rozdysponowana.
          </Typography>
        ) : (
          <Typography>
            Kwota nierozdysponowana trafi do domyślnego słoika.
          </Typography>
        )}

        <Button
          disabled={
            (parseFloat(sumAmount) > 0 && defaultJar === "") || amount === 0
          }
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          startIcon={<SaveIcon />}
        >
          Zapisz
        </Button>
      </FormControl>
    </>
  );
};

SplitPayment.propTypes = {
  availableJars: PropTypes.array.isRequired,
  amount: PropTypes.number.isRequired,
  setSplitJars: PropTypes.func.isRequired
};

export default SplitPayment;
