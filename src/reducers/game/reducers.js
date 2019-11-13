import {combineReducers} from "redux";
import types from "./types";


const stepReducer = (state = -1, action) => {
  switch (action.type) {
    case types.INCREMENT_STEP:
      return state + action.payload;

    case types.RESET_GAME:
      return -1;

    default:
      return state;
  }
};

const mistakesReducer = (state = 0, action) => {
  switch (action.type) {
    case types.INCREMENT_MISTAKES:
      return state + action.payload;

    case types.RESET_GAME:
      return 0;

    default:
      return state;
  }
};

const gameTimeReducer = (state = -1, action) => {
  switch (action.type) {
    case types.SET_GAME_TIME:
      return action.payload;

    case types.DECREASE_GAME_TIME:
      return state - action.payload;

    case types.RESET_GAME:
      return -1;

    default:
      return state;
  }
};

const reducer = combineReducers({
  step: stepReducer,
  mistakes: mistakesReducer,
  gameTimeRemaining: gameTimeReducer
});


export default reducer;
