import {ADD_JAR, ADD_RESOURCES, REMOVE_RESOURCES} from "../types";

const addJar = payload => ({
  type: ADD_JAR,
  payload
});

const addResource = payload => ({
  type: ADD_RESOURCES,
  payload
});

const removeResource = payload => ({
  type: REMOVE_RESOURCES,
  payload
});

export { addJar, addResource, removeResource };
