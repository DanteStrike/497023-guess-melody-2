import React from "react";
import PropTypes from "prop-types";
import GameHeader from "../game-header/game-header.jsx";

class QuestionArtistScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentAnswer: []
    };
  }

  _answerChangeHandler(userChoice) {
    this.setState({
      currentAnswer: [userChoice]
    });
  }

  _answersChangeHandler() {
    this.props.onAnswerClick(this.state.currentAnswer);
    this.setState({
      currentAnswer: []
    });
  }

  render() {
    const {
      question: {
        id,
        song,
        answers,
      }
    } = this.props;
    return (
      <section className="game game--artist">
        <GameHeader/>

        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <div className="track">
              <button className="track__button track__button--play" type="button"></button>
              <div className="track__status">
                <audio src={song.src}></audio>
              </div>
            </div>
          </div>

          <form className="game__artist" onChange={() => this._answersChangeHandler()}>

            {answers.map((answer, index) => (
              <div className="artist" key={`${id}-${index}-answer`}>
                <input onChange={() => this._answerChangeHandler(answer.artist)} className="artist__input visually-hidden" type="radio" name="answer" value={answer.artist}
                  id={`answer-${index}`}/>
                <label className="artist__name" htmlFor={`answer-${index}`}>
                  <img className="artist__picture" src={answer.image} alt={answer.artist}/>
                  {answer.artist}
                </label>
              </div>
            ))}

          </form>
        </section>
      </section>
    );
  }
}

QuestionArtistScreen.propTypes = {
  question: PropTypes.exact({
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
    ),
  }),
  onAnswerClick: PropTypes.func.isRequired
};

export default QuestionArtistScreen;

