import React, {Fragment} from "react";
import PropTypes from "prop-types";

class AudioPlayer extends React.PureComponent {
  componentDidUpdate() {
    const {isActivePlayer, audioRef} = this.props;
    const audio = audioRef.current;

    if (isActivePlayer) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  render() {
    const {renderPlayButton, audioRef, src} = this.props;
    return (
      <Fragment>
        {renderPlayButton()}
        <div className="track__status">
          <audio ref={audioRef} src={src}/>
        </div>
      </Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  isActivePlayer: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  renderPlayButton: PropTypes.func.isRequired,
  audioRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ])
};

export default AudioPlayer;
