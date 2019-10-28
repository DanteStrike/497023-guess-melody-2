import React from "react";
import renderer from "react-test-renderer";
import GameHeader from "./game-header.jsx";

it(`render correctly GameHeader component`, () => {
  const snapshot = renderer
    .create(
        <GameHeader/>
    )
    .toJSON();

  expect(snapshot).toMatchSnapshot();
});
