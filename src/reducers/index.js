import { combineReducers } from "redux";
import jarReducer from "./jarReducer";
import historyReducer from "./historyReducer";

export default combineReducers({
  jars: jarReducer,
  history: historyReducer
});
