import React from "react";
import renderer from "react-test-renderer";
import GameHeader from "./game-header.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer} from "../../reducer/reducer";

const store = createStore(reducer);

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
