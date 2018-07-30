import { combineReducers } from "redux";
import collections from "./collectionsReducer";

const rootReducer = combineReducers({
  collections
});

export default rootReducer;
