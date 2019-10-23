import React from "react";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const App = (props) => {
  const {gameTime, errorAmount, questions} = props;

  const startButtonClickHandler = () => {
  };

  return (
    <WelcomeScreen
      time={gameTime}
      errorAmount={errorAmount}
      onWelcomeButtonClick = {startButtonClickHandler}
    />
  );
};

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorAmount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.exact({
      type: PropTypes.oneOf([`genre`]),
      genre: PropTypes.oneOf([`jazz`, `rock`, `pop`]),
      answers: PropTypes.arrayOf(
          PropTypes.exact({
            src: PropTypes.string.isRequired,
            genre: PropTypes.oneOf([`jazz`, `rock`, `pop`])
          })
      )
    }),
    PropTypes.exact({
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
      )
    })
  ]))
};

export default App;
