import React from "react";
import PropTypes from "prop-types";
import GameHeader from "../game-header/game-header.jsx";
import AudioPlayer from "../audio-player/audio-player.jsx";
import AnswerCheckbox from "../answer-checkbox/answer-checkbox.jsx";

class QuestionGenreScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      audioPlayerID: -1,
      userSelections: []
    };
  }

  _playButtonClickHandler(audioPlayerID) {
    this.setState((prevState) => ({
      audioPlayerID: prevState.audioPlayerID === audioPlayerID ? -1 : audioPlayerID
    }));
  }

  _answerChangeHandler(checkboxID, checkboxValue) {
    this.setState((prevState) => {
      const newUserSelections = prevState.userSelections.map((userChoice) => ({
        id: userChoice.id,
        value: userChoice.value
      }));
      const foundedIndex = newUserSelections.findIndex((userChoice) => userChoice.id === checkboxID);

      if (foundedIndex === -1) {
        newUserSelections.push({
          id: checkboxID,
          value: checkboxValue
        });
      } else {
        newUserSelections.splice(foundedIndex, 1);
      }

      return {
        userSelections: newUserSelections
      };
    });
  }

  _answersSubmitHandler(evt) {
    evt.preventDefault();

    const userAnswers = this.state.userSelections
      .sort((a, b) => a.id - b.id)
      .reduce((result, userChoice) => {
        result.push(userChoice.value);
        return result;
      }, []);

    this.props.onAnswerClick(userAnswers);

    this.setState({
      audioPlayerID: -1,
      userSelections: []
    });
  }

  render() {
    const {
      question: {
        id: quesID,
        genre,
        answers,
      }
    } = this.props;

    return (
      <section className="game game--genre">
        <GameHeader/>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form className="game__tracks" onSubmit={(evt) => this._answersSubmitHandler(evt)}>

            {answers.map((answer, index) => (
              <div className="track" key={`${quesID}-${index}-answer`}>
                <AudioPlayer
                  isPlaying={index === this.state.audioPlayerID ? true : false}
                  src={answer.src}
                  onPlayButtonClick={() => this._playButtonClickHandler(index)}
                />
                <div className="game__answer">
                  <AnswerCheckbox
                    id={index}
                    value={answer.genre}
                    checked={false}
                    onChange={() => this._answerChangeHandler(index, answer.genre)}
                  />
                </div>
              </div>
            ))}

            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>
    );
  }
}

QuestionGenreScreen.propTypes = {
  question: PropTypes.exact({
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
  onAnswerClick: PropTypes.func.isRequired
};

export default QuestionGenreScreen;
