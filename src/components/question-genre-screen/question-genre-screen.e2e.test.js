import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QuestionGenreScreen from "./question-genre-screen.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`Should preventDefault on form submit`, () => {
  const questionMock = {
    id: 1,
    type: `genre`,
    genre: `jazz`,
    answers: [
      {
        src: ``,
        genre: `jazz`
      }
    ]
  };

  const preventDefault = jest.fn();
  const onAnswerClickMock = jest.fn();

  const component = shallow(
      <QuestionGenreScreen
        screenIndex={0}
        question={questionMock}
        onAnswerClick={onAnswerClickMock}
      />
  );

  const componentForm = component.find(`form.game__tracks`);
  componentForm.simulate(`submit`, {preventDefault});

  expect(preventDefault).toBeCalled();
  expect(onAnswerClickMock.mock.calls[0][0]).toMatchObject([]);
});
