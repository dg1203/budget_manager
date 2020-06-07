import {
  ADD_JAR,
  ADD_RESOURCES,
  REMOVE_RESOURCES,
  TRANSFER_RESOURCES,
  SET_MESSAGE
} from "../types";
import {
  randomId,
  addLog,
  addResource,
  removeResource,
  transferResources
} from "../services";

const initialState = {
  jars: [],
  logs: [],
  defaultJar: "",
  message: null
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
        defaultJar: isDefault ? id : state.defaultJar,
        message: `Dodano nowy słoik: ${jar.name}`
      };
    }
    case ADD_RESOURCES: {
      const { payload } = action;
      const { id, resource } = payload;
      const { title, amount, currency } = resource;
      console.log(resource);
      return {
        ...state,
        jars: addResource(state.jars, id, resource),
        logs: [...state.logs, addLog(id, action.type, title, amount, currency)],
        message: `Dodano nową operację: ${title} - ${amount}`
      };
    }
    case REMOVE_RESOURCES: {
      const { currency, amount, jarId } = action.payload;
      return {
        ...state,
        jars: removeResource(state.jars, currency, amount, jarId),
        logs: [
          ...state.logs,
          addLog(jarId, action.type, "Wypłata", amount, currency)
        ],
        message: `Wyjęto środki ze słoika: ${amount}`
      };
    }
    case TRANSFER_RESOURCES: {
      const { amount, currency, jarId, targetId } = action.payload;
      return {
        ...state,
        jars: transferResources(state.jars, amount, currency, jarId, targetId),
        logs: [
          ...state.logs,
          addLog(
            jarId,
            `${TRANSFER_RESOURCES}_FROM`,
            "Transfer",
            amount,
            currency
          ),
          addLog(
            targetId,
            `${TRANSFER_RESOURCES}_TO`,
            "Transfer",
            amount,
            currency
          )
        ],
        message: `Transfer środków zakończony sukcesem`
      };
    }
    case SET_MESSAGE: {
      const { message } = action.payload;
      return {
        ...state,
        message
      };
    }
    default:
      return state;
  }
}
