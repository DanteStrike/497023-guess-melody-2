import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withUserAnswers from "./with-user-answers";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withUserAnswers should work correctly`, () => {
  let component;
  const MockComponent = () => <div/>;
  const MockComponentWrapped = withUserAnswers(MockComponent);

  beforeEach(() => {
    component = shallow(<MockComponentWrapped/>);
  });

  it(`UserAnswers state should be [false, false, false, false] by default`, () => {
    expect(component.state().userAnswers).toEqual([false, false, false, false]);
  });

  it(`Should reset userAnswers state on resetUserAnswers`, () => {
    component.setState({userAnswers: [true, true, true, true]});
    component.instance()._resetUserAnswers();
    expect(component.state().userAnswers).toEqual([false, false, false, false]);
  });

  it(`Should register user answer correctly`, () => {
    component.instance()._registerUserAnswer(3);
    expect(component.state().userAnswers).toEqual([false, false, false, true]);

    component.instance()._registerUserAnswer(1);
    expect(component.state().userAnswers).toEqual([false, true, false, true]);

    component.instance()._registerUserAnswer(2);
    expect(component.state().userAnswers).toEqual([false, true, true, true]);

    component.instance()._registerUserAnswer(0);
    expect(component.state().userAnswers).toEqual([true, true, true, true]);
  });
});
