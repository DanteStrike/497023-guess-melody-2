import React from "react";
import renderer from "react-test-renderer";
import QuestionGenreScreen from "./question-genre-screen.jsx";

it(`render correctly QuestionArtistScreen component`, () => {
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

  const snapshot = renderer
    .create(
        <QuestionGenreScreen
          question={questionMock}
          onAnswerClick={jest.fn()}
        />
    )
    .toJSON();

  expect(snapshot).toMatchSnapshot();
});
