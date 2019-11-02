import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import QuestionGenreScreen from "../question-genre-screen/question-genre-screen.jsx";
import QuestionArtistScreen from "../question-artist-screen/question-artist-screen.jsx";
import {ActionCreator} from "../../reducer.js";

class App extends React.PureComponent {
  _getScreen(question, questionsAmount) {
    if (!question) {
      const {
        gameTime,
        maxMistakes,
        step,
        onWelcomeScreenClick
      } = this.props;

      return (
        <WelcomeScreen
          time={gameTime}
          maxMistakes={maxMistakes}
          onWelcomeButtonClick={() => onWelcomeScreenClick(step, questionsAmount)}
        />
      );
    }

    const {onUserAnswerClick, mistakes, maxMistakes, step} = this.props;

    switch (question.type) {
      case `genre`:
        return (
          <QuestionGenreScreen
            question={question}
            onAnswerClick={(userChoice) => onUserAnswerClick(userChoice, question, mistakes, maxMistakes, step, questionsAmount)}
          />
        );

      case `artist`:
        return (
          <QuestionArtistScreen
            question={question}
            onAnswerClick={(userChoice) => onUserAnswerClick(userChoice, question, mistakes, maxMistakes, step, questionsAmount)}
          />
        );
    }

    return null;
  }

  render() {
    const {questions, step} = this.props;
    const questionsAmount = questions.length - 1;
    const question = questions[step];

    return (
      this._getScreen(question, questionsAmount)
    );
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
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
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswerClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: (step, maxSteps) => dispatch(ActionCreator.incrementStep(step, maxSteps)),
  onUserAnswerClick: (userChoice, question, mistakes, maxMistakes, step, maxSteps) => {
    dispatch(ActionCreator.incrementStep(step, maxSteps));
    dispatch(ActionCreator.incrementMistakes(userChoice, question, mistakes, maxMistakes));
  }
});


export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
