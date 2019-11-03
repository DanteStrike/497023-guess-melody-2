import React from "react";
import PropTypes from "prop-types";

const GameOverScreen = (props) => {
  const {isTimeOver, onResetGameClick} = props;

  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="result__title">{isTimeOver ? `Увы и ах!` : `Какая жалость!`}</h2>
      <p className="result__total result__total--fail">{isTimeOver ? `Время вышло! Вы не успели отгадать все мелодии` : `У вас закончились все попытки. Ничего, повезёт в следующий раз!`}</p>
      <button className="replay" type="button" onClick={onResetGameClick}>Попробовать ещё раз</button>
    </section>
  );
};

GameOverScreen.propTypes = {
  isTimeOver: PropTypes.bool.isRequired,
  onResetGameClick: PropTypes.func.isRequired
};

export default GameOverScreen;
