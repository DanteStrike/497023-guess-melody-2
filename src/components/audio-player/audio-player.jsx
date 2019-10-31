import React, {Fragment} from "react";
import PropTypes from "prop-types";

class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();

    this.state = {
      isPlaying: false,
      isLoading: true
    };
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this._audioRef.current;

    audio.src = src;

    audio.oncanplaythrough = () => {
      this.setState({isLoading: false});
    };

    audio.onplay = () => {
      this.setState({isPlaying: true});
    };

    audio.onpause = () => {
      this.setState({isPlaying: false});
    };
  }

  componentDidUpdate() {
    const {isPlaying} = this.props;
    const audio = this._audioRef.current;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.src = ``;
  }

  _playerButtonClickHandler() {
    this.props.onPlayButtonClick();

    this.setState((prevState) => {
      return {
        isPlaying: !prevState.isPlaying
      };
    });
  }

  render() {
    const {isPlaying, isLoading} = this.state;

    return (
      <Fragment>
        <button className={`track__button track__button--${isPlaying ? `pause` : `play`}`} type="button"
          onClick={() => this._playerButtonClickHandler()} disabled={isLoading}/>
        <div className="track__status">
          <audio ref={this._audioRef} />
        </div>
      </Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired
};

export default AudioPlayer;
