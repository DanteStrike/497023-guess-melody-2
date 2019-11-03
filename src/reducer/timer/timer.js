import {Time} from "../../utils/time/time.js";

class Timer {
  constructor(time = 0, timeTick = Time.MILLISECONDS_IN_SECOND, onTimeTick = () => {}) {
    this._timeLeft = time;
    this._timeTick = timeTick;
    this._onTimeTick = onTimeTick;
  }

  setTime(time) {
    this._timeLeft = time;
  }

  tick() {
    this._onTimeTick(this._timeTick, this._timeLeft);

    if (this._timeLeft - this._timeTick < 0) {
      this.stop();
    }

    this._timeLeft -= this._timeTick;
  }

  start() {
    this._timerID = setInterval(this.tick.bind(this), this._timeTick);
  }

  stop() {
    clearInterval(this._timerID);
  }
}

export default Timer;
