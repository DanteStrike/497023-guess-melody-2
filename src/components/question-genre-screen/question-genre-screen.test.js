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
            userAnswers={[false, false, false, false]}
            registerUserAnswer={jest.fn()}
            resetUserAnswers={jest.fn()}
            renderAudioPlayer={jest.fn()}
            resetActiveAudioPlayer={jest.fn()}
          />
        </Provider>
    )
    .toJSON();

  expect(component).toMatchSnapshot();
});
