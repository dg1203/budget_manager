import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Typography, AppBar, Tabs, Tab } from "@material-ui/core";
import TabPanel from "../../components/TabPanel";
import AddResources from "../../components/AddResources";
import ListResources from "../../components/ListResources";

const Jar = () => {
  const { id } = useParams();
  const { jars } = useSelector(state => state);
  const jar = jars.find(jar => jar.id === id);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    jar && (
      <>
        <Typography variant="h2" component="h2">
          {jar.name}
        </Typography>
        <Typography variant="h5" component="h2">
          Waluta słoika: {jar.currency}
        </Typography>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Środki w słoiku" />
            <Tab label="Dodaj środki" />
            <Tab label="Historia operacji" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ListResources resources={jar.resources} jarId={id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddResources currency={jar.currency} jarId={id} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Historia operacji
        </TabPanel>
      </>
    )
  );
};

export default Jar;
