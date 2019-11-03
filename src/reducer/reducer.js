const isArtistAnswerCorrect = (userAnswer, question) => {
  return userAnswer === question.song.artist;
};

const isGenreAnswersCorrect = (userAnswers, question) => {
  return userAnswers.every((userAnswer, index) => userAnswer === (question.answers[index].genre === question.genre));
};

const initialState = {
  step: -1,
  mistakes: 0,
  gameTimeLeft: 0
};

const ActionCreator = {
  incrementStep: (step, maxSteps, gameTimer) => {
    if (step === maxSteps) {
      gameTimer.stop();
      return {};
    }

    if (step === -1) {
      gameTimer.start();
    }

    return {
      type: `INCREMENT_STEP`,
      payload: 1
    };
  },

  incrementMistakes: (userChoice, question, mistakes, maxMistakes, gameTimer) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case `artist`:
        answerIsCorrect = isArtistAnswerCorrect(userChoice, question);
        break;
      case `genre`:
        answerIsCorrect = isGenreAnswersCorrect(userChoice, question);
        break;
    }

    if (!answerIsCorrect && mistakes === maxMistakes) {
      gameTimer.stop();
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: answerIsCorrect ? 0 : 1
    };
  },

  setGameTime: (timestamp, gameTimer) => {
    gameTimer.setTime(timestamp);

    return {
      type: `SET_GAME_TIME`,
      payload: timestamp
    };
  },

  decreaseGameTime: (timeTick, timeLeft) => {
    return {
      type: `DECREASE_GAME_TIME`,
      payload: timeLeft - timeTick < 0 ? 0 : timeTick
    };
  },

  resetGame: () => ({
    type: `RESET`,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`:
      return Object.assign({}, state, {
        step: state.step + action.payload
      });
    case `INCREMENT_MISTAKES`:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload
      });
    case `SET_GAME_TIME`:
      return Object.assign({}, state, {
        gameTimeLeft: action.payload
      });
    case `DECREASE_GAME_TIME`:
      return Object.assign({}, state, {
        gameTimeLeft: state.gameTimeLeft - action.payload
      });
    case `RESET`:
      return Object.assign({}, initialState);
  }

  return state;
};

export {isArtistAnswerCorrect, isGenreAnswersCorrect, reducer, ActionCreator};

