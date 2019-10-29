import React from "react";
import PropTypes from "prop-types";
import GameHeader from "../game-header/game-header.jsx";

class QuestionGenreScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checkboxes: this.props.question.answers
        .reduce((checkboxes) => {
          checkboxes.push({
            isSelected: false
          });
          return checkboxes;
        }, [])
    };
  }

  _answerChangeHandler(checkboxIndex) {
    this.setState((prevState) => {
      const newCheckboxes = prevState.checkboxes.map((checkbox) => ({isSelected: checkbox.isSelected}));
      newCheckboxes[checkboxIndex].isSelected = !newCheckboxes[checkboxIndex].isSelected;
      return {
        checkboxes: newCheckboxes
      };
    });
  }

  _answersSubmitHandler(evt) {
    evt.preventDefault();

    const answers = this.props.question.answers;
    const userAnswers = this.state.checkboxes
      .reduce((result, checkbox, checkboxIndex) => {
        if (checkbox.isSelected) {
          result.push(answers[checkboxIndex].genre);
        }
        return result;
      }, []);
    this.props.onAnswerClick(userAnswers);
  }

  render() {
    const {
      question: {
        id,
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
              <div className="track" key={`${id}-${index}-answer`}>
                <button className="track__button track__button--play" type="button"></button>
                <div className="track__status">
                  <audio src={answer.src}></audio>
                </div>
                <div className="game__answer">
                  <input className="game__input visually-hidden" type="checkbox" name="answer"
                    value={answer.genre} id={`answer-${index}`}
                    onChange={() => this._answerChangeHandler(index)} checked={this.state.checkboxes[index].isSelected}/>
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
