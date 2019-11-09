import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import {questions} from "./mocks/questions.js";
import {reducer} from "./reducer/reducer.js";

const init = (gameQuestions) => {
  const settings = {
    gameTimeMinutes: 11.3,
    errorAmount: 2
  };

  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  );

  ReactDOM.render(
      <Provider store={store}>
        <App
          gameTimeMinutes={settings.gameTimeMinutes}
          maxMistakes={settings.errorAmount}
          questions={gameQuestions}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(questions);
