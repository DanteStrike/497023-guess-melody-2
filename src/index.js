import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import {questions} from "./mocks/questions.js";
import {reducer} from "./reducer.js";

const init = (gameQuestions) => {
  const settings = {
    gameTime: 1,
    errorAmount: 2
  };

  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App
          gameTime={settings.gameTime}
          maxMistakes={settings.errorAmount}
          questions={gameQuestions}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(questions);
