import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QuestionGenreScreen from "./question-genre-screen.jsx";

Enzyme.configure({adapter: new Adapter()});

window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };

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
        question={questionMock}
        onAnswerClick={onAnswerClickMock}
      />
  );

  const componentForm = component.find(`form.game__tracks`);
  componentForm.simulate(`submit`, {preventDefault});

  expect(preventDefault).toBeCalled();
  expect(onAnswerClickMock.mock.calls[0][0]).toMatchObject([]);
});

it(`Should return user answers correctly on submit form`, () => {
  const questionMock = {
    id: 1,
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

  const component = mount(
      <QuestionGenreScreen
        question={questionMock}
        onAnswerClick={onAnswerClickMock}
      />
  );

  expect(component.state(`userSelections`)).toMatchObject([]);

  const genreQuestionForm = component.find(`form.game__tracks`);
  genreQuestionForm.simulate(`submit`, {preventDefault: () => {}});
  expect(onAnswerClickMock.mock.calls[0][0]).toMatchObject([]);

  const answerOneInput = component.find(`#answer-0`);
  const answerTwoInput = component.find(`#answer-1`);
  answerTwoInput.simulate(`change`);
  answerOneInput.simulate(`change`);

  expect(component.state(`userSelections`)).toMatchObject([{
    id: 1,
    value: `pop`
  }, {
    id: 0,
    value: `jazz`
  }]);

  genreQuestionForm.simulate(`submit`, {preventDefault: () => {}});
  expect(onAnswerClickMock.mock.calls[1][0]).toMatchObject([`jazz`, `pop`]);
});
