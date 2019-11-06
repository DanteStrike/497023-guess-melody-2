import React from "react";
import PropTypes from "prop-types";
import {formatTimeToMS} from "../../utils/time/time.js";

const WinScreen = (props) => {
  const {gameDuration, mistakes, result, fastAnswersAmount, onResetGameClick} = props;
  const gameDurationTime = formatTimeToMS(gameDuration);

  return (
    <section className="login">
      <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__total">За {gameDurationTime.minutes} минуты и {gameDurationTime.seconds} секунд вы набрали {result} баллов ({fastAnswersAmount} быстрых), совершив {mistakes} ошибки</p>
      <p className="login__text">Хотите сравнить свой результат с предыдущими попытками? Представтесь!</p>
      <form className="login__form" action="">
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input className="login__input" type="text" name="name" id="name"/>
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input" type="text" name="password" id="password"/>
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit">Войти</button>
      </form>
      <button className="replay" type="button" onClick={onResetGameClick}>Сыграть ещё раз</button>
    </section>
  );
};

WinScreen.propTypes = {
  gameDuration: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  result: PropTypes.number.isRequired,
  fastAnswersAmount: PropTypes.number.isRequired,
  onResetGameClick: PropTypes.func.isRequired
};

export default WinScreen;
