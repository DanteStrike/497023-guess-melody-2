import React from "react";
import renderer from "react-test-renderer";
import {questions} from "../../mocks/questions";
import App from "./app.jsx";

it(`render correctly App component`, () => {
  const snapshot = renderer
    .create(
        <App
          gameTime={1}
          errorAmount={1}
          questions={questions}
        />
    )
    .toJSON();

  expect(snapshot).toMatchSnapshot();
});
