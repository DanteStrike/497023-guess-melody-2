import React from "react";
import {newArray} from "../../utils/array/array.js";

const withUserAnswers = (WrappedComponent, answersAmount = 4) => {
  class WithUserAnswers extends React.PureComponent {
    constructor(props) {
      super(props);

      this._answersAmount = answersAmount;
      this.state = {
        userAnswers: newArray(this._answersAmount, false)
      };

      this._resetUserAnswers = this._resetUserAnswers.bind(this);
      this._registerUserAnswer = this._registerUserAnswer.bind(this);
    }

    _resetUserAnswers() {
      this.setState({
        userAnswers: newArray(this._answersAmount, false)
      });
    }

    _registerUserAnswer(answerIndex) {
      this.setState((prevState) => {
        const newUserAnswers = [...prevState.userAnswers];
        newUserAnswers[answerIndex] = !newUserAnswers[answerIndex];

        return {
          userAnswers: newUserAnswers
        };
      });
    }

    render() {
      const {userAnswers} = this.state;
      return (
        <WrappedComponent
          {...this.props}
          userAnswers={userAnswers}
          registerUserAnswer={this._registerUserAnswer}
          resetUserAnswers={this._resetUserAnswers}
        />
      );
    }
  }

  WithUserAnswers.propTypes = {};

  return WithUserAnswers;
};

export default withUserAnswers;
