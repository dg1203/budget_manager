import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";

const initialState = {
  jars: [
    {
      id: "dasas",
      currency: "",
      name: "Test",
      description: "Test",
      resources: []
    }
  ],
  logs: [],
  defaultJar: "fds",
  message: null
};

const store = createStore(rootReducer, initialState);

export default store;
