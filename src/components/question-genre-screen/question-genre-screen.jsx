import React from "react";
import PropTypes from "prop-types";
import GameHeader from "../game-header/game-header.jsx";
import AudioPlayer from "../audio-player/audio-player.jsx";
import AnswerCheckbox from "../answer-checkbox/answer-checkbox.jsx";

class QuestionGenreScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this._answersAmount = props.question.answers.length;

    this.state = {
      activeAudioPlayerID: -1,
      userAnswers: new Array(this._answersAmount).fill(false)
    };
  }

  _playButtonClickHandler(audioPlayerID) {
    this.setState((prevState) => ({
      activeAudioPlayerID: prevState.activeAudioPlayerID === audioPlayerID ? -1 : audioPlayerID
    }));
  }

  _answerChangeHandler(checkboxIndex) {
    this.setState((prevState) => {
      const newUserAnswers = [...prevState.userAnswers];
      newUserAnswers[checkboxIndex] = !newUserAnswers[checkboxIndex];

      return {
        userAnswers: newUserAnswers
      };
    });
  }

  _answersSubmitHandler(evt) {
    evt.preventDefault();
    const {onAnswerClick} = this.props;
    const {userAnswers} = this.state;

    onAnswerClick(userAnswers);

    this.setState({
      activeAudioPlayerID: -1,
      onAnswerClick: new Array(this._answersAmount).fill(false)
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

    const {activeAudioPlayerID} = this.state;

    return (
      <section className="game game--genre">
        <GameHeader/>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form className="game__tracks" onSubmit={(evt) => this._answersSubmitHandler(evt)}>

            {answers.map((answer, index) => (
              <div className="track" key={`${quesID}-${index}-answer`}>
                <AudioPlayer
                  isPlaying={index === activeAudioPlayerID}
                  src={answer.src}
                  onPlayButtonClick={() => this._playButtonClickHandler(index)}
                />
                <div className="game__answer">
                  <AnswerCheckbox
                    id={index}
                    value={answer.genre}
                    checked={false}
                    onChange={() => this._answerChangeHandler(index)}
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
