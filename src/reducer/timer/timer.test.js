import Timer from "./timer.js";
import {Time} from "../../utils/time/time.js";

describe(`Timer should work correctly`, () => {
  const time = Time.MILLISECONDS_IN_MINUTE;
  const timeTick = Time.MILLISECONDS_IN_SECOND;
  const onTimeTick = () => {};

  it(`Timer should initialize correctly`, () => {
    const newTimer = new Timer(time, timeTick, onTimeTick);

    expect(newTimer._timeLeft).toBe(time);
    expect(newTimer._timeTick).toBe(timeTick);
    expect(newTimer._onTimeTick).toBe(onTimeTick);
  });

  it(`Timer should tick correctly`, () => {
    const newTimer = new Timer(time, timeTick, onTimeTick);

    expect(newTimer._timeLeft).toBe(time);
    newTimer.tick();
    expect(newTimer._timeLeft).toBe(time - timeTick);
  });

  it(`Timer should start/stop correctly`, () => {
    jest.useFakeTimers();
    const newTimer = new Timer(time, timeTick, onTimeTick);
    newTimer.start();
    newTimer.stop();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), timeTick);
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it(`Timer should set time correctly`, () => {
    const newTime = 2 * Time.MILLISECONDS_IN_MINUTE;
    const newTimer = new Timer(time, timeTick, onTimeTick);
    newTimer.setTime(newTime);
    expect(newTimer._timeLeft).toBe(newTime);
  });

  it(`Timer should callback on time is over`, () => {
    const callback = jest.fn();
    const newTimer = new Timer(0, 1, callback);
    const spyOnStop = jest.spyOn(newTimer, `stop`);

    newTimer.tick();
    expect(callback).toBeCalledTimes(1);
    expect(spyOnStop).toHaveBeenCalledTimes(1);
  });
});
