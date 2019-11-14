import {Question} from "../../utils/enum.js";
import types from "./types.js";
import utils from "./utils.js";

const incrementStep = (step, maxSteps, gameTimer) => {
  if (step + 1 === maxSteps) {
    gameTimer.stop();
  }

  if (step === -1) {
    gameTimer.start();
  }

  return {
    type: types.INCREMENT_STEP,
    payload: 1
  };
};

const incrementMistakes = (userChoice, question, mistakes, maxMistakes, gameTimer) => {
  let answerIsCorrect = false;

  switch (question.type) {
    case Question.Artist.TYPE:
      answerIsCorrect = utils.isArtistAnswerCorrect(userChoice, question);
      break;
    case Question.Genre.TYPE:
      answerIsCorrect = utils.isGenreAnswersCorrect(userChoice, question);
      break;
  }

  if (!answerIsCorrect && mistakes === maxMistakes) {
    gameTimer.stop();
  }

  return {
    type: types.INCREMENT_MISTAKES,
    payload: answerIsCorrect ? 0 : 1
  };
};

const setGameTime = (timestamp, gameTimer) => {
  gameTimer.setTime(timestamp);

  return {
    type: types.SET_GAME_TIME,
    payload: timestamp
  };
};

const decreaseGameTime = (timeTick, timeRemaining) => {
  return {
    type: types.DECREASE_GAME_TIME,
    payload: timeRemaining - timeTick < 0 ? 0 : timeTick
  };
};

const resetGame = () => ({
  type: types.RESET_GAME,
});

export default {
  incrementStep,
  incrementMistakes,
  setGameTime,
  decreaseGameTime,
  resetGame
};
