import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class UserMistakesStatus extends React.PureComponent {
  render() {
    const {mistakes} = this.props;

    return (
      <div className="game__mistakes">
        {new Array(mistakes)
          .fill(`mistake`)
          .map((mistake, index) => (<div key={`${index}-${mistake}`} className="wrong"></div>))}
      </div>
    );
  }
}

UserMistakesStatus.propTypes = {
  mistakes: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  mistakes: state.mistakes
});

export {UserMistakesStatus};

export default connect(mapStateToProps)(UserMistakesStatus);
