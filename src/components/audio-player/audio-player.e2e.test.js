import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player.jsx";

Enzyme.configure({adapter: new Adapter()});

HTMLAudioElement.prototype.play = () => { /* do nothing */ };
HTMLAudioElement.prototype.pause = () => { /* do nothing */ };


it(`Should disable play button while on loading`, () => {
  const srcMock = `http://dl2.mp3party.net/online/9116246.mp3`;
  const component = mount(
      <AudioPlayer
        isPlaying={false}
        src={srcMock}
        onPlayButtonClick={() => {}}
      />
  );
  expect(component.state(`isLoading`)).toEqual(true);
  let playButton = component.find(`.track__button--play`);
  expect(playButton.getElement().props.disabled).toEqual(true);

  component.setState({isLoading: false});
  playButton = component.find(`.track__button--play`);
  expect(playButton.getElement().props.disabled).toEqual(false);
});


it(`Should play/pause on play/pause button click`, () => {
  const srcMock = `http://dl2.mp3party.net/online/9116246.mp3`;
  const component = mount(
      <AudioPlayer
        isPlaying={false}
        src={srcMock}
        onPlayButtonClick={() => {}}
      />
  );
  expect(component.state(`isPlaying`)).toEqual(false);
  component.setState({isLoading: false});

  const playButton = component.find(`.track__button--play`);
  playButton.simulate(`click`);
  expect(component.state(`isPlaying`)).toEqual(true);

  const pauseButton = component.find(`.track__button--pause`);
  pauseButton.simulate(`click`);
  expect(component.state(`isPlaying`)).toEqual(false);
});
