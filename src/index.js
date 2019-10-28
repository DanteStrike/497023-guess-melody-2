import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {questions} from "./mocks/questions.js";

const init = () => {
  const settings = {
    gameTime: 1,
    errorAmount: 5
  };

  ReactDOM.render(
      <App
        gameTime={settings.gameTime}
        errorAmount={settings.errorAmount}
        questions={questions}
      />,
      document.querySelector(`#root`)
  );
};

init();
