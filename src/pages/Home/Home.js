import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { jars } = useSelector(state => state.jars);
  return jars.length === 0 ? <h1>Empty</h1> : <h1>NotEmpty</h1>;
};

export default Home;
