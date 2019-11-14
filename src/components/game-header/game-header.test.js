import React from "react";
import renderer from "react-test-renderer";
import GameHeader from "./game-header.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";

const gameState = {
  mistakes: 0,
  timeRemaining: 0
};

const store = createStore(() => ({
  game: gameState
}));

it(`render correctly GameHeader component`, () => {
  const snapshot = renderer
    .create(
        <Provider store={store}>
          <GameHeader/>
        </Provider>
    )
    .toJSON();

  expect(snapshot).toMatchSnapshot();
});
