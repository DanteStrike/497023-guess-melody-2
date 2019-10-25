import React from "react";
import PropTypes from "prop-types";
import GameHeader from "../game-header/game-header.jsx";

const QuestionGenreScreen = (props) => {
  const {
    screenIndex,
    question: {
      genre,
      answers,
    },
    onAnswerClick
  } = props;

  const answerSubmitHandler = (evt) => {
    evt.preventDefault();

    const answersForm = evt.target;
    const userAnswer = new FormData(answersForm).get(`answer`);
    onAnswerClick(userAnswer);
  };

  return (
    <section className="game game--genre">
      <GameHeader/>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={answerSubmitHandler}>

          {answers.map((answer, index) => (
            <div className="track" key={`${screenIndex}-answer-${index}`}>
              <button className="track__button track__button--play" type="button"></button>
              <div className="track__status">
                <audio src={answer.src}></audio>
              </div>
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer" value={answer.genre}
                  id={`answer-${index}`}/>
                <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
              </div>
            </div>
          ))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>
  );
};

QuestionGenreScreen.propTypes = {
  screenIndex: PropTypes.number.isRequired,
  question: PropTypes.exact({
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
