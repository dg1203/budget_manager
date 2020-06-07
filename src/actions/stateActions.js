import {
  ADD_JAR,
  ADD_RESOURCES,
  REMOVE_RESOURCES,
  SET_MESSAGE,
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

const setMessage = payload => ({
  type: SET_MESSAGE,
  payload
});

export { addJar, addResource, removeResource, transferResources, setMessage };
