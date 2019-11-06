import {formatTimeToMS, getTwoDigitsView} from "./time";

describe(`getTwoDigitsView should work correctly`, () => {
  it(`Should return two digits view if num < 10`, () => {
    expect(getTwoDigitsView(0)).toBe(`00`);
    expect(getTwoDigitsView(5)).toBe(`05`);
    expect(getTwoDigitsView(9)).toBe(`09`);
  });
  it(`Should return num view if num >= 10`, () => {
    expect(getTwoDigitsView(10)).toBe(`10`);
    expect(getTwoDigitsView(15)).toBe(`15`);
    expect(getTwoDigitsView(9999)).toBe(`9999`);
  });
  it(`Should throw error if num not integer`, () => {
    expect(() => getTwoDigitsView(``)).toThrowError(`num must be integer`);
    expect(() => getTwoDigitsView()).toThrowError(`num must be integer`);
    expect(() => getTwoDigitsView(null)).toThrowError(`num must be integer`);
    expect(() => getTwoDigitsView(Infinity)).toThrowError(`num must be integer`);
  });
});

describe(`formatTimeToMS should work correctly`, () => {
  it(`Should return time object on correct time received`, () => {
    expect(formatTimeToMS(0)).toMatchObject({
      minutes: `00`,
      seconds: `00`
    });
    expect(formatTimeToMS(1000)).toMatchObject({
      minutes: `00`,
      seconds: `01`
    });
    expect(formatTimeToMS(30000)).toMatchObject({
      minutes: `00`,
      seconds: `30`
    });
    expect(formatTimeToMS(59000)).toMatchObject({
      minutes: `00`,
      seconds: `59`
    });
    expect(formatTimeToMS(60000)).toMatchObject({
      minutes: `01`,
      seconds: `00`
    });
    expect(formatTimeToMS(119000)).toMatchObject({
      minutes: `01`,
      seconds: `59`
    });
    expect(formatTimeToMS(3599999)).toMatchObject({
      minutes: `59`,
      seconds: `59`
    });
  });

  it(`Should throw error on time incorrect`, () => {
    expect(() => formatTimeToMS(-1)).toThrowError(`time is out of range [0, 3599999] and must be integer`);
    expect(() => formatTimeToMS(3600000)).toThrowError(`time is out of range [0, 3599999] and must be integer`);
    expect(() => formatTimeToMS()).toThrowError(`time is out of range [0, 3599999] and must be integer`);
    expect(() => formatTimeToMS(``)).toThrowError(`time is out of range [0, 3599999] and must be integer`);
  });
});
