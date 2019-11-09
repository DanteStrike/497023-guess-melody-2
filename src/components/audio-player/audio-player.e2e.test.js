import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`AudioPlayer should work correctly`, () => {
  const srcMock = `http://dl2.mp3party.net/online/9116246.mp3`;
  const renderPlayButton = jest.fn();
  it(`Should play/pause on isActivePlayer change`, () => {
    const audioRefMock = {
      current: {
        play: jest.fn(),
        pause: jest.fn()
      }
    };
    const component = shallow(
        <AudioPlayer
          isActivePlayer={false}
          src={srcMock}
          renderPlayButton={renderPlayButton}
          audioRef={audioRefMock}
        />
    );

    expect(renderPlayButton).toBeCalledTimes(1);

    component.setProps({isActivePlayer: true});
    expect(audioRefMock.current.pause).toBeCalledTimes(0);
    expect(audioRefMock.current.play).toBeCalledTimes(1);

    component.setProps({isActivePlayer: false});
    expect(audioRefMock.current.pause).toBeCalledTimes(1);
    expect(audioRefMock.current.play).toBeCalledTimes(1);
  });
});

// it(`Should disable play button while on loading`, () => {
//   const srcMock = `http://dl2.mp3party.net/online/9116246.mp3`;
//   const component = mount(
//       <AudioPlayer
//         isPlaying={false}
//         src={srcMock}
//         onPlayButtonClick={() => {}}
//       />
//   );
//   expect(component.state(`isLoading`)).toEqual(true);
//   let playButton = component.find(`.track__button--play`);
//   expect(playButton.getElement().props.disabled).toEqual(true);
//
//   component.setState({isLoading: false});
//   playButton = component.find(`.track__button--play`);
//   expect(playButton.getElement().props.disabled).toEqual(false);
// });
//
//
// it(`Should play/pause on play/pause button click`, () => {
//   const srcMock = `http://dl2.mp3party.net/online/9116246.mp3`;
//   const component = mount(
//       <AudioPlayer
//         isPlaying={false}
//         src={srcMock}
//         onPlayButtonClick={() => {}}
//       />
//   );
//   expect(component.state(`isPlaying`)).toEqual(false);
//   component.setState({isLoading: false});
//
//   const playButton = component.find(`.track__button--play`);
//   playButton.simulate(`click`);
//   expect(component.state(`isPlaying`)).toEqual(true);
//
//   const pauseButton = component.find(`.track__button--pause`);
//   pauseButton.simulate(`click`);
//   expect(component.state(`isPlaying`)).toEqual(false);
// });
