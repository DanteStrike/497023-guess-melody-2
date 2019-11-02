import React from "react";
import renderer from "react-test-renderer";
import {questions} from "../../mocks/questions";
import {App} from "./app.jsx";

it(`render correctly App component`, () => {
  const snapshot = renderer
    .create(
        <App
          gameTime={1}
          maxMistakes={1}
          questions={questions}
          step={-1}
          mistakes={0}
          onUserAnswerClick={jest.fn}
          onWelcomeScreenClick={jest.fn}
        />
    )
    .toJSON();

  expect(snapshot).toMatchSnapshot();
});
