import types from "./types.js";
import actions from "./actions.js";
import selectors from "./selectors.js";
import operations from "./operations.js";
import reducer from "./reducers.js";
import MockAdapter from "axios-mock-adapter";
import configureAPI from "../../server/configure-API.js";


describe(`Reducers: Questions actions`, () => {
  it(`ActionCreator loadQuestions should return action load questions`, () => {
    expect(actions.loadQuestions([{any: `any`}])).toEqual({
      type: types.LOAD_QUESTIONS,
      payload: [{any: `any`}]
    });
  });
});

describe(`Reducers: Questions selectors`, () => {
  it(`Selector getQuestions should return questions`, () => {
    expect(selectors.getQuestions({questions: {questions: [{any: `any`}]}}))
    .toEqual([{any: `any`}]);
  });
});

describe(`Reducers: Questions operations`, () => {
  it(`Load operation with API should work correctly`, () => {
    const api = configureAPI();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionsLoader = operations.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{any: `any`}]);

    questionsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: types.LOAD_QUESTIONS,
          payload: [{any: `any`}]
        });
      });
  });
});

describe(`Reducers: Questions reducer`, () => {
  it(`Reducer should set loaded questions to state`, () => {
    const initState = {
      questions: []
    };

    const action = {
      type: types.LOAD_QUESTIONS,
      payload: [{loaded: true}]
    };

    expect(reducer(initState, action)).toEqual({
      questions: [{loaded: true}]
    });
  });

  it(`Reducer should return state by default on wrong or empty actions`, () => {
    const initState = {
      questions: [{state: true}]
    };

    const actionEmpty = {};
    const actionWrong = {
      type: `NOT_A_GOOD_ACTION`,
      payload: [{state: false}]
    };

    expect(reducer(initState, actionEmpty)).toEqual({
      questions: [{state: true}]
    });
    expect(reducer(initState, actionWrong)).toEqual({
      questions: [{state: true}]
    });
  });
});
