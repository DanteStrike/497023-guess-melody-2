import React from "react";
import AudioPlayer from "../../components/audio-player/audio-player.jsx";
import withPlayButton from "../with-play-button/with-play-button.jsx";

const WrappedAudioPlayer = withPlayButton(AudioPlayer);

const withActivePlayer = (WrappedComponent) => {
  class WithAudioPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeAudioPlayerID: -1
      };

      this._resetActiveAudioPlayer = this._resetActiveAudioPlayer.bind(this);
      this._playButtonClickHandler = this._playButtonClickHandler.bind(this);
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
        <WrappedAudioPlayer
          id={audioPlayerID}
          src={source}
          isActivePlayer={audioPlayerID === activeAudioPlayerID}
          onPlayButtonClick={this._playButtonClickHandler}
        />
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          renderAudioPlayer={(source, audioPlayerID) => this._renderAudioPlayer(source, audioPlayerID)}
          resetActiveAudioPlayer={this._resetActiveAudioPlayer}
        />
      );
    }
  }

  WithAudioPlayer.propTypes = {};

  return WithAudioPlayer;
};

export default withActivePlayer;
