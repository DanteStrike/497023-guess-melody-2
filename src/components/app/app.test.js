import React from "react";
import renderer from "react-test-renderer";
import {questions} from "../../mocks/questions";
import App from "./app.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";

const gameState = {
  step: -1,
  mistakes: 0,
  gameTimeRemaining: 0
};

const questionsState = {
  questions
};

const store = createStore(() => ({
  game: gameState,
  questions: questionsState
}));

it(`render correctly App component`, () => {
  const snapshot = renderer
    .create(
        <Provider store={store}>
          <App
            gameTimeMinutes={1}
            maxMistakes={1}
            onUserAnswerClick={jest.fn}
            onWelcomeScreenClick={jest.fn}
            onGameResetClick={jest.fn}
          />
        </Provider>
    )
    .toJSON();

  expect(snapshot).toMatchSnapshot();
});
