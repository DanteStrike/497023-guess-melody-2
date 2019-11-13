import actions from "./actions.js";

const loadQuestions = () => (dispatch, _, api) => {
  return api.get(`/questions`)
    .then((response) => {
      dispatch(actions.loadQuestions(response.data));
    });
};

export default {
  loadQuestions
};
