import React from "react";
import AudioPlayer from "../../components/audio-player/audio-player.jsx";

const withAudioPlayer = (WrappedComponent) => {
  return class WithAudioPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeAudioPlayerID: -1
      };
    }

    _resetActiveAudioPlayer() {
      this.setState({
        activeAudioPlayerID: -1
      });
    }

    _playButtonClickHandler(audioPlayerID) {
      this.setState((prevState) => ({
        activeAudioPlayerID: prevState.activeAudioPlayerID === audioPlayerID ? -1 : audioPlayerID
      }));
    }

    _renderAudioPlayer(source, audioPlayerID) {
      const {activeAudioPlayerID} = this.state;

      return (
        <AudioPlayer
          src={source}
          isPlaying={audioPlayerID === activeAudioPlayerID}
          onPlayButtonClick={() => this._playButtonClickHandler(audioPlayerID)}
        />
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          renderAudioPlayer={(source, audioPlayerID) => this._renderAudioPlayer(source, audioPlayerID)}
          resetActiveAudioPlayer={() => this._resetActiveAudioPlayer()}
        />
      );
    }
  };
};

export default withAudioPlayer;
