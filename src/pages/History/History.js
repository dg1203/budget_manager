import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAllHistory } from "../../services";
import EnhancedTable from "../../components/EnhancedTable";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select
} from "@material-ui/core";

const History = () => {
  const { jars, logs } = useSelector(state => state);
  const [selectedJar, setSelectedJar] = useState("");
  const history = getAllHistory(logs, selectedJar);
  return (
    <>
      <FormControl margin="normal" fullWidth variant="outlined">
        <InputLabel>Filtruj</InputLabel>
        <Select
          value={selectedJar}
          onChange={event => setSelectedJar(event.target.value)}
          required
        >
          <MenuItem value="">
            <em>Brak</em>
          </MenuItem>
          {jars.map(jar => (
            <MenuItem value={jar.id}>{jar.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <EnhancedTable rows={history.rows} header={history.header} />
    </>
  );
};

export default History;
