const isArtistAnswerCorrect = (userAnswer, question) => {
  return userAnswer === question.song.artist;
};

const isGenreAnswersCorrect = (userAnswers, question) => {
  return userAnswers.every((userAnswer, index) => userAnswer === (question.answers[index].genre === question.genre));
};

const initialState = {
  step: -1,
  mistakes: 0
};

const ActionCreator = {
  incrementStep: (step, maxSteps) => {
    if (step >= maxSteps) {
      return {
        type: `RESET`
      };
    }

    return {
      type: `INCREMENT_STEP`,
      payload: 1
    };
  },

  incrementMistakes: (userChoice, question, mistakes, maxMistakes) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case `artist`:
        answerIsCorrect = isArtistAnswerCorrect(userChoice, question);
        break;
      case `genre`:
        answerIsCorrect = isGenreAnswersCorrect(userChoice, question);
        break;
    }

    if (!answerIsCorrect && (mistakes + 1) > maxMistakes) {
      return {
        type: `RESET`
      };
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: answerIsCorrect ? 0 : 1
    };
  }
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
    case `RESET`:
      return Object.assign({}, initialState);
  }

  return state;
};

export {isArtistAnswerCorrect, isGenreAnswersCorrect, reducer, ActionCreator};

