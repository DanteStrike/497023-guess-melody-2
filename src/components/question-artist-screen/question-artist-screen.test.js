import React from "react";
import renderer from "react-test-renderer";
import QuestionArtistScreen from "./question-artist-screen.jsx";

it(`render correctly QuestionArtistScreen component`, () => {
  const questionMock = {
    id: 1,
    type: `artist`,
    song: {
      artist: `Plаcido Domingo`,
      src: ``
    },
    answers: [
      {
        artist: `Jose Carreras`,
        image: ``
      },
      {
        artist: `Luciano Pavarotti`,
        image: ``
      },
      {
        artist: `Plаcido Domingo`,
        image: ``
      }
    ]
  };

  const snapshot = renderer
    .create(
        <QuestionArtistScreen
          screenIndex={1}
          question={questionMock}
          onAnswerClick={jest.fn()}
        />,
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

  expect(snapshot).toMatchSnapshot();
});
