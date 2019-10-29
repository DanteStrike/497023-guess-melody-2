import React from "react";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import QuestionGenreScreen from "../question-genre-screen/question-genre-screen.jsx";
import QuestionArtistScreen from "../question-artist-screen/question-artist-screen.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: -1
    };
  }

  _userAnswerClickHandler() {
    this.setState((prevState) => {
      const nextIndex = prevState.questionIndex + 1;
      const isEnd = nextIndex >= this.props.questions.length;

      return {
        questionIndex: !isEnd ? nextIndex : -1
      };
    });
  }

  render() {
    return (
      App.getScreen(this.state.questionIndex, this.props, () => this._userAnswerClickHandler())
    );
  }

  static getScreen(questionIndex, props, onUserAnswerClick) {
    const {gameTime, errorAmount} = props;
    if (questionIndex === -1) {
      return (
        <WelcomeScreen
          time={gameTime}
          errorAmount={errorAmount}
          onWelcomeButtonClick={onUserAnswerClick}
        />
      );
    }

    const {questions} = props;
    const currentQuestion = questions[questionIndex];

    switch (currentQuestion.type) {
      case `genre`:
        return (
          <QuestionGenreScreen
            question={currentQuestion}
            onAnswerClick={onUserAnswerClick}
          />
        );

      case `artist`:
        return (
          <QuestionArtistScreen
            question={currentQuestion}
            onAnswerClick={onUserAnswerClick}
          />
        );
    }

    return null;
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorAmount: PropTypes.number.isRequired,
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
  ]))
};

export default App;
