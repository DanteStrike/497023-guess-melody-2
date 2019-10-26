import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QuestionGenreScreen from "./question-genre-screen.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`Should preventDefault on form submit`, () => {
  const questionMock = {
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

  const component = shallow(
      <QuestionGenreScreen
        screenIndex={0}
        question={questionMock}
        onAnswerClick={jest.fn()}
      />
  );

  const componentForm = component.find(`form.game__tracks`);
  componentForm.simulate(`submit`, {preventDefault});

  expect(preventDefault).toBeCalled();
});

it(`Should return user answers correctly on submit form`, () => {
  const questionMock = {
    type: `genre`,
    genre: `jazz`,
    answers: [
      {
        src: ``,
        genre: `jazz`
      },
      {
        src: ``,
        genre: `pop`
      }
    ]
  };

  const onAnswerClickMock = jest.fn();

  const component = shallow(
      <QuestionGenreScreen
        screenIndex={0}
        question={questionMock}
        onAnswerClick={onAnswerClickMock}
      />
  );

  const preventDefault = () => {};

  const genreQuestionForm = component.find(`form.game__tracks`);
  genreQuestionForm.simulate(`submit`, {preventDefault});
  expect(onAnswerClickMock.mock.calls[0][0]).toMatchObject([]);
});
