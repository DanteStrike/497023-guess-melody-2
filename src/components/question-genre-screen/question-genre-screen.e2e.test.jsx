import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QuestionGenreScreen from "./question-genre-screen.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`should preventDefault if click submit button`, () => {
  const questionMock = {
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

  const preventDefault = jest.fn();

  const component = shallow(
      <QuestionGenreScreen
        screenIndex={0}
        question={questionMock}
        onAnswerClick={jest.fn()}
      />
  );

  const componentForm = component.find(`form`);
  componentForm.simulate(`submit`, {preventDefault});

  expect(preventDefault).toBeCalled();
});
