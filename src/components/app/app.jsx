import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import QuestionGenreScreen from "../question-genre-screen/question-genre-screen.jsx";
import QuestionArtistScreen from "../question-artist-screen/question-artist-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import {ActionCreator} from "../../reducer/reducer.js";
import {Time} from "../../utils/time/time.js";
import Timer from "../../utils/timer/timer.js";
import withActivePlayer from "../../hocs/with-active-player/with-active-player.jsx";
import withUserAnswers from "../../hocs/with-user-answers/with-user-answers.jsx";

const QuestionArtistScreenWrapped = withActivePlayer(QuestionArtistScreen);
const QuestionGenreScreenWrapped = withActivePlayer(withUserAnswers(QuestionGenreScreen));

class App extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {step, mistakes} = this.props;
    return step !== nextProps.step || mistakes !== nextProps.mistakes || nextProps.gameTimeRemaining === 0;
  }

  _getScreen() {
    const {questions, step, gameTimeMinutes, gameTimeRemaining, mistakes, maxMistakes, onGameResetClick} = this.props;
    const gameTimestamp = gameTimeMinutes * Time.MILLISECONDS_IN_MINUTE;
    const maxSteps = questions.length;

    if (step === -1) {
      const {onWelcomeScreenClick} = this.props;
      return (
        <WelcomeScreen
          time={gameTimeMinutes}
          maxMistakes={maxMistakes}
          onWelcomeButtonClick={() => onWelcomeScreenClick(step, maxSteps, gameTimestamp)}
        />
      );
    }

    if (gameTimeRemaining === 0 || mistakes > maxMistakes) {
      return (
        <GameOverScreen
          isTimeOver={gameTimeRemaining === 0}
          onResetGameClick={() => onGameResetClick()}
        />
      );
    }

    if (step === maxSteps) {
      return (
        <WinScreen
          gameDuration={gameTimestamp - gameTimeRemaining}
          mistakes={mistakes}
          result={0}
          fastAnswersAmount={0}
          onResetGameClick={() => onGameResetClick()}
        />
      );
    }

    const {onUserAnswerClick} = this.props;
    const question = questions[step];
    switch (question.type) {
      case `genre`:
        return (
          <QuestionGenreScreenWrapped
            question={question}
            onAnswerClick={(userChoice) => onUserAnswerClick(userChoice, question, mistakes, maxMistakes, step, maxSteps)}
          />
        );

      case `artist`:
        return (
          <QuestionArtistScreenWrapped
            question={question}
            onAnswerClick={(userChoice) => onUserAnswerClick(userChoice, question, mistakes, maxMistakes, step, maxSteps)}
          />
        );
    }
    return null;
  }

  render() {
    return (
      this._getScreen()
    );
  }
}

App.propTypes = {
  gameTimeMinutes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      type: PropTypes.oneOf([`genre`]),
      genre: PropTypes.oneOf([`jazz`, `rock`, `pop`]),
      answers: PropTypes.arrayOf(
          PropTypes.exact({
            src: PropTypes.string.isRequired,
            genre: PropTypes.oneOf([`jazz`, `rock`, `pop`])
          })
      )
    }),
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      type: PropTypes.oneOf([`artist`]),
      song: PropTypes.exact({
        artist: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
      }),
      answers: PropTypes.arrayOf(
          PropTypes.exact({
            artist: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired
          })
      )
    })
  ])),
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  gameTimeRemaining: PropTypes.number.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswerClick: PropTypes.func.isRequired,
  onGameResetClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  gameTimeRemaining: state.gameTimeRemaining,
  step: state.step,
  mistakes: state.mistakes
});

const mapDispatchToProps = (dispatch) => {
  const onTick = (timeTick, timeRemaining) => {
    dispatch(ActionCreator.decreaseGameTime(timeTick, timeRemaining));
  };
  const gameTimer = new Timer(0, Time.MILLISECONDS_IN_SECOND, onTick);

  return {
    onWelcomeScreenClick: (step, maxSteps, gameTime) => {
      dispatch(ActionCreator.setGameTime(gameTime, gameTimer));
      dispatch(ActionCreator.incrementStep(step, maxSteps, gameTimer));
    },
    onUserAnswerClick: (userChoice, question, mistakes, maxMistakes, step, maxSteps) => {
      dispatch(ActionCreator.incrementStep(step, maxSteps, gameTimer));
      dispatch(ActionCreator.incrementMistakes(userChoice, question, mistakes, maxMistakes, gameTimer));
    },
    onGameResetClick: () => dispatch(ActionCreator.resetGame())
  };
};


export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
