import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import Header from "./components/Header";
import Home from "./pages/Home";
import AddJar from "./pages/AddJar";
import Jar from "./pages/Jar";
import History from "./pages/History";
import AddResource from "./pages/AddResource";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container maxWidth="lg" style={{ padding: "50px 15px" }}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/history" component={History} exact />
            <Route path="/jar/add" component={AddJar} exact />
            <Route path="/jar/edit/:id" component={Jar} exact />
            <Route path="/resource/add" component={AddResource} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
