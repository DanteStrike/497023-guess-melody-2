import React from "react";
import renderer from "react-test-renderer";
import QuestionGenreScreen from "./question-genre-screen.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";

const store = createStore(() => ({
  mistakes: 0,
  gameTimeRemaining: 0
}));

it(`render correctly QuestionGenreScreen component`, () => {
  const questionMock = {
    id: 1,
    type: `genre`,
    genre: `jazz`,
    answers: [
      {
        src: ``,
        genre: `rock`
      },
      {
        src: ``,
        genre: `rock`
      },
      {
        src: ``,
        genre: `pop`
      },
      {
        src: ``,
        genre: `jazz`
      },
    ]
  };

  const component = renderer
    .create(
        <Provider store={store}>
          <QuestionGenreScreen
            question={questionMock}
            onAnswerClick={jest.fn()}
          />
        </Provider>,
        {
          createNodeMock: (element) => {
            if (element.type === `audio`) {
              return {
                src: null
              };
            }
            return null;
          }
        }
    )
    .toJSON();

  expect(component).toMatchSnapshot();
});
