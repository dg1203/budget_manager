import { ADD_JAR } from "../types";
import { randomId } from "../utils";

const initialState = {
  jars: [],
  logs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_JAR: {
      const id = randomId();
      return {
        ...state,
        jars: [
          ...state.jars,
          {
            id,
            ...action.payload,
            resources: []
          }
        ],
        logs: [
          ...state.logs,
          {
            id,
            type: ADD_JAR,
            description: "Dodanie słoika",
            time: Date.now()
          }
        ]
      };
    }
    default:
      return state;
  }
}
