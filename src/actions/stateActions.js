import {
  ADD_JAR,
  ADD_RESOURCES,
  REMOVE_RESOURCES,
  TRANSFER_RESOURCES
} from "../types";

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

const transferResources = payload => ({
  type: TRANSFER_RESOURCES,
  payload
});

export { addJar, addResource, removeResource, transferResources };
