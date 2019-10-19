import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`render correctly App component`, () => {
  const AppComponent = renderer
    .create(
        <App
          gameTime = {0}
          errorAmount = {0}
        />
    )
    .toJSON();

  expect(AppComponent).toMatchSnapshot();
});
