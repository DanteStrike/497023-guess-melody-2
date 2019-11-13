import types from "./types";
import {combineReducers} from "redux";


const questionsReducer = (state = [], action) => {
  if (action.type === types.LOAD_QUESTIONS) {
    return action.payload;
  }

  return state;
};

const reducer = combineReducers({
  questions: questionsReducer
});

export default reducer;
