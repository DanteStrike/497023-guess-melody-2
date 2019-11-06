import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WelcomeScreen from "./welcome-screen.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`check welcome button click`, () => {
  const clickHandler = jest.fn();
  const WelcomeScreenComponent = shallow(
      <WelcomeScreen
        time={1}
        maxMistakes={1}
        onWelcomeButtonClick={clickHandler}
      />
  );

  const startButton = WelcomeScreenComponent.find(`.welcome__button`);
  startButton.simulate(`click`);
  expect(clickHandler).toHaveBeenCalled();
});
