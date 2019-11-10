import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QuestionGenreScreen from "./question-genre-screen.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`QuestionGenreScreen should work correctly`, () => {
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

  let component;
  const onAnswerClick = jest.fn();
  let userAnswers = [false, false];
  const registerUserAnswer = jest.fn();
  const resetUserAnswers = jest.fn();
  const renderAudioPlayer = jest.fn();
  const resetActiveAudioPlayer = jest.fn();

  beforeEach(() => {
    onAnswerClick.mockReset();
    userAnswers = [false, false];
    registerUserAnswer.mockReset();
    resetUserAnswers.mockReset();
    renderAudioPlayer.mockReset();
    resetActiveAudioPlayer.mockReset();

    component = shallow(
        <QuestionGenreScreen
          question={questionMock}
          onAnswerClick={onAnswerClick}
          userAnswers={userAnswers}
          registerUserAnswer={registerUserAnswer}
          resetUserAnswers={resetUserAnswers}
          renderAudioPlayer={renderAudioPlayer}
          resetActiveAudioPlayer={resetActiveAudioPlayer}
        />
    );
  });

  it(`Should render audioPlayer`, () => {
    expect(renderAudioPlayer).toBeCalled();
  });

  it(`Should call registerUserAnswers with correct answerIndex on user answer choose`, () => {
    const answerOneInput = component.find(`#answer-0`);
    answerOneInput.simulate(`change`, {target: {id: `answer-0`}});
    expect(registerUserAnswer.mock.calls[0][0]).toBe(0);

    const answerTwoInput = component.find(`#answer-1`);
    answerTwoInput.simulate(`change`, {target: {id: `answer-1`}});
    expect(registerUserAnswer.mock.calls[1][0]).toBe(1);
  });

  it(`Should preventDefault on form submit`, () => {
    const preventDefault = jest.fn();
    const componentForm = component.find(`form.game__tracks`);

    componentForm.simulate(`submit`, {preventDefault});
    expect(preventDefault).toBeCalled();
  });

  it(`Should reset states in HoCs on form submit`, () => {
    const componentForm = component.find(`form.game__tracks`);

    componentForm.simulate(`submit`, {preventDefault: () => {}});
    expect(resetUserAnswers).toBeCalled();
    expect(resetActiveAudioPlayer).toBeCalled();
  });

  it(`Should sent correct user answers on form submit`, () => {
    const componentForm = component.find(`form.game__tracks`);
    componentForm.simulate(`submit`, {preventDefault: () => {}});
    expect(onAnswerClick.mock.calls[0][0]).toEqual([false, false]);

    component.setProps({userAnswers: [true, false]});
    componentForm.simulate(`submit`, {preventDefault: () => {}});
    expect(onAnswerClick.mock.calls[1][0]).toEqual([true, false]);
  });
});
