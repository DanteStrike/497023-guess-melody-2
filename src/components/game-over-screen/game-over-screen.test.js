import React from "react";
import renderer from "react-test-renderer";
import GameOverScreen from "./game-over-screen.jsx";

it(`render correctly GameOverScreen component`, () => {
  const component = renderer
    .create(
        <GameOverScreen
          isTimeOver={true}
          onResetGameClick={jest.fn}
        />
    )
    .toJSON();

  expect(component).toMatchSnapshot();
});
