export const Time = {
  MILLISECONDS_IN_SECOND: 1000,
  MILLISECONDS_IN_MINUTE: 60 * 1000
};

export const getTwoDigitsView = (num) => {
  if (!Number.isInteger(num)) {
    throw new Error(`num must be integer`);
  }

  return num < 10 ? `0${num}` : `${num}`;
};

export const formatTimeToMS = (time) => {
  if (time < 0 || time > 3599999 || !Number.isInteger(time)) {
    throw new Error(`time is out of range [0, 3599999] and must be integer`);
  }

  const minutes = Math.floor(time / Time.MILLISECONDS_IN_MINUTE);
  const seconds = Math.floor((time - minutes * Time.MILLISECONDS_IN_MINUTE) / Time.MILLISECONDS_IN_SECOND);
  return {
    minutes: getTwoDigitsView(minutes),
    seconds: getTwoDigitsView(seconds)
  };
};
