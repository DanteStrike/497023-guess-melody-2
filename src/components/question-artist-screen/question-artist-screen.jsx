import React from "react";
import PropTypes from "prop-types";
import GameHeader from "../game-header/game-header.jsx";
import AudioPlayer from "../audio-player/audio-player.jsx";

class QuestionArtistScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeAudioPlayerID: -1,
      userAnswer: null
    };
  }

  _playButtonClickHandler(audioPlayerID) {
    this.setState((prevState) => ({
      activeAudioPlayerID: prevState.activeAudioPlayerID === audioPlayerID ? -1 : audioPlayerID
    }));
  }

  _answerChangeHandler(artist) {
    this.setState({
      userAnswer: artist
    });
  }

  _answersChangeHandler() {
    const {onAnswerClick} = this.props;
    const {userAnswer} = this.state;

    onAnswerClick(userAnswer);
    this.setState({
      activeAudioPlayerID: -1,
      userAnswer: null
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
    const {activeAudioPlayerID} = this.state;
    const titleAudioPlayer = 0;

    return (
      <section className="game game--artist">
        <GameHeader/>

        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <div className="track">
              <AudioPlayer
                isPlaying={titleAudioPlayer === activeAudioPlayerID}
                src={song.src}
                onPlayButtonClick={() => this._playButtonClickHandler(titleAudioPlayer)}
              />
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

