import React from "react";
import renderer from "react-test-renderer";
import {GameTimer} from "./game-timer.jsx";

it(`render correctly GameHeader component`, () => {
  const component = renderer
    .create(
        <GameTimer
          gameTimeLeft={500}
        />
    )
    .toJSON();

  expect(component).toMatchSnapshot();
});
