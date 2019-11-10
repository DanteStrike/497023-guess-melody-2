import React from "react";
import PropTypes from "prop-types";

const withPlayButton = (WrappedComponent) => {
  class WithPlayButton extends React.PureComponent {
    constructor(props) {
      super(props);

      this._audioRef = React.createRef();

      this.state = {
        isPlaying: false,
        isLoading: true
      };

      this._playerButtonClickHandler = this._playerButtonClickHandler.bind(this);
      this._onCanPlayThrough = this._onCanPlayThrough.bind(this);
      this._onPlay = this._onPlay.bind(this);
      this._onPause = this._onPause.bind(this);
    }

    componentDidMount() {
      const audio = this._audioRef.current;

      audio.addEventListener(`canplaythrough`, this._onCanPlayThrough);
      audio.addEventListener(`play`, this._onPlay);
      audio.addEventListener(`pause`, this._onPause);
    }


    componentWillUnmount() {
      const audio = this._audioRef.current;

      audio.removeEventListener(`canplaythrough`, this._onCanPlayThrough);
      audio.removeEventListener(`play`, this._onPlay);
      audio.removeEventListener(`pause`, this._onPause);
    }

    _onCanPlayThrough() {
      this.setState({isLoading: false});
    }

    _onPlay() {
      this.setState({isPlaying: true});
    }

    _onPause() {
      this.setState({isPlaying: false});
    }

    _playerButtonClickHandler() {
      const {id, onPlayButtonClick} = this.props;
      onPlayButtonClick(id);

      this.setState((prevState) => {
        return {
          isPlaying: !prevState.isPlaying
        };
      });
    }

    _renderPlayButton() {
      const {isPlaying, isLoading} = this.state;

      return (
        <button className={`track__button track__button--${isPlaying ? `pause` : `play`}`} type="button"
          onClick={this._playerButtonClickHandler} disabled={isLoading}/>
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          renderPlayButton={() => this._renderPlayButton()}
          audioRef={this._audioRef}
        />
      );
    }
  }

  WithPlayButton.propTypes = {
    id: PropTypes.number.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired
  };

  return WithPlayButton;
};

export default withPlayButton;
