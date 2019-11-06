import React from "react";
import renderer from "react-test-renderer";
import WinScreen from "./win-screen";

it(`render correctly WinScreen component`, () => {
  const component = renderer
    .create(
        <WinScreen
          gameDuration={0}
          mistakes={0}
          result={0}
          fastAnswersAmount={0}
          onResetGameClick={jest.fn()}
        />
    )
    .toJSON();

  expect(component).toMatchSnapshot();
});
