import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QuestionArtistScreen from "./question-artist-screen.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`Should return user answers correctly on input change`, () => {
  const questionMock = {
    song: {
      artist: `any`,
      src: `any`
    },
    answers: [
      {
        artist: `Plаcido Domingo`,
        picture: `any`
      },
    ]
  };

  const onAnswerClickMock = jest.fn();

  const component = shallow(
      <QuestionArtistScreen
        id={1}
        question={questionMock}
        onAnswerClick={onAnswerClickMock}
        renderAudioPlayer={jest.fn()}
        resetActiveAudioPlayer={jest.fn()}
      />
  );

  const artistQuestionInput = component.find(`#answer-0`);
  artistQuestionInput.simulate(`change`, {target: {value: `Plаcido Domingo`}});
  expect(onAnswerClickMock.mock.calls[0][0]).toEqual(`Plаcido Domingo`);
});
