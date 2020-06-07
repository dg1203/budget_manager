import {
  ADD_JAR,
  ADD_RESOURCES,
  REMOVE_RESOURCES,
  TRANSFER_RESOURCES
} from "../types";
import { randomId, addLog, addResource, removeResource, transferResources } from "../services";

const initialState = {
  jars: [],
  logs: [],
  defaultJar: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_JAR: {
      const id = randomId();
      const jar = { id, ...action.payload, resources: [] };
      const { isDefault } = jar;
      return {
        ...state,
        jars: [...state.jars, { ...jar }],
        logs: [...state.logs, addLog(id, action.type)],
        defaultJar: isDefault ? id : state.defaultJar
      };
    }
    case ADD_RESOURCES: {
      const { payload } = action;
      const { id, resource } = payload;
      const { title, amount } = resource;
      return {
        ...state,
        jars: addResource(state.jars, id, resource),
        logs: [...state.logs, addLog(id, action.type, title, amount)]
      };
    }
    case REMOVE_RESOURCES: {
      const { resource, jarId } = action.payload;
      const { id, title, amount } = resource;
      return {
        ...state,
        jars: removeResource(state.jars, id, jarId),
        logs: [...state.logs, addLog(jarId, action.type, title, amount)]
      };
    }
    case TRANSFER_RESOURCES: {
      const { resource, jarId, targetId } = action.payload;
      const { title, amount } = resource;
      return {
        ...state,
        jars: transferResources(state.jars, resource, jarId, targetId),
        logs: [
          ...state.logs,
          addLog(jarId, `${TRANSFER_RESOURCES}_FROM`, title, amount),
          addLog(targetId, `${TRANSFER_RESOURCES}_TO`, title, amount)
        ]
      };
    }
    default:
      return state;
  }
}
