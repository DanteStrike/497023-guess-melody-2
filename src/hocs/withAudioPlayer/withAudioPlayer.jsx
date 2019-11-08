import React from "react";
import AudioPlayer from "../../components/audio-player/audio-player.jsx";

const withAudioPlayer = (Component) => {
  return class WithAudioPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeAudioPlayerID: null
      };
    }

    render() {
      const {activeAudioPlayerID} = this.state;

      return (
        <Component
          {...this.props}
          renderAudioPlayers={(audioPlayer, index) => (
            <div className="game__track">
              <div className="track">
                <AudioPlayer
                  src={audioPlayer.src}
                  isPlaying={index === activeAudioPlayerID}
                  onPlayButtonClick={() => this._playButtonClickHandler(index)}
                />
              </div>
            </div>
          )}
        />
      );
    }
  };
};

export default withAudioPlayer;
