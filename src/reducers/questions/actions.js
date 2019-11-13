import types from "./types.js";


const loadQuestions = (questions) => {
  return {
    type: types.LOAD_QUESTIONS,
    payload: questions
  };
};


export default {
  loadQuestions
};
