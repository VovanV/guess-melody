import React, {PureComponent, createRef} from "react"
import PropTypes from "prop-types";

export default class AudioPlayer extends PureComponent {
  constructor(props){
    super(props);

    this._audioRef = createRef();

    const {isPlaying} = props;

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    }

    this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
  }



  render() {
    const {isLoading, isPlaying} = this.state;

    return (
      <>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this._onPlayButtonClick}
        />
        <div className="track__status">
          <audio ref={this._audioRef}/>
        </div>
      </>
    )
  }

  componentDidMount() {
    const {src} = this.props;

    this._audio = this._audioRef.current;

    this._audio.oncanplaythrough = () => this.setState({
      isLoading: false,
    })

    this._audio.onplay = () => {
      this.setState({
        isPlaying: true
      })
    }

    this._audio.onpause = () => {
      this.setState({
        isPlaying: false
      })
    }

    this._audio.ontimeupdate = () => {
      this.setState({
        progress: this._audio.currentTime
      })
    }
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.props.isPlaying) {
      this._audio.play();
    } else {
      this._audio.pause();
    }
  }

  _onPlayButtonClick() {
    this.props.onPlayButtonClick();
    this.setState({isPlaying: !this.state.isPlaying})
  }

}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
}
