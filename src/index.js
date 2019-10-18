import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const init = () => {
  const settings = {
    gameTime: 1,
    errorAmount: 5
  };

  ReactDOM.render(
      <App
        gameTime = {settings.gameTime}
        errorAmount = {settings.errorAmount}
      />,
      document.querySelector(`#root`)
  );
};

init();
