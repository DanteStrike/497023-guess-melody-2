import {createSelector} from "reselect";


const getGameStep = (state) => state.game.step;
const getGameMistakes = (state) => state.game.mistakes;
const getGameTimeRemaining = (state) => state.game.timeRemaining;

const checkIsGameTimeLeft = createSelector(
    getGameTimeRemaining,
    (timeRemaining) => timeRemaining === 0
);

export default {
  getGameStep,
  getGameMistakes,
  getGameTimeRemaining,
  checkIsGameTimeLeft,
};
