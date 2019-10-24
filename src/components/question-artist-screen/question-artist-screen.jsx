import React from "react";
import PropTypes from "prop-types";
import GameHeader from "../game-header/game-header.jsx";

const QuestionArtistScreen = (props) => {
  const {
    screenIndex,
    question: {
      song,
      answers,
    },
    onAnswerClick
  } = props;

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

        <form className="game__artist" onChange={onAnswerClick}>

          {answers.map((answer, index) => (
            <div className="artist" key={`${screenIndex}-answer-${index}`}>
              <input className="artist__input visually-hidden" type="radio" name="answer" value={answer.artist} id={`answer-${index}`}/>
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
};

QuestionArtistScreen.propTypes = {
  screenIndex: PropTypes.number.isRequired,
  question: PropTypes.exact({
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

