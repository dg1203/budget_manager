import { ADD_JAR } from "../types";

const addJar = payload => ({
  type: ADD_JAR,
  payload
});

export { addJar };
