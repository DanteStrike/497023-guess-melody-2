import types from "./types.js";
import utils from "./utils.js";
import actions from "./actions.js";
import selectors from "./selectors.js";
import reducer from "./reducers.js";
import {Time} from "../../utils/time/time";

const questionGenreMock = {
  type: `genre`,
  genre: `correct`,
  answers: [
    {
      genre: `correct`
    },
    {
      genre: `incorrect`
    },
    {
      genre: `incorrect`
    },
    {
      genre: `correct`
    }
  ]
};

const questionArtistMock = {
  type: `artist`,
  song: {
    artist: `correct`
  }
};

describe(`Reducers: Game utils`, () => {
  it(`Util isArtistAnswerCorrect should check correctly`, () => {
    expect(utils.isArtistAnswerCorrect(`correct`, questionArtistMock))
      .toEqual(true);
    expect(utils.isArtistAnswerCorrect(`incorrect`, questionArtistMock))
      .toEqual(false);
  });

  it(`Util isGenreAnswersCorrect should check correctly`, () => {
    expect(utils.isGenreAnswersCorrect([false, false, false, false], questionGenreMock))
      .toEqual(false);
    expect(utils.isGenreAnswersCorrect([true, true, true, true], questionGenreMock))
      .toEqual(false);
    expect(utils.isGenreAnswersCorrect([true, false, false, true], questionGenreMock))
      .toEqual(true);
  });
});

describe(`Reducers: Game actions`, () => {
  const timerMock = {
    start: jest.fn(),
    stop: jest.fn(),
    setTime: jest.fn()
  };

  it(`ActionCreator incrementStep on next question should return action increment step (payload = 1)`, () => {
    expect(actions.incrementStep(-1, Infinity, timerMock)).toEqual({
      type: types.INCREMENT_STEP,
      payload: 1
    });
  });

  it(`ActionCreator incrementMistakes on incorrect answer should return action increment mistake (payload = 1)`, () => {
    const maxMistakes = Infinity;
    const mistakes = 0;

    expect(actions.incrementMistakes(`incorrect`, questionArtistMock, mistakes, maxMistakes))
      .toEqual({
        type: types.INCREMENT_MISTAKES,
        payload: 1
      });
    expect(actions.incrementMistakes([false, false, false, false], questionGenreMock, mistakes, maxMistakes))
      .toEqual({
        type: types.INCREMENT_MISTAKES,
        payload: 1
      });
  });

  it(`ActionCreator incrementMistakes on correct answer should return action increment mistake (payload = 0)`, () => {
    const maxMistakes = Infinity;
    const mistakes = 0;

    expect(actions.incrementMistakes(`correct`, questionArtistMock, mistakes, maxMistakes))
      .toEqual({
        type: types.INCREMENT_MISTAKES,
        payload: 0
      });
    expect(actions.incrementMistakes([true, false, false, true], questionGenreMock, mistakes, maxMistakes))
      .toEqual({
        type: types.INCREMENT_MISTAKES,
        payload: 0
      });
  });

  it(`ActionCreator setGameTime on game start should return action set game time`, () => {
    const timestamp = 5 * Time.MILLISECONDS_IN_MINUTE;
    expect(actions.setGameTime(timestamp, timerMock)).toEqual({
      type: types.SET_GAME_TIME,
      payload: timestamp
    });
  });

  it(`ActionCreator decreaseGameTime on timer tick should return action decreaseGameTime payload = timeTick`, () => {
    expect(actions.decreaseGameTime(Time.MILLISECONDS_IN_SECOND, Time.MILLISECONDS_IN_SECOND)).toEqual({
      type: types.DECREASE_GAME_TIME,
      payload: Time.MILLISECONDS_IN_SECOND
    });
  });

  it(`ActionCreator decreaseGameTime on time left should return action decreaseGameTime payload = 0`, () => {
    expect(actions.decreaseGameTime(Time.MILLISECONDS_IN_SECOND, 0)).toEqual({
      type: types.DECREASE_GAME_TIME,
      payload: 0
    });
  });

  it(`ActionCreator resetGame on reset buttons click should return action reset`, () => {
    expect(actions.resetGame(Time.MILLISECONDS_IN_SECOND, 0)).toEqual({
      type: types.RESET_GAME,
    });
  });
});

describe(`Reducers: Game selectors`, () => {
  it(`Selector checkIsGameTimeLeft should check correctly`, () => {
    expect(selectors.checkIsGameTimeLeft({gameTimeRemaining: -1}))
      .toEqual(false);
    expect(selectors.checkIsGameTimeLeft({gameTimeRemaining: 1}))
      .toEqual(false);
    expect(selectors.checkIsGameTimeLeft({gameTimeRemaining: 0}))
      .toEqual(true);
  });

});

describe(`Reducers: Game reducers`, () => {
  let initState;

  beforeEach(() => {
    initState = {
      step: -1,
      mistakes: 0,
      gameTimeRemaining: -1
    };
  });

  it(`Reducer stepReducer should increment step by a given value`, () => {
    const actionPayloadZero = {
      type: types.INCREMENT_STEP,
      payload: 0
    };
    const actionPayloadOne = {
      type: types.INCREMENT_STEP,
      payload: 1
    };

    expect(reducer(initState, actionPayloadOne)).toEqual({
      step: 0,
      mistakes: 0,
      gameTimeRemaining: -1
    });
    expect(reducer(initState, actionPayloadZero)).toEqual({
      step: -1,
      mistakes: 0,
      gameTimeRemaining: -1
    });
  });

  it(`Reducer mistakesReducer should increment mistakes by a given value`, () => {
    const actionPayloadZero = {
      type: types.INCREMENT_MISTAKES,
      payload: 0
    };
    const actionPayloadOne = {
      type: types.INCREMENT_MISTAKES,
      payload: 1
    };


    expect(reducer(initState, actionPayloadOne)).toEqual({
      step: -1,
      mistakes: 1,
      gameTimeRemaining: -1
    });
    expect(reducer(initState, actionPayloadZero)).toEqual({
      step: -1,
      mistakes: 0,
      gameTimeRemaining: -1
    });
  });

  it(`Reducer gameTimeReducer should set timer by a given value`, () => {
    const timestamp = 5 * Time.MILLISECONDS_IN_MINUTE;
    const action = {
      type: types.SET_GAME_TIME,
      payload: timestamp
    };

    expect(reducer(initState, action)).toEqual({
      step: -1,
      mistakes: 0,
      gameTimeRemaining: timestamp
    });
  });

  it(`Reducer gameTimeReducer should decrease game time by a given value`, () => {
    const timestamp = 5 * Time.MILLISECONDS_IN_MINUTE;
    const timeSetState = updateObject(initState, {gameTimeRemaining: timestamp});
    const action = {
      type: types.DECREASE_GAME_TIME,
      payload: Time.MILLISECONDS_IN_SECOND
    };

    expect(reducer(timeSetState, action)).toEqual({
      step: -1,
      mistakes: 0,
      gameTimeRemaining: timestamp - Time.MILLISECONDS_IN_SECOND
    });
  });

  it(`Reducer should reset correctly`, () => {
    const inGameState = {
      step: 1,
      mistakes: 1,
      gameTimeRemaining: 1
    };
    const action = {
      type: types.RESET_GAME
    };

    expect(reducer(inGameState, action)).toEqual(initState);
  });

  it(`Reducer should not change state on undefined action`, () => {
    const action = {};

    expect(reducer(initState, action)).toEqual(initState);
  });
});
