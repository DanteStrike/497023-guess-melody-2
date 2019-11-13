const isArtistAnswerCorrect = (userAnswer, question) => {
  return userAnswer === question.song.artist;
};

const isGenreAnswersCorrect = (userAnswers, question) => {
  return userAnswers.every((userAnswer, index) => userAnswer === (question.answers[index].genre === question.genre));
};

export default {
  isArtistAnswerCorrect,
  isGenreAnswersCorrect
};
