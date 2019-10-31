import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QuestionArtistScreen from "./question-artist-screen.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`Should return user answers correctly on submit form`, () => {
  const questionMock = {
    id: 1,
    song: {
      artist: `Plаcido Domingo`,
      src: ``
    },
    answers: [
      {
        artist: `Plаcido Domingo`,
        image: ``
      },
    ]
  };

  const onAnswerClickMock = jest.fn();

  const component = shallow(
      <QuestionArtistScreen
        question={questionMock}
        onAnswerClick={onAnswerClickMock}
      />
  );

  expect(component.state(`currentAnswer`)).toMatchObject([]);

  const artistQuestionInput = component.find(`#answer-0`);
  artistQuestionInput.simulate(`change`, {target: {value: `Plаcido Domingo`}});
  expect(component.state(`currentAnswer`)).toMatchObject([`Plаcido Domingo`]);

  const artistQuestionForm = component.find(`form.game__artist`);
  artistQuestionForm.simulate(`change`);
  expect(onAnswerClickMock.mock.calls[0][0]).toMatchObject([`Plаcido Domingo`]);
});
