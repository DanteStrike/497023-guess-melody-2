import React from "react";
import ReactDOM from "react-dom";

import {applyMiddleware, createStore, combineReducers} from "redux";
import {Provider} from "react-redux";

import thunk from "redux-thunk";
import {compose} from "recompose";

import {questionsReducer, questionsOperations} from "./reducers/questions/index.js";
import {gameReducer} from "./reducers/game/index.js";

import configureAPI from "./server/configure-API.js";

import gameSettings from "./configs/game-settings.js";
import App from "./components/app/app.jsx";

const init = (settings) => {
  const api = configureAPI((...args) => store.dispatch(...args));

  const rootReducer = combineReducers({
    questions: questionsReducer,
    game: gameReducer
  });

  const store = createStore(
      rootReducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(questionsOperations.loadQuestions());

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
