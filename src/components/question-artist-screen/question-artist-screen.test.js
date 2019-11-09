import React from "react";
import renderer from "react-test-renderer";
import QuestionArtistScreen from "./question-artist-screen.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";

const store = createStore(() => ({
  mistakes: 0,
  gameTimeRemaining: 0
}));

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

  const component = renderer
    .create(
        <Provider store={store}>
          <QuestionArtistScreen
            question={questionMock}
            onAnswerClick={jest.fn()}
            renderAudioPlayer={jest.fn()}
            resetActiveAudioPlayer={jest.fn()}
          />
        </Provider>
    )
    .toJSON();

  expect(component).toMatchSnapshot();
});
