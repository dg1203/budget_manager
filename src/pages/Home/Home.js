import React from "react";
import { useSelector } from "react-redux";

import EmptyPage from "../../components/EmptyPage";

const Home = () => {
  const { jars } = useSelector(state => state.jars);
  return jars.length === 0 ? <EmptyPage /> : <h1>NotEmpty</h1>;
};

export default Home;
