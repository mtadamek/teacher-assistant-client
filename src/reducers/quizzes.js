import {
  GET_ALL_QUIZZES_REQUEST,
  GET_ALL_QUIZZES_SUCCESS,
  GET_ALL_QUIZZES_ERROR,
  POST_QUIZ_REQUEST,
  POST_QUIZ_SUCCESS,
  POST_QUIZ_ERROR,
  PATCH_QUIZ_REQUEST,
  PATCH_QUIZ_SUCCESS,
  PATCH_QUIZ_ERROR,
  DELETE_QUIZ_REQUEST,
  DELETE_QUIZ_SUCCESS,
  DELETE_QUIZ_ERROR
} from "../constants";

const initialState = {
  quizzes: [],
  loading: false,
  error: false
};

const quizzesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_QUIZZES_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_ALL_QUIZZES_SUCCESS:
      return { ...state, loading: false, quizzes: payload };
    case GET_ALL_QUIZZES_ERROR:
      return { ...state, loading: false, error: payload };

    case POST_QUIZ_REQUEST:
      return { ...state, loading: true, error: false };
    case POST_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quizzes: state.quizzes.concat(payload)
      };
    case POST_QUIZ_ERROR:
      return { ...state, loading: false, error: payload };

    case PATCH_QUIZ_REQUEST:
      return { ...state, loading: true, error: false };
    case PATCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quizzes: state.quizzes.map(quiz =>
          quiz.id === payload.id ? payload : quiz
        )
      };
    case PATCH_QUIZ_ERROR:
      return { ...state, loading: false, error: payload };

    case DELETE_QUIZ_REQUEST:
      return { ...state, loading: true, error: false };
    case DELETE_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quizzes: state.quizzes.filter(quiz => quiz.id !== payload)
      };
    case DELETE_QUIZ_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default quizzesReducer;
