import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen.jsx";

it(`render correctly WelcomeScreen component`, () => {
  const WelcomeScreenComponent = renderer
    .create(
        <WelcomeScreen
          time = {1}
          errorAmount = {1}
        />
    )
    .toJSON();

  expect(WelcomeScreenComponent).toMatchSnapshot();
});
