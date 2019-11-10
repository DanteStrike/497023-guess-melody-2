import React from "react";
import renderer from "react-test-renderer";
import AudioPlayer from "./audio-player.jsx";

it(`Should render correctly AudioPlayer component`, () => {
  const component = renderer
    .create(
        <AudioPlayer
          isActivePlayer={false}
          src={`http://dl2.mp3party.net/online/9116246.mp3`}
          renderPlayButton={jest.fn()}
          audioRef={jest.fn()}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
