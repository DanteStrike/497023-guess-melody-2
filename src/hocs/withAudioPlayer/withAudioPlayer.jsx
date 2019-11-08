import React from "react";
import AudioPlayer from "../../components/audio-player/audio-player.jsx";

const withAudioPlayer = (WrappedComponent) => {
  return class WithAudioPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeAudioPlayerID: -1
      };

      this._playButtonClickHandler = this._playButtonClickHandler.bind(this);
      this._renderAudioPlayer = this._renderAudioPlayer.bind(this);
    }

    _playButtonClickHandler(audioPlayerID) {
      this.setState((prevState) => ({
        activeAudioPlayerID: prevState.activeAudioPlayerID === audioPlayerID ? -1 : audioPlayerID
      }));
    }

    _renderAudioPlayer(song, audioPlayerID) {
      const {activeAudioPlayerID} = this.state;

      return (
        <div className="game__track">
          <div className="track">
            <AudioPlayer
              src={song.src}
              isPlaying={audioPlayerID === activeAudioPlayerID}
              onPlayButtonClick={this._playButtonClickHandler}
            />
          </div>
        </div>
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          renderAudioPlayer={this._renderAudioPlayer}
        />
      );
    }
  };
};

export default withAudioPlayer;
