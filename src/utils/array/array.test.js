import {newArray} from "./array";

describe(`newArray utils func should work correctly`, () => {
  it(`On set length and set fillValue newArray should return new filled value array witch size = length`, () => {
    expect(newArray(0, true)).toEqual([]);
    expect(newArray(1, false)).toEqual([false]);
    expect(newArray(4, false)).toEqual([false, false, false, false]);
    expect(newArray(4, `any`)).toEqual([`any`, `any`, `any`, `any`]);
    expect(newArray(4, -1)).toEqual([-1, -1, -1, -1]);
    expect(newArray(4, 1)).toEqual([1, 1, 1, 1]);
  });

  it(`On unset fillValue newArray should return new filled array with nulls`, () => {
    expect(newArray(1)).toEqual([null]);
    expect(newArray(4)).toEqual([null, null, null, null]);
  });

  it(`On unset should return new empty array witch size = 0`, () => {
    expect(newArray()).toEqual([]);
  });
});
