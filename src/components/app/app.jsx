import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {gameActions, gameSelectors} from "../../reducers/game/index.js";
import {Time} from "../../utils/time/time.js";
import Timer from "../../utils/timer/timer.js";
import {Question} from "../../utils/enum.js";
import {compose} from "recompose";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import QuestionGenreScreen from "../question-genre-screen/question-genre-screen.jsx";
import QuestionArtistScreen from "../question-artist-screen/question-artist-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import withActivePlayer from "../../hocs/with-active-player/with-active-player.jsx";
import withUserAnswers from "../../hocs/with-user-answers/with-user-answers.jsx";

const QuestionArtistScreenWrapped = withActivePlayer(QuestionArtistScreen);
const QuestionGenreScreenWrapped = compose(
    withActivePlayer,
    withUserAnswers(Question.Genre.ANSWERS_AMOUNT)
)(QuestionGenreScreen);

class App extends React.Component {
  _getScreen() {
    const {questions, step, gameTimeMinutes, isGameTimeLeft, mistakes, maxMistakes, onGameResetClick} = this.props;
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

    if (isGameTimeLeft || mistakes > maxMistakes) {
      return (
        <GameOverScreen
          isTimeOver={isGameTimeLeft}
          onResetGameClick={() => onGameResetClick()}
        />
      );
    }

    if (step === maxSteps) {
      return (
        <WinScreen
          gameDuration={0}
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
      case Question.Type.GENRE:
        return (
          <QuestionGenreScreenWrapped
            id={step}
            question={question}
            onAnswerClick={(userChoice) => onUserAnswerClick(userChoice, question, mistakes, maxMistakes, step, maxSteps)}
          />
        );

      case Question.Type.ARTIST:
        return (
          <QuestionArtistScreenWrapped
            id={step}
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
      type: PropTypes.oneOf([`genre`]),
      genre: PropTypes.string.isRequired,
      answers: PropTypes.arrayOf(
          PropTypes.exact({
            src: PropTypes.string.isRequired,
            genre: PropTypes.string.isRequired
          })
      )
    }),
    PropTypes.exact({
      type: PropTypes.oneOf([`artist`]),
      song: PropTypes.exact({
        artist: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
      }),
      answers: PropTypes.arrayOf(
          PropTypes.exact({
            artist: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired
          })
      )
    })
  ])),
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  isGameTimeLeft: PropTypes.bool.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswerClick: PropTypes.func.isRequired,
  onGameResetClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isGameTimeLeft: gameSelectors.checkIsGameTimeLeft(state.game),
  step: state.game.step,
  mistakes: state.game.mistakes,
  questions: state.questions.questions
});

const mapDispatchToProps = (dispatch) => {
  const onTick = (timeTick, timeRemaining) => {
    dispatch(gameActions.decreaseGameTime(timeTick, timeRemaining));
  };
  const gameTimer = new Timer(0, Time.MILLISECONDS_IN_SECOND, onTick);

  return {
    onWelcomeScreenClick: (step, maxSteps, gameTime) => {
      dispatch(gameActions.setGameTime(gameTime, gameTimer));
      dispatch(gameActions.incrementStep(step, maxSteps, gameTimer));
    },
    onUserAnswerClick: (userChoice, question, mistakes, maxMistakes, step, maxSteps) => {
      dispatch(gameActions.incrementStep(step, maxSteps, gameTimer));
      dispatch(gameActions.incrementMistakes(userChoice, question, mistakes, maxMistakes, gameTimer));
    },
    onGameResetClick: () => dispatch(gameActions.resetGame())
  };
};


export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
