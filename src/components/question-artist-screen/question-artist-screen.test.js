import React from "react";
import renderer from "react-test-renderer";
import QuestionArtistScreen from "./question-artist-screen.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";

const gameStore = {
  mistakes: 0,
  timeRemaining: 0
};

const store = createStore(() => ({
  game: gameStore
}));


it(`render correctly QuestionArtistScreen component`, () => {
  const questionMock = {
    type: `artist`,
    song: {
      artist: `any`,
      src: `any`
    },
    answers: [
      {
        artist: `any`,
        picture: `any`
      },
      {
        artist: `any`,
        picture: `any`
      },
      {
        artist: `any`,
        picture: `any`
      }
    ]
  };

  const component = renderer
    .create(
        <Provider store={store}>
          <QuestionArtistScreen
            id={1}
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
