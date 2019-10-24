import React from "react";
import GameHeader from "../game-header/game-header";

const QuestionGenreScreen = (props) => {
  const {
    type,
    genre,
    answers,
    onAnswerClick
  } = props;

  return (
    <section className="game game--genre">
      <GameHeader/>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks">

          {answers.map((answer, index) => (
            <div className="track">
              <button className="track__button track__button--play" type="button"></button>
              <div className="track__status">
                <audio></audio>
              </div>
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer" value="answer-1"
                  id="answer-1"/>
                <label className="game__check" htmlFor="answer-1">Отметить</label>
              </div>
            </div>
          ))}

          <button className="game__submit button" type="submit" onClick={onAnswerClick}>Ответить</button>
        </form>
      </section>
    </section>
  );
};

export default QuestionGenreScreen;
