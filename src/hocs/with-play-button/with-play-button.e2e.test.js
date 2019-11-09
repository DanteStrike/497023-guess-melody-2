import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withPlayButton from "./with-play-button.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withPlayButton should work correctly`, () => {
  let component;
  const MockComponent = () => <audio/>;
  const MockComponentWrapped = withPlayButton(MockComponent);
  const onPlayButtonClick = jest.fn();


  const refMock = {
    current: document.createElement(`audio`)
  };

  const eventsMock = {};
  const addEventListenerMock = jest.fn((event, cb) => {
    eventsMock[event] = cb;
  });
  refMock.current.addEventListener = addEventListenerMock;

  const removeEventListenerMock = jest.fn((event) => {
    delete eventsMock[event];
  });
  refMock.current.removeEventListener = removeEventListenerMock;

  jest.spyOn(React, `createRef`).mockImplementation(() => refMock);


  beforeEach(() => {
    onPlayButtonClick.mockReset();
    component = shallow(
        <MockComponentWrapped
          id={123}
          onPlayButtonClick={onPlayButtonClick}
        />
    );
  });

  it(`Should correct add EventListener and remove EventListener`, () => {
    expect(addEventListenerMock).toBeCalledTimes(3);
    component.unmount();
    expect(removeEventListenerMock).toBeCalledTimes(3);
    expect(eventsMock).toEqual({});
  });

  it(`Play Button should be disables while loading`, () => {
    expect(component.state().isLoading).toEqual(true);
    expect(component.state().isPlaying).toEqual(false);
    expect(component.instance()._renderPlayButton().props.disabled).toEqual(true);

    eventsMock.canplaythrough();
    expect(component.state().isLoading).toEqual(false);
    expect(component.instance()._renderPlayButton().props.disabled).toEqual(false);
  });

  it(`Should switch play/pause button correctly on play/pause events`, () => {
    component.setState({isLoading: false});
    expect(component.state().isPlaying).toEqual(false);
    eventsMock.play();
    expect(component.state().isPlaying).toEqual(true);
    expect(component.instance()._renderPlayButton().props.className.includes(`--pause`)).toEqual(true);

    eventsMock.pause();
    expect(component.state().isPlaying).toEqual(false);
    expect(component.instance()._renderPlayButton().props.className.includes(`--play`)).toEqual(true);
  });

  it(`Should switch play/pause button correctly on button click`, () => {
    component.setState({isLoading: false});
    expect(component.state().isPlaying).toEqual(false);
    component.instance()._playerButtonClickHandler();
    expect(component.instance()._renderPlayButton().props.className.includes(`--pause`)).toEqual(true);

    component.instance()._playerButtonClickHandler();
    expect(component.state().isPlaying).toEqual(false);
    expect(component.instance()._renderPlayButton().props.className.includes(`--play`)).toEqual(true);

  });

  it(`Should call onPlayButtonClick callback on button click`, () => {
    component.instance()._playerButtonClickHandler();
    expect(onPlayButtonClick).toBeCalledTimes(1);
  });
});
