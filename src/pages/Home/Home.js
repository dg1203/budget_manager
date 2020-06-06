import React from "react";
import { useSelector } from "react-redux";

import EmptyPage from "../../components/EmptyPage";
import JarsList from "../../components/JarsList";
const Home = () => {
  const { jars, logs } = useSelector(state => state);
  console.log(logs);
  return jars.length === 0 ? <EmptyPage /> : <JarsList jars={jars} />;
};

export default Home;
