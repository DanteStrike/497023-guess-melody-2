import {isArtistAnswerCorrect, isGenreAnswersCorrect, reducer, ActionCreator} from "./reducer.js";

const questionArtistMock = {
  id: 1,
  type: `artist`,
  song: {
    artist: `Plаcido Domingo`,
    src: ``
  },
  answers: [
    {
      artist: `Luciano Pavarotti`,
      image: ``
    },
    {
      artist: `Plаcido Domingo`,
      image: ``
    },
    {
      artist: `Jose Carreras`,
      image: ``
    }
  ]
};
const questionGenreMock = {
  id: 1,
  type: `genre`,
  genre: `jazz`,
  answers: [
    {
      src: ``,
      genre: `jazz`
    },
    {
      src: ``,
      genre: `pop`
    },
    {
      src: ``,
      genre: `rock`
    },
    {
      src: ``,
      genre: `jazz`
    }
  ]
};

describe(`Answers correction check should work correctly`, () => {
  it(`Genre Answers correction check`, () => {
    expect(isGenreAnswersCorrect([false, false, false, false], questionGenreMock)).toEqual(false);
    expect(isGenreAnswersCorrect([true, true, true, true], questionGenreMock)).toEqual(false);
    expect(isGenreAnswersCorrect([true, false, false, true], questionGenreMock)).toEqual(true);
  });

  it(`Artist Answers correction check`, () => {
    expect(isArtistAnswerCorrect(``, questionArtistMock)).toEqual(false);
    expect(isArtistAnswerCorrect(`Luciano Pavarotti`, questionArtistMock)).toEqual(false);
    expect(isArtistAnswerCorrect(`Plаcido Domingo`, questionArtistMock)).toEqual(true);
  });
});
describe(`Reducer should work correctly`, () => {
  it(`Reducer should increment step by a given value`, () => {
    const state = {
      step: -1,
      mistakes: 0
    };
    const actionPayloadOne = {
      type: `INCREMENT_STEP`,
      payload: 1
    };
    const actionPayloadZero = {
      type: `INCREMENT_STEP`,
      payload: 0
    };

    expect(reducer(state, actionPayloadOne)).toMatchObject({
      step: 0,
      mistakes: 0
    });
    expect(reducer(state, actionPayloadZero)).toMatchObject({
      step: -1,
      mistakes: 0
    });
  });

  it(`Reducer should mistakes by a given value`, () => {
    const state = {
      step: -1,
      mistakes: 0
    };
    const actionPayloadOne = {
      type: `INCREMENT_MISTAKES`,
      payload: 1
    };
    const actionPayloadZero = {
      type: `INCREMENT_MISTAKES`,
      payload: 0
    };

    expect(reducer(state, actionPayloadOne)).toMatchObject({
      step: -1,
      mistakes: 1
    });
    expect(reducer(state, actionPayloadZero)).toMatchObject({
      step: -1,
      mistakes: 0
    });
  });

  it(`Reducer should reset app correctly`, () => {
    const state = {
      step: 9999,
      mistakes: 9999
    };
    const action = {
      type: `RESET`
    };

    expect(reducer(state, action)).toMatchObject({
      step: -1,
      mistakes: 0
    });
  });

  it(`Reducer should not change state on undefined action`, () => {
    const state = {
      step: 1,
      mistakes: 1
    };
    const action = {};

    expect(reducer(state, action)).toMatchObject({
      step: 1,
      mistakes: 1
    });
  });
});
describe(`ActionCreator should work correctly`, () => {
  it(`On next question should return action increment step`, () => {
    expect(ActionCreator.incrementStep(-1, Infinity)).toMatchObject({
      type: `INCREMENT_STEP`,
      payload: 1
    });
  });

  it(`On reaching game end should return action reset`, () => {
    expect(ActionCreator.incrementStep(1, 1)).toMatchObject({
      type: `RESET`
    });
  });

  it(`On incorrect answer should return action increment mistake (payload = 1)`, () => {
    const maxMistakes = Infinity;
    const mistakes = 0;

    expect(ActionCreator.incrementMistakes(`incorrect`, questionArtistMock, mistakes, maxMistakes))
      .toMatchObject({
        type: `INCREMENT_MISTAKES`,
        payload: 1
      });
    expect(ActionCreator.incrementMistakes([false, false, false, false], questionGenreMock, mistakes, maxMistakes))
      .toMatchObject({
        type: `INCREMENT_MISTAKES`,
        payload: 1
      });
  });

  it(`On correct answer should return action increment mistake (payload = 0)`, () => {
    const maxMistakes = Infinity;
    const mistakes = 0;

    expect(ActionCreator.incrementMistakes(`Plаcido Domingo`, questionArtistMock, mistakes, maxMistakes))
      .toMatchObject({
        type: `INCREMENT_MISTAKES`,
        payload: 0
      });
    expect(ActionCreator.incrementMistakes([true, false, false, true], questionGenreMock, mistakes, maxMistakes))
      .toMatchObject({
        type: `INCREMENT_MISTAKES`,
        payload: 0
      });
  });

  it(`On incorrect answer and mistakes = maxMistakes should return action reset`, () => {
    const maxMistakes = 1;
    const mistakes = 1;

    expect(ActionCreator.incrementMistakes(`incorrect`, questionArtistMock, mistakes, maxMistakes))
      .toMatchObject({
        type: `RESET`
      });
    expect(ActionCreator.incrementMistakes([false, false, false, false], questionGenreMock, mistakes, maxMistakes))
      .toMatchObject({
        type: `RESET`
      });
  });
});
