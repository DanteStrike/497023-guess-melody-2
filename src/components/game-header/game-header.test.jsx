import React from "react";
import renderer from "react-test-renderer";
import GameHeader from "./game-header";

it(`render correctly GameHeader component`, () => {
  const GameHeaderComponent = renderer(
      <GameHeader/>
  )
  .toJSON();

  expect(GameHeaderComponent).toMatchSnapshot();
});
