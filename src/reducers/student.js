import { ADD_QUIZ, DELETE_QUIZ } from "../constants";

const initialState = {
  quizzes: []
};

const studentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.concat(payload)
      };
    case DELETE_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.filter(quiz => quiz.id !== payload.id)
      };

    default:
      return state;
  }
};

export default studentReducer;
