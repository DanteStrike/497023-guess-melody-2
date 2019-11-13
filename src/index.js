import React from "react";
import ReactDOM from "react-dom";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import {reducer} from "./reducer/reducer.js";
import configureAPI from "./api";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {Operations} from "./reducer/reducer";

const init = () => {
  const settings = {
    gameTimeMinutes: 11.3,
    errorAmount: 2
  };

const init = (settings) => {
  const api = configureAPI((...args) => store.dispatch(...args));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(Operations.loadQuestions());

  ReactDOM.render(
      <Provider store={store}>
        <App
          gameTimeMinutes={settings.gameTimeMinutes}
          maxMistakes={settings.errorAmount}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(gameSettings);
