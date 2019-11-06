import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen.jsx";

it(`render correctly WelcomeScreen component`, () => {
  const snapshot = renderer
    .create(
        <WelcomeScreen
          time={1}
          maxMistakes={1}
          onWelcomeButtonClick={jest.fn()}
        />
    )
    .toJSON();

  expect(snapshot).toMatchSnapshot();
});
