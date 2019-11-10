import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActivePlayer from "./with-active-player";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withActivePlayer should work correctly`, () => {
  let component;
  const MockComponent = () => <div />;
  const MockComponentWrapped = withActivePlayer(MockComponent);

  beforeEach(() => {
    component = shallow(<MockComponentWrapped/>);
  });

  it(`Should be paused on default`, () => {
    expect(component.state().activeAudioPlayerID).toBe(-1);
  });

  it(`Should set/unset activeAudioPlayerID correctly on play/pause button click`, () => {
    component.instance()._playButtonClickHandler(99);
    expect(component.state().activeAudioPlayerID).toBe(99);

    component.instance()._playButtonClickHandler(66);
    expect(component.state().activeAudioPlayerID).toBe(66);

    component.instance()._playButtonClickHandler(66);
    expect(component.state().activeAudioPlayerID).toBe(-1);
  });
});
