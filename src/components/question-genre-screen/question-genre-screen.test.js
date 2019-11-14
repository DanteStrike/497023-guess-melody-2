import React from "react";
import renderer from "react-test-renderer";
import QuestionGenreScreen from "./question-genre-screen.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";

const gameStore = {
  mistakes: 0,
  timeRemaining: 0
};

const store = createStore(() => ({
  game: gameStore
}));

it(`render correctly QuestionGenreScreen component`, () => {
  const questionMock = {
    type: `genre`,
    genre: `any`,
    answers: [
      {
        src: `any`,
        genre: `any`
      },
      {
        src: `any`,
        genre: `any`
      },
      {
        src: `any`,
        genre: `any`
      },
      {
        src: `any`,
        genre: `any`
      },
    ]
  };

  const component = renderer
    .create(
        <Provider store={store}>
          <QuestionGenreScreen
            id={1}
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
