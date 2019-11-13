import {createSelector} from "reselect";

const getGameTimeRemaining = (game) => game.gameTimeRemaining;

const checkIsGameTimeLeft = createSelector(
    [getGameTimeRemaining],
    (gameTimeRemaining) => gameTimeRemaining === 0
);

export default {
  checkIsGameTimeLeft,
  getGameTimeRemaining
};
