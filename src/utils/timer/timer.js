import {Time} from "../time/time.js";

class Timer {
  constructor(timeRemaining = 0, timeTick = Time.MILLISECONDS_IN_SECOND, onTimeTick = () => {}) {
    this._timeRemaining = timeRemaining;
    this._timeTick = timeTick;
    this._onTimeTick = onTimeTick;
  }

  setTime(time) {
    this._timeRemaining = time;
  }

  start() {
    this._timerID = setInterval(this._tick.bind(this), this._timeTick);
  }

  stop() {
    clearInterval(this._timerID);
  }

  _tick() {
    this._onTimeTick(this._timeTick, this._timeRemaining);

    if (this._timeRemaining - this._timeTick < 0) {
      this.stop();
    }

    this._timeRemaining -= this._timeTick;
  }
}

export default Timer;
