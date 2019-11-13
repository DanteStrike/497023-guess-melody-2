import React from "react";
import PropTypes from "prop-types";
import GameHeader from "../game-header/game-header.jsx";

class QuestionGenreScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this._answerChangeHandler = this._answerChangeHandler.bind(this);
    this._answersSubmitHandler = this._answersSubmitHandler.bind(this);
  }

  _answerChangeHandler(evt) {
    const {registerUserAnswer} = this.props;
    const targetId = evt.target.id;
    const answerIndex = Number(targetId.slice(targetId.lastIndexOf(`-`) - targetId.length + 1));

    registerUserAnswer(answerIndex);
  }

  _answersSubmitHandler(evt) {
    evt.preventDefault();
    const {onAnswerClick, userAnswers, resetActiveAudioPlayer, resetUserAnswers} = this.props;

    onAnswerClick(userAnswers);
    resetActiveAudioPlayer();
    resetUserAnswers();
  }

  render() {
    const {
      id,
      question: {
        genre,
        answers,
      },
      renderAudioPlayer,
      userAnswers,
    } = this.props;


    return (
      <section className="game game--genre">
        <GameHeader/>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form className="game__tracks" onSubmit={this._answersSubmitHandler}>
            {answers.map((answer, index) => (
              <div className="track" key={`${id}-${index}-answer`}>
                {renderAudioPlayer(answer.src, index)}
                <div className="game__answer">
                  <input type="checkbox" className="game__input visually-hidden" name="answer" id={`answer-${index}`}
                    value={answer.genre} checked={userAnswers[index]} onChange={this._answerChangeHandler}/>
                  <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
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
  id: PropTypes.number.isRequired,
  question: PropTypes.exact({
    type: PropTypes.oneOf([`genre`]),
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.exact({
          src: PropTypes.string.isRequired,
          genre: PropTypes.string.isRequired
        })
    )
  }),
  onAnswerClick: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
  registerUserAnswer: PropTypes.func.isRequired,
  resetUserAnswers: PropTypes.func.isRequired,
  renderAudioPlayer: PropTypes.func.isRequired,
  resetActiveAudioPlayer: PropTypes.func.isRequired
};

export default QuestionGenreScreen;
