import React, {Fragment} from "react";
import PropTypes from "prop-types";

class AnswerCheckbox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked
    };
  }

  _changeHandler() {
    this.setState((prevState) => ({
      checked: !prevState.checked
    }));
  }

  render() {
    const {id, value, onChange} = this.props;

    return (
      <Fragment>
        <input type="checkbox" className="game__input visually-hidden" name="answer"
          id={`answer-${id}`}
          value={value}
          onChange={() => {
            this._changeHandler();
            onChange();
          }}
          checked={this.state.checked}/>
        <label className="game__check" htmlFor={`answer-${id}`}>Отметить</label>
      </Fragment>
    );
  }

}

AnswerCheckbox.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

AnswerCheckbox.defaultProps = {
  checked: false
};

export default AnswerCheckbox;
