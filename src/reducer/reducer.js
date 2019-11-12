const isArtistAnswerCorrect = (userAnswer, question) => {
  return userAnswer === question.song.artist;
};

const isGenreAnswersCorrect = (userAnswers, question) => {
  return userAnswers.every((userAnswer, index) => userAnswer === (question.answers[index].genre === question.genre));
};

const initialState = {
  step: -1,
  mistakes: 0,
  gameTimeRemaining: 0,
  questions: []
};

const ActionCreator = {
  loadQuestions: (questions) => {
    return {
      type: `LOAD_QUESTIONS`,
      payload: questions
    };
  },

  incrementStep: (step, maxSteps, gameTimer) => {
    if (step + 1 === maxSteps) {
      gameTimer.stop();
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

  decreaseGameTime: (timeTick, timeRemaining) => {
    return {
      type: `DECREASE_GAME_TIME`,
      payload: timeRemaining - timeTick < 0 ? 0 : timeTick
    };
  },

  resetGame: () => ({
    type: `RESET`,
  })
};

const Operations = {
  loadQuestions: () => (dispatch, _, api) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_QUESTIONS`:
      return Object.assign({}, state, {
        questions: action.payload
      });
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
        gameTimeRemaining: action.payload
      });
    case `DECREASE_GAME_TIME`:
      return Object.assign({}, state, {
        gameTimeRemaining: state.gameTimeRemaining - action.payload
      });
    case `RESET`:
      return Object.assign({}, initialState);
  }

  return state;
};

export {isArtistAnswerCorrect, isGenreAnswersCorrect, reducer, ActionCreator, Operations};

